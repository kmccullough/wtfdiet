// Suppress experimental JSON import warnings
import '@root/import-json.mjs';
import settings from '@root/config.json' assert { type: 'json' };
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { bool, num } from '@server/utils/config.mjs';

dotenvExpand.expand(dotenv.config());

const { env } = process;
const indexPath = fileURLToPath(import.meta.resolve('@public/index.html'));
const publicPath = path.dirname(indexPath);

export const config = {
  settings,
  port: num(env.PORT, settings.port),
  ipcId: env.IPC_ID || settings['ipc-id'],
  maintenanceNoticeDelay: num(
    env.MAINTENANCE_NOTICE_DELAY,
    settings['maintenance-notice-delay'],
  ),
  paths: {
    index: indexPath,
    public: publicPath,
  },
  sessions: {
    durationDays: num(
      env.SESSION_DURATION_DAYS,
      settings['session-duration-days'],
    ),
    durationRememberDays: num(
      env.SESSION_DURATION_REMEMBER_DAYS,
      settings['session-duration-remember-days'],
    ),
    secret: env.SESSION_SECRET,
  },
};
