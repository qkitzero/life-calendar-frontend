import { client as authClient } from '@/app/api/auth/client';
import { client as userClient } from '@/app/api/user/client';
import { NextRequest, NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const redirectUri = `${SITE_URL}/api/auth/callback`;

  const { data: authData, error: authError } = await authClient.POST('/v1/exchange-code', {
    body: { code, redirect_uri: redirectUri },
  });

  if (authError) {
    return NextResponse.json(authError, { status: 500 });
  }

  const accessToken = authData.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 500 });
  }

  const { error: userError, response: userResponse } = await userClient.GET('/v1/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (userResponse.status === 404) {
    const res = NextResponse.redirect(`${SITE_URL}/register`);
    res.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
    });
    return res;
  }

  if (userError) {
    return NextResponse.json(userError, { status: 500 });
  }

  const res = NextResponse.redirect(`${SITE_URL}/`);
  res.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
  });
  return res;
}
