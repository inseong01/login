'use client';

import styles from '@/styles/LoginBox.module.css';
import Bottom from './Bottom';
import Middle from './Middle';
import Top from './Top';
import { useDispatch, useSelector } from 'react-redux';
import { getSumbitLoginError } from '@/lib/features/errorState/loginSlice';
import { getSumbitSignUpError } from '@/lib/features/errorState/signUpSlice';
import { asyncSubmitFetch } from '@/lib/features/submitState/submitSlice';
import { useRouter } from 'next/navigation';

function LoginBox() {
  // 상태
  const formState = useSelector((state) => state.formState);
  const dispatch = useDispatch();

  // 라우터
  const router = useRouter();

  async function onSubmitForm(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    for (let value of form) {
      data[value[0]] = value[1];
    }
    // async dispatch, Promise 반환
    const fetchResult = await dispatch(asyncSubmitFetch({ type: formState.type, data }));
    const { result } = fetchResult.payload;
    switch (formState.type) {
      case 'login': {
        // 에러 처리
        dispatch(getSumbitLoginError({ result }));
        // 화면 이동, 상태 초기화(연속 클릭 방지)
        if (result !== 'OK') return;
        await new Promise((res) => setTimeout(() => res(), 500));
        return await router.push('/user');
      }
      case 'signUp': {
        // 에러 처리
        dispatch(getSumbitSignUpError({ result }));
        // 화면 이동, 상태 초기화(연속 클릭 방지)
        return;
      }
    }
  }

  return (
    <form id="loginForm" method="post" className={styles.loginBox} onSubmit={onSubmitForm}>
      <Top />
      <Middle />
      <Bottom />
    </form>
  );
}

export default LoginBox;
