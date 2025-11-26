import { client } from '@/app/api/auth/client';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function GET() {
  const redirectUri = `${SITE_URL}/api/auth/callback`;

  const { data, error } = await client.POST('/v1/login', {
    body: {
      redirectUri: redirectUri,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
