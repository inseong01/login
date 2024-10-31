import styles from '@/styles/Middle.module.css';
import LoginInputs from './LoginInputs';

function Middle() {
  return (
    <div className={`${styles.middle}`}>
      <LoginInputs />
    </div>
  );
}

export default Middle;
