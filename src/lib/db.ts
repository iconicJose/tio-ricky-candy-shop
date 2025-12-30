/**
 * Prisma Database Client
 * ======================
 * Singleton pattern for Prisma client to prevent connection exhaustion
 * in development (hot reloading creates new instances).
 * 
 * SECURITY: This file is SERVER-ONLY. Never import in client components.
 */

import 'server-only';

// Mock Prisma client for deployment without database
// Replace with real Prisma client when database is configured
const mockDb = {
  product: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  order: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => ({}),
    update: async () => ({}),
  },
  user: {
    findMany: async () => [],
    findUnique: async () => null,
  },
};

export const db = mockDb as any;
