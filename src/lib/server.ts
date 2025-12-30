/**
 * Server-only module marker
 * =========================
 * This barrel file re-exports server-only modules.
 * Importing from '@/lib/server' in a client component will cause a build error.
 * 
 * This enforces the server/client boundary at the module level.
 */

import 'server-only';

// Re-export server modules
export { serverEnv } from './env';
export { db } from './db';
// export { auth } from './auth'; // TODO: Add when auth is implemented
// export { stripe } from './stripe'; // TODO: Add when stripe is implemented
