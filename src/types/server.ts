/**
 * Server-only Type Definitions
 * ============================
 * Types that should ONLY be used on the server.
 * These types may include sensitive information structures.
 * 
 * NEVER import this file in client components.
 */

import 'server-only';

// Mock types for deployment without database
// Replace with Prisma types when database is configured
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'WORKER';
}

export interface PrismaProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  stock: number;
  active: boolean;
  imageUrl: string | null;
}

export interface Order {
  id: string;
  status: string;
  totalCents: number;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceCents: number;
}

export interface WebhookEvent {
  id: string;
  type: string;
  payload: string;
  processedAt: Date | null;
}

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
