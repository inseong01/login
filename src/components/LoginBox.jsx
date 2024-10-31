import styles from '@/styles/LoginBox.module.css';
import Bottom from './Bottom';
import Middle from './Middle';
import Top from './Top';
import LoginContextProvider from '@/app/LoginContextProvider';

function LoginBox() {
  return (
    <LoginContextProvider>
      <form className={styles.loginBox} method="post">
        <Top />
        <Middle />
        <Bottom />
      </form>
    </LoginContextProvider>
  );
}

export default LoginBox;
