'use client';

import { resetLoginError } from '@/lib/features/errorState/loginSlice';
import { resetSignUpError } from '@/lib/features/errorState/signUpSlice';
import { switchForm } from '@/lib/features/switchState/formSlice';
import styles from '@/styles/SwitchLoginBox.module.css';
import { useDispatch, useSelector } from 'react-redux';

function SwitchLoginBox() {
  const formState = useSelector((state) => state.formState);
  const dispatch = useDispatch();

  switch (formState.type) {
    case 'login': {
      return (
        <div
          className={styles.switchBox}
          onClick={() => {
            dispatch(switchForm({ type: 'signUp' }));
            dispatch(resetLoginError());
          }}
        >
          Create new account
        </div>
      );
    }
    case 'signUp': {
      return (
        <div
          className={styles.switchBox}
          onClick={() => {
            dispatch(switchForm({ type: 'login' }));
            console.log();
            dispatch(resetSignUpError());
          }}
        >
          Login your account
        </div>
      );
    }
  }
}

export default SwitchLoginBox;
