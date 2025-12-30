/**
 * Shared Type Definitions
 * =======================
 * Types that can be safely shared between server and client.
 * Do NOT include any server-only types here.
 */

// =============================================================================
// PRODUCT TYPES (Client-safe)
// =============================================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceInCents: number;
  stockQuantity: number;
  active: boolean;
  featured: boolean;
  imageUrl: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// =============================================================================
// CART TYPES (Client-side only)
// =============================================================================

export interface CartItem {
  productId: string;
  quantity: number;
  // Note: price is NOT stored in cart - always fetched from server
}

export interface Cart {
  items: CartItem[];
}

// =============================================================================
// ORDER TYPES (Client-safe subset)
// =============================================================================

export type OrderStatus =
  | 'PENDING'
  | 'PAYMENT_FAILED'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalInCents: number;
  createdAt: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}
