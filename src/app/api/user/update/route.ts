import { client } from '@/app/api/user/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const body = await req.json();

  const { data, error } = await client.PATCH('/v1/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      displayName: body.displayName,
      birthDate: body.birthDate,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
