// Suppress experimental JSON import warnings
import './import-json.mjs';

import path from 'node:path';
import process from 'node:process';
import jsConfig from './jsconfig.json' assert { type: 'json' };

const matchDirectory = /(?:[\\/]\*\*)?[\\/]\*/;

// Get import aliases from `jsconfig.json`
function getAliases() {
  const base = process.cwd();
  const aliases = jsConfig.compilerOptions.paths || {};
  return Object.keys(aliases).reduce((acc, aliasKey) => {
    let aliasPath = Array.isArray(aliases[aliasKey]) ? aliases[aliasKey][0] : aliases[aliasKey];
    // Drop any leading path slash and glob expressions
    aliasKey = aliasKey.split(matchDirectory)[0];
    aliasPath = aliasPath.split(matchDirectory)[0];
    // Resolve any relative references
    if (aliasPath[0] !== '/') {
      aliasPath = path.join(base, aliasPath);
    }
    return { ...acc, [aliasKey]: aliasPath };
  }, {});
}

function isAliasInSpecifier(path, alias) {
  return path.indexOf(alias) === 0
    && (path.length === alias.length || path[alias.length] === '/')
}

const aliases = getAliases();
const matchExtension = /\.[^\\/]*$/;

/**
 * Custom node import resolver to pull aliases from `jsconfig.json`, which IDEs also use
 * @param {string} specifier
 * @param {URL} parentModuleURL
 * @param {function(string, URL)} defaultResolve
 * @return {Promise<*>}
 */
export async function resolve(specifier, parentModuleURL, defaultResolve) {
  const isRelative = specifier.startsWith('.');
  const hasExtension = matchExtension.test(specifier);
  const alias = Object.keys(aliases).find((key) => isAliasInSpecifier(specifier, key));
  let newSpecifier = !alias ? specifier
    : path.join(aliases[alias], specifier.substring(alias.length));
  // Allow directory reference to point to `index.js`
  if ((alias || isRelative) && !hasExtension) {
    newSpecifier = `${newSpecifier}/index.mjs`;
  }
  return defaultResolve(newSpecifier, parentModuleURL);
}
