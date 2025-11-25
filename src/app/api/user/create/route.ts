import { client } from '@/app/api/user/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const body = await req.json();

  const { data, error } = await client.POST('/v1/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      displayName: body.displayName,
      birthDate: {
        year: body.birthDate.year,
        month: body.birthDate.month,
        day: body.birthDate.day,
      },
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
