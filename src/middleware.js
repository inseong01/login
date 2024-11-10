import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 쿠키 변조 감지
export async function middleware(req, res) {
  try {
    // 로그인 쿠키 불러오기
    const cookieStore = await cookies();
    const loginCookie = cookieStore.get('login');
    // 로그인 쿠키 전달하기
    const response = await fetch('http://localhost:3000/api/redis/exist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `login=${loginCookie.value}`
      },
    });
    // 로그인 쿠키 검증
    const result = await response.text();
    return result === 'OK'
      ? NextResponse.next() : NextResponse.redirect(new URL('/', req.url));
  } catch (err) {
    // 에러 발생 시 홈으로 이동
    console.error('Middleware error', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  // 검증할 경로 배열 요소로 추가
  matcher: '/user', // 하나만 있을 때 배열 사용 X
};