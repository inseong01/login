'use client';

import { useRouter } from 'next/navigation';

function LogoutButton() {
  const router = useRouter();

  async function onClickLogout() {
    // 서버 요청
    const response = await fetch('api/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    // 서버 응답
    if (result === 'OK') return router.push('/');
  }

  return <input type="button" value={'logout'} onClick={onClickLogout} />;
}

export default LogoutButton;
