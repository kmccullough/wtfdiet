import SessionEngine from 'hyper-express-session';
import { config } from '@server/config.mjs';

const sessionEngine = new SessionEngine({
  duration: 1000 * 60 * 60 * 24 * config.sessions.durationDays,
  cookie: {
    name: 'wtfdiet',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    secret: config.sessions.secret,
  },
});

const sessions = new Map();

sessionEngine.use('read', async (session) => {
  return sessions.get(session.id)?.session;
});

sessionEngine.use('touch', async (session) => {
  const sess = sessions.get(session.id);
  if (sess) {
    sess.expires_at = session.expires_at;
  }
});

sessionEngine.use('write', async (session) => {
  sessions.set(session.id, {
    expires_at: session.expires_at,
    session: session.get(),
  });
});

sessionEngine.use('destroy', async (session) => {
  sessions.delete(session.id);
});

export default sessionEngine;
