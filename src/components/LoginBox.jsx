'use client';

import styles from '@/styles/LoginBox.module.css';
import Bottom from './Bottom';
import Middle from './Middle';
import Top from './Top';
import LoginContextProvider from '@/app/LoginContextProvider';

function LoginBox() {
  return (
    <LoginContextProvider>
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
              // 성공 'OK', 실패 'FAILD'
              switch (result) {
                case 'OK': {
                  // 이동
                  console.log('성공', result);
                  break;
                }
                default: {
                  // 로그인 화면 에러 표시
                  console.log('실패', result);
                }
              }
            })
            .catch((err) => console.error('Fetch Error,', err));
        }}
      >
        <Top />
        <Middle />
        <Bottom />
      </form>
    </LoginContextProvider>
  );
}

export default LoginBox;
