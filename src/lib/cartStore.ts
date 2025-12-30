'use client';

export interface CartLineItem {
  id: string; // unique key: productId-flavor-size
  productId: string;
  productName: string;
  flavor: string;
  size: string;
  priceCents: number;
  quantity: number;
  customizations?: string;
}

export interface CartState {
  items: CartLineItem[];
}

const CART_STORAGE_KEY = 'pik-a-mela-cart';

function generateLineItemId(productId: string, flavor: string, size: string): string {
  return `${productId}-${flavor.toLowerCase()}-${size.toLowerCase()}`;
}

function loadCartFromStorage(): CartState {
  if (typeof window === 'undefined') {
    return { items: [] };
  }
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.items)) {
        return parsed;
      }
    }
  } catch {
    // Invalid storage, reset
  }
  return { items: [] };
}

function saveCartToStorage(cart: CartState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage full or unavailable
  }
}

type CartListener = (cart: CartState) => void;

class CartStore {
  private cart: CartState = { items: [] };
  private listeners: Set<CartListener> = new Set();
  private initialized = false;

  init(): void {
    if (this.initialized) return;
    this.cart = loadCartFromStorage();
    this.initialized = true;
  }

  getCart(): CartState {
    if (!this.initialized) this.init();
    return this.cart;
  }

  getTotalQuantity(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotalCents(): number {
    return this.cart.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  }

  subscribe(listener: CartListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.cart));
  }

  addItem(
    productId: string,
    productName: string,
    flavor: string,
    size: string,
    priceCents: number,
    customizations?: string
  ): void {
    if (!this.initialized) this.init();
    
    const id = generateLineItemId(productId, flavor, size);
    const existingIndex = this.cart.items.findIndex((item) => item.id === id);

    if (existingIndex >= 0) {
      // Increment quantity
      this.cart.items[existingIndex].quantity += 1;
    } else {
      // Add new line item
      this.cart.items.push({
        id,
        productId,
        productName,
        flavor,
        size,
        priceCents,
        quantity: 1,
        customizations,
      });
    }

    saveCartToStorage(this.cart);
    this.notify();
  }

  updateQuantity(lineItemId: string, newQuantity: number): void {
    if (!this.initialized) this.init();
    
    if (newQuantity <= 0) {
      this.removeItem(lineItemId);
      return;
    }

    const index = this.cart.items.findIndex((item) => item.id === lineItemId);
    if (index >= 0) {
      this.cart.items[index].quantity = newQuantity;
      saveCartToStorage(this.cart);
      this.notify();
    }
  }

  removeItem(lineItemId: string): void {
    if (!this.initialized) this.init();
    
    this.cart.items = this.cart.items.filter((item) => item.id !== lineItemId);
    saveCartToStorage(this.cart);
    this.notify();
  }

  clearCart(): void {
    this.cart = { items: [] };
    saveCartToStorage(this.cart);
    this.notify();
  }
}

// Singleton instance
export const cartStore = new CartStore();
