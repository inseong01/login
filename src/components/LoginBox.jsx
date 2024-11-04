'use client';

import styles from '@/styles/LoginBox.module.css';
import Bottom from './Bottom';
import Middle from './Middle';
import Top from './Top';
import { useDispatch, useSelector } from 'react-redux';
import { getSumbitLoginError } from '@/lib/features/errorState/loginSlice';

function LoginBox() {
  const formState = useSelector((state) => state.formState);
  const dispatch = useDispatch();
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
        console.log(data);

        switch (formState.type) {
          case 'login': {
            fetch('/login', {
              method: 'post',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            })
              .then((response) => {
                console.log(response);
                if (response.ok && response.status === 200) return response.text();
              })
              .then((result) => {
                // 로그인 에러 처리
                dispatch(getSumbitLoginError({ result }));
              })
              .catch((err) => {
                // 패치 오류 처리
                dispatch(getSumbitLoginError({ result: 'SERVER ERROR' }));
                console.error('Fetch Error,', err);
              });
          }
          case 'signUp': {
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
