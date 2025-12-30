/**
 * Orders API - Create Order / Checkout
 * ===================================
 * Creates a new order and initiates checkout.
 *
 * NOTE: For GitHub Pages (static export), this is a static stub.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(
    { error: 'Orders API is not available in this static deployment' },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Orders API is not available in this static deployment' },
    { status: 501 }
  );
}
