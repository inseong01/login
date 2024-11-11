'use client';

import { resetLoginError } from '@/lib/features/errorState/loginSlice';
import { resetSignUpError } from '@/lib/features/errorState/signUpSlice';
import { resetIdCheckState } from '@/lib/features/submitState/idCheckSlice';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import { switchForm } from '@/lib/features/switchState/formSlice';
import styles from '@/styles/SwitchLoginBox.module.css';
import { useDispatch, useSelector } from 'react-redux';

function SwitchLoginBox() {
  const formState = useSelector((state) => state.formState);
  const submitState = useSelector((state) => state.submitState);
  const dispatch = useDispatch();

  function onClickSwitch(type) {
    return () => {
      if (submitState.submitStatus === 'PROCESS') return;
      if (submitState.submitStatus === 'SUCCESS' && type === 'signUp') return;

      dispatch(switchForm({ type }));
      dispatch(resetLoginError());
      dispatch(resetSignUpError());
      dispatch(resetIdCheckState());
      dispatch(resetSubmitState());
    };
  }

  switch (formState.type) {
    case 'login': {
      return (
        <div className="box">
          <div className={styles.switchBox} onClick={onClickSwitch('signUp')}>
            Create new account
          </div>
        </div>
      );
    }
    case 'signUp': {
      return (
        <div className="box">
          <div className={styles.switchBox} onClick={onClickSwitch('login')}>
            Login your account
          </div>
        </div>
      );
    }
  }
}

export default SwitchLoginBox;
