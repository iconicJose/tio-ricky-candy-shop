/**
 * Products API - List Products
 * ============================
 * Public endpoint to list active products for the storefront.
 * 
 * SECURITY:
 * - Only returns active products
 * - Prices are server-authoritative (never trust client prices)
 */

import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db';

// TODO: Implement when database is connected
export async function GET(request: NextRequest) {
  // Placeholder - will query from database
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  console.warn('⚠️  Products API hit - database implementation pending');

  // Placeholder response structure
  return NextResponse.json({
    products: [],
    filters: {
      category: category ?? null,
      featured: featured === 'true',
    },
    message: 'Products endpoint stub - database implementation pending',
  });
}
