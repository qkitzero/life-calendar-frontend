import { client } from '@/app/api/event/client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const body = await req.json();

  const { data, error } = await client.DELETE('/v1/events/{id}', {
    params: {
      path: {
        id: body.id,
      },
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
