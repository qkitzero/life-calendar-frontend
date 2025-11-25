import { client } from '@/app/api/event/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const body = await req.json();

  const { data, error } = await client.POST('/v1/events', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      title: body.title,
      description: body.description,
      start_time: body.startTimeISO,
      end_time: body.endTimeISO,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
