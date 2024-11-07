'use client';

import { useRouter } from 'next/navigation';

function DeleteAccountButton() {
  const router = useRouter();

  async function onClickDeleteAccount() {
    // 서버 요청
    const response = await fetch('api/delete/account', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    });
    // 서버 응답
    const result = await response.text();
    if (result === 'OK') return router.push('/');
  }
  return <input type="button" value={'delete account'} onClick={onClickDeleteAccount} />;
}

export default DeleteAccountButton;
