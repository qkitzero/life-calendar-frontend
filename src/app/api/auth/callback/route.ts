import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:8081";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const redirectUri = `${req.nextUrl.origin}/api/auth/callback`;

  const authServiceRes = await fetch(`${AUTH_SERVICE_URL}/v1/exchange-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
  });

  if (!authServiceRes.ok) {
    return NextResponse.json(
      { error: "Exchange code request failed" },
      { status: authServiceRes.status }
    );
  }

  console.log(authServiceRes);

  const { accessToken } = await authServiceRes.json();

  const res = NextResponse.redirect(`${req.nextUrl.origin}/`);

  res.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return res;
}
