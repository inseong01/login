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
          const response = await fetch('/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          console.log(result);
          if (result.isCorrect) {
            console.log('Pass');
          } else {
            console.log('Nope');
          }
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
