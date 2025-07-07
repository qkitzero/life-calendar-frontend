import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:8081";

export async function GET(req: NextRequest) {
  const returnTo = `${req.nextUrl.origin}/`;

  const authServiceRes = await fetch(`${AUTH_SERVICE_URL}/v1/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ return_to: returnTo }),
  });

  if (!authServiceRes.ok) {
    return NextResponse.json(
      { error: "Logout request failed" },
      { status: authServiceRes.status }
    );
  }

  const data = await authServiceRes.json();

  const res = NextResponse.json(data);

  res.cookies.delete("access_token");

  return res;
}
