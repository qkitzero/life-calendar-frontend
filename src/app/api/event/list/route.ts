import { NextRequest, NextResponse } from 'next/server';

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:8083';

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  const eventServiceRes = await fetch(`${EVENT_SERVICE_URL}/v1/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!eventServiceRes.ok) {
    return NextResponse.json(
      { error: 'List events request failed' },
      { status: eventServiceRes.status },
    );
  }

  const data = await eventServiceRes.json();

  return NextResponse.json(data);
}
