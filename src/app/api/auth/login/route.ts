import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:8081';

export async function GET() {
  const redirectUri = `${SITE_URL}/api/auth/callback`;

  const authServiceRes = await fetch(`${AUTH_SERVICE_URL}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ redirect_uri: redirectUri }),
  });

  if (!authServiceRes.ok) {
    return NextResponse.json({ error: 'Login request failed' }, { status: authServiceRes.status });
  }

  const data = await authServiceRes.json();

  return NextResponse.json(data);
}
