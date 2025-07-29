import { NextRequest, NextResponse } from "next/server";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:8082";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const body = await req.json();

  const userServiceRes = await fetch(`${USER_SERVICE_URL}/v1/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      display_name: body.displayName,
    }),
  });

  if (!userServiceRes.ok) {
    return NextResponse.json(
      { error: "Update user request failed" },
      { status: userServiceRes.status }
    );
  }

  const data = await userServiceRes.json();

  return NextResponse.json(data);
}
