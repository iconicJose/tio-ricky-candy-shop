/**
 * Environment Variable Validation
 * ================================
 * This module validates all environment variables at application startup.
 * If required variables are missing or invalid, the app will fail fast with
 * a clear error message.
 * 
 * SECURITY: This file is SERVER-ONLY. Never import in client components.
 */

import { z } from 'zod';

/**
 * Schema for server-side environment variables
 * These are NEVER exposed to the client
 */
const serverEnvSchema = z.object({
  // Required - app won't start without these
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .url('DATABASE_URL must be a valid URL')
    .refine(
      (url) => url.startsWith('postgresql://') || url.startsWith('postgres://'),
      'DATABASE_URL must be a PostgreSQL connection string'
    ),

  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters'),

  STRIPE_SECRET_KEY: z
    .string()
    .min(1, 'STRIPE_SECRET_KEY is required')
    .refine(
      (key) => key.startsWith('sk_test_') || key.startsWith('sk_live_'),
      'STRIPE_SECRET_KEY must start with sk_test_ or sk_live_'
    ),

  STRIPE_WEBHOOK_SECRET: z
    .string()
    .min(1, 'STRIPE_WEBHOOK_SECRET is required')
    .refine(
      (key) => key.startsWith('whsec_'),
      'STRIPE_WEBHOOK_SECRET must start with whsec_'
    ),

  // Required in production, optional in development
  BASE_URL: z
    .string()
    .url('BASE_URL must be a valid URL')
    .optional()
    .transform((val) => val ?? 'http://localhost:3000'),

  // Optional with defaults
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .optional()
    .default('development'),

  PORT: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 3000))
    .refine((val) => val > 0 && val < 65536, 'PORT must be a valid port number'),
});

/**
 * Schema for client-side environment variables
 * These are prefixed with NEXT_PUBLIC_ and safe to expose
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required')
    .refine(
      (key) => key.startsWith('pk_test_') || key.startsWith('pk_live_'),
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with pk_test_ or pk_live_'
    ),
});

/**
 * Production-only validation
 * Additional requirements when NODE_ENV is 'production'
 */
function validateProductionEnv(env: z.infer<typeof serverEnvSchema>) {
  if (env.NODE_ENV === 'production') {
    if (!env.BASE_URL || env.BASE_URL === 'http://localhost:3000') {
      throw new Error('BASE_URL must be set to a production URL in production mode');
    }

    if (env.STRIPE_SECRET_KEY.startsWith('sk_test_')) {
      console.warn(
        '⚠️  WARNING: Using test Stripe key in production mode. ' +
        'This should only be done for staging environments.'
      );
    }
  }
}

/**
 * Validate and parse server environment variables
 * Call this at app startup to fail fast on missing/invalid config
 */
function validateServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid server environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid server environment variables');
  }

  validateProductionEnv(parsed.data);

  return parsed.data;
}

/**
 * Validate and parse client environment variables
 */
function validateClientEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });

  if (!parsed.success) {
    // In development, warn but don't fail (allows running without Stripe)
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Missing client environment variables (development mode):');
      console.warn(parsed.error.flatten().fieldErrors);
      return {
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: '',
      };
    }

    console.error('❌ Invalid client environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid client environment variables');
  }

  return parsed.data;
}

// Export validated environment objects
// These are the ONLY way to access env vars in the application
export const serverEnv = validateServerEnv();
export const clientEnv = validateClientEnv();

// Type exports for use throughout the application
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
