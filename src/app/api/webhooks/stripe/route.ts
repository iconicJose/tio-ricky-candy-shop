/**
 * Stripe Webhook Handler
 * ======================
 * Receives and processes webhook events from Stripe.
 *
 * NOTE: For GitHub Pages (static export), this is a static stub.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(
    { error: 'Stripe webhooks are not available in this static deployment' },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Stripe webhooks are not available in this static deployment' },
    { status: 501 }
  );
}
