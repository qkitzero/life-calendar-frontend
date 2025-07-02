import { NextRequest, NextResponse } from "next/server";

const USER_SERVICE_URL =
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8082";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  const userServiceRes = await fetch(`${USER_SERVICE_URL}/v1/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userServiceRes.ok) {
    return NextResponse.json(
      { error: "Get user request failed" },
      { status: userServiceRes.status }
    );
  }

  const data = await userServiceRes.json();

  return NextResponse.json(data);
}
