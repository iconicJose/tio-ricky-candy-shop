/**
 * Example Client Component
 * ========================
 * Demonstrates proper client component structure.
 * 
 * SECURITY:
 * - This file can ONLY import from:
 *   - @/types (shared types)
 *   - @/components (other client components)
 *   - Third-party client-safe packages
 * 
 * - This file CANNOT import from:
 *   - @/lib/server
 *   - @/lib/db
 *   - @/lib/env (serverEnv)
 *   - @/types/server
 */

'use client';

import { useState } from 'react';
import type { CartItem } from '@/types';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  disabled?: boolean;
}

export function AddToCartButton({
  productId,
  productName,
  disabled = false,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      // TODO: Implement cart state management
      // Cart should only store productId and quantity
      // Price is ALWAYS fetched from server at checkout
      const item: CartItem = {
        productId,
        quantity: 1,
      };
      
      console.log('Adding to cart:', item, productName);
      
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
