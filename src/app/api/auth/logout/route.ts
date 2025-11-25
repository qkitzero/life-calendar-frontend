import { client } from '@/app/api/auth/client';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function GET() {
  const returnTo = `${SITE_URL}/`;

  const { data, error } = await client.POST('/v1/logout', {
    body: {
      returnTo: returnTo,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  const res = NextResponse.json(data);

  res.cookies.delete('access_token');

  return res;
}
