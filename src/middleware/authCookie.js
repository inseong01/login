import { cookies } from "next/headers";

// 쿠키 변조 감지
async function authCookie() {
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
    // 로그인 쿠키 검증 결과
    const result = await response.text();
    return result;
  } catch (err) {
    return 'Error';
  }
}

export default authCookie