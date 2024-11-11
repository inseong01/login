import styles from '@/styles/user/UserPage.module.css';
import DeleteAccountButton from '@/components/user/DeleteAccountButton';
import LogoutButton from '@/components/user/LogoutButton';
import { cookies } from 'next/headers';

async function Page() {
  // 로그인 쿠키 불러오기
  const cookieStore = await cookies();
  const loginCookie = cookieStore.get('login');
  const loginCookieValue = loginCookie && (await JSON.parse(loginCookie.value));
  const name = decodeURIComponent(loginCookieValue.name);

  return (
    <main className={styles.main}>
      <div className={styles.mainWrap}>
        <header className={styles.headTitle}>
          <h1>{`Welcome!`}</h1>
        </header>
        <div className={styles.middleBox}>
          <p>Lorem ipsum dolor.</p>
        </div>
        <div className={styles.btnWrap}>
          <div className={styles.btn}>
            <LogoutButton />
          </div>
          <div className={styles.btn}>
            <DeleteAccountButton />
          </div>
        </div>
      </div>
      {/* <div>something</div> */}
    </main>
  );
}

export default Page;
