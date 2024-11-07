import DeleteAccountButton from '@/components/DeleteAccountButton';
import LogoutButton from '@/components/LogoutButton';
import { cookies } from 'next/headers';

async function Page() {
  // 로그인 쿠키 불러오기
  const cookieStore = await cookies();
  const loginCookie = cookieStore.get('login');
  const loginCookieValue = loginCookie && (await JSON.parse(loginCookie.value));

  return (
    <>
      <div>
        <h1>{`Welcome '${loginCookieValue.name}'`}</h1>
      </div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <DeleteAccountButton />
      </div>
    </>
  );
}

export default Page;
