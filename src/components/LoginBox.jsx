'use client';

import styles from '@/styles/LoginBox.module.css';
import Bottom from './Bottom';
import Middle from './Middle';
import Top from './Top';
import { useDispatch, useSelector } from 'react-redux';
import { getSumbitLoginError } from '@/lib/features/errorState/loginSlice';
import { getSumbitSignUpError } from '@/lib/features/errorState/signUpSlice';
import { asyncSubmitFetch, changeSubmitState } from '@/lib/features/submitState/submitSlice';
import { useEffect } from 'react';

function LoginBox() {
  const formState = useSelector((state) => state.formState);
  const submitState = useSelector((state) => state.submitState);
  const dispatch = useDispatch();

  useEffect(
    function updateSubmitState() {
      if (!submitState.isSubmit) return;
      // console.log(submitState);
    },
    [submitState]
  );

  return (
    <form
      id="loginForm"
      method="post"
      className={styles.loginBox}
      onSubmit={async (e) => {
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
            return;
          }
          case 'signUp': {
            // 에러 처리
            dispatch(getSumbitSignUpError({ result }));
            // 화면 이동, 상태 초기화(연속 클릭 방지)
            return;
          }
        }
      }}
    >
      <Top />
      <Middle />
      <Bottom />
    </form>
  );
}

export default LoginBox;
