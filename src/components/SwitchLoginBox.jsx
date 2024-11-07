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

  function onClickloginSwitch() {
    if (submitState.submitStatus === 'PROCESS') return;
    dispatch(switchForm({ type: 'signUp' }));
    dispatch(resetLoginError());
    dispatch(resetSubmitState());
  }

  function onClickSignUpSwitch() {
    if (submitState.submitStatus === 'PROCESS') return;
    dispatch(switchForm({ type: 'login' }));
    dispatch(resetSignUpError());
    dispatch(resetIdCheckState());
    dispatch(resetSubmitState());
  }

  switch (formState.type) {
    case 'login': {
      return (
        <div className={styles.switchBox} onClick={onClickloginSwitch}>
          Create new account
        </div>
      );
    }
    case 'signUp': {
      return (
        <div className={styles.switchBox} onClick={onClickSignUpSwitch}>
          Login your account
        </div>
      );
    }
  }
}

export default SwitchLoginBox;
