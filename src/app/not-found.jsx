'use client';

import styles from '@/styles/NotFound.module.css';
import btn from '@/styles/user/Button.module.css';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  function onClickPushHome() {
    router.push('/');
  }
  return (
    <main className={styles.main}>
      <div className={styles.mainWrap}>
        <header className={styles.headTitle}>
          <h1>404 Error</h1>
        </header>
        <div className={styles.middleBox}>
          <p>Something is wrong...</p>
        </div>
        <div className={styles.btnWrap}>
          <div className={styles.btn}>
            <input type="button" className={btn.input} value={'Go back'} onClick={onClickPushHome} />
          </div>
        </div>
      </div>
      {/* <div>something</div> */}
    </main>
  );
}
