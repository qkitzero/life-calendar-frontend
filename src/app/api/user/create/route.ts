import { NextRequest, NextResponse } from "next/server";

const USER_SERVICE_URL =
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8082";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const body = await req.json();

  const userServiceRes = await fetch(`${USER_SERVICE_URL}/v1/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      birth_date: {
        year: body.birthDate.year,
        month: body.birthDate.month,
        day: body.birthDate.day,
      },
      display_name: body.displayName,
    }),
  });

  if (!userServiceRes.ok) {
    return NextResponse.json(
      { error: "Create user request failed" },
      { status: userServiceRes.status }
    );
  }

  const data = await userServiceRes.json();

  return NextResponse.json(data);
}
