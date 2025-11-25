import { client } from '@/app/api/event/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  const { data, error } = await client.GET('/v1/events', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
