import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:8081";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:8082";

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

  const { accessToken } = await authServiceRes.json();

  const userServiceRes = await fetch(`${USER_SERVICE_URL}/v1/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (userServiceRes.status === 404) {
    const res = NextResponse.redirect(`${req.nextUrl.origin}/register`);
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return res;
  }

  if (!userServiceRes.ok) {
    console.error("Failed to get user:", await userServiceRes.text());
    return NextResponse.json(
      { error: "Get user request failed" },
      { status: userServiceRes.status }
    );
  }

  const res = NextResponse.redirect(`${req.nextUrl.origin}/`);
  res.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  return res;
}
