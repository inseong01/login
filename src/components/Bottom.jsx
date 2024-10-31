import styles from '@/styles/Bottom.module.css';
import SubmitButton from './SubmitButton';
import SwitchLoginBox from './SwitchLoginBox';

function Bottom() {
  return (
    <div className={styles.btm}>
      <SubmitButton />
      <SwitchLoginBox />
    </div>
  );
}

export default Bottom;
