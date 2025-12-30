/**
 * Server-only Type Definitions
 * ============================
 * Types that should ONLY be used on the server.
 * These types may include sensitive information structures.
 * 
 * NEVER import this file in client components.
 */

import 'server-only';

// Re-export Prisma types for server use
export type {
  User,
  Product as PrismaProduct,
  Order,
  OrderItem,
  WebhookEvent,
} from '@prisma/client';

// =============================================================================
// AUTH TYPES
// =============================================================================

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'WORKER';
}

export interface Session {
  user: SessionUser;
  expiresAt: Date;
}

// =============================================================================
// STRIPE TYPES
// =============================================================================

export interface StripeCheckoutData {
  customerId?: string;
  customerEmail: string;
  lineItems: StripeLineItem[];
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}

export interface StripeLineItem {
  productId: string;
  name: string;
  priceInCents: number;
  quantity: number;
}

// =============================================================================
// ORDER PROCESSING TYPES
// =============================================================================

export interface CreateOrderInput {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  customerNotes?: string;
}

export interface OrderCalculation {
  subtotalInCents: number;
  taxInCents: number;
  shippingInCents: number;
  totalInCents: number;
  items: Array<{
    productId: string;
    productName: string;
    priceInCents: number;
    quantity: number;
    totalInCents: number;
  }>;
}
