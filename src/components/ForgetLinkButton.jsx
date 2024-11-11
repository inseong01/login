import { switchForm } from '@/lib/features/switchState/formSlice';
import styles from '@/styles/ForgetLinkButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

function ForgetLinkButton() {
  const submitState = useSelector((state) => state.submitState);
  const dispatch = useDispatch();

  function onClickForgetLink(e) {
    if (submitState.submitStatus === 'PROCESS') return;
    dispatch(switchForm({ type: 'forget' }));
  }
  return (
    <div className={styles.forgetLink} onClick={onClickForgetLink}>
      <span>Forget Password</span>
    </div>
  );
}

export default ForgetLinkButton;
