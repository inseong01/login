import styles from "./page.module.css";
import LoginBox from "@/components/LoginBox";

export default function Home() {

  return (
    <div className={styles.wrap}>
      <main className={styles.frame}>
        <LoginBox />
      </main>
    </div>
  );
}
