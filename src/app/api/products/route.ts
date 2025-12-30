/**
 * Products API - List Products
 * ============================
 * Public endpoint to list active products for the storefront.
 *
 * NOTE: For GitHub Pages (static export), this is a static stub.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    products: [],
    message: 'Products endpoint stub - database implementation pending',
  });
}
