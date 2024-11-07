import styles from '@/styles/ForgetLinkButton.module.css';
import { useSelector } from 'react-redux';

function ForgetLinkButton() {
  const submitState = useSelector((state) => state.submitState);

  function onClickForgetLink(e) {
    if (submitState.submitStatus === 'PROCESS') return;
  }
  return (
    <div className={styles.forgetLink} onClick={onClickForgetLink}>
      <span>Forget Password</span>
    </div>
  );
}

export default ForgetLinkButton;
