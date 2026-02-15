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
      startTime: body.startTimeISO,
      endTime: body.endTimeISO,
      color: body.color,
    },
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
