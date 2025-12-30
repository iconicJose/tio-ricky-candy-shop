/**
 * Health Check Endpoint
 * =====================
 * Simple endpoint to verify the API is running.
 * Used by load balancers, monitoring, and deployment checks.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
