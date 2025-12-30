/**
 * Prisma Database Client
 * ======================
 * Singleton pattern for Prisma client to prevent connection exhaustion
 * in development (hot reloading creates new instances).
 * 
 * SECURITY: This file is SERVER-ONLY. Never import in client components.
 */

import 'server-only';
import { PrismaClient } from '@prisma/client';

// Declare global type for Prisma client singleton
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Create Prisma client with appropriate configuration
 * Handles both Prisma Postgres (prisma+postgres://) and standard PostgreSQL URLs
 */
function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || '';
  
  // Check if using Prisma Postgres (accelerate)
  if (databaseUrl.startsWith('prisma+postgres://')) {
    return new PrismaClient({
      // @ts-expect-error - Prisma 7 accelerate config
      accelerateUrl: databaseUrl,
      log:
        process.env.NODE_ENV === 'development'
          ? ['error', 'warn']
          : ['error'],
    });
  }
  
  // Standard PostgreSQL connection
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['error', 'warn']
        : ['error'],
  });
}

/**
 * Singleton Prisma client instance
 * In development, store on globalThis to survive hot reloading
 * In production, create a new instance
 */
export const db: PrismaClient =
  globalThis.prisma ?? createPrismaClient();

// Preserve client across hot reloads in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
