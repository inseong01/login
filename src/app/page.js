import styles from "./page.module.css";
import LoginBox from "@/components/LoginBox";
import StoreProvider from "./StoreProvider";

export default function Home() {

  return (
    <div className={styles.wrap}>
      <main className={styles.frame}>
        <StoreProvider>
          <LoginBox />
        </StoreProvider>
      </main>
    </div>
  );
}
