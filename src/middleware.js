import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import authCookie from "./middleware/authCookie";

export async function middleware(req, res) {
  switch (req.nextUrl.pathname) {
    case '/user': {
      const result = await authCookie();

      if (result === 'OK') return NextResponse.next();
      else return NextResponse.redirect(new URL('/', req.url));
    }
    case '/': {
      const result = await authCookie();

      if (result === 'OK') return NextResponse.redirect(new URL('/user', req.url))
      return NextResponse.next();
    }
  }
}

export const config = {
  // 검증할 경로 배열 요소로 추가
  matcher: '/:path*', // 하나만 있을 때 배열 사용 X
};