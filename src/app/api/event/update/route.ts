import { NextRequest, NextResponse } from "next/server";

const EVENT_SERVICE_URL =
  process.env.EVENT_SERVICE_URL || "http://localhost:8083";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const body = await req.json();

  const eventServiceRes = await fetch(
    `${EVENT_SERVICE_URL}/v1/events/${body.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        event: {
          title: body.title,
          description: body.description,
          startTime: body.startTimeISO,
          endTime: body.endTimeISO,
          color: body.color,
        },
      }),
    }
  );

  if (!eventServiceRes.ok) {
    return NextResponse.json(
      { error: "Update event request failed" },
      { status: eventServiceRes.status }
    );
  }

  const data = await eventServiceRes.json();

  return NextResponse.json(data);
}
