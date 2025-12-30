/**
 * Health Check Endpoint
 * =====================
 * Simple endpoint to verify the API is running.
 * Used by load balancers, monitoring, and deployment checks.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
    },
    { status: 200 }
  );
}
