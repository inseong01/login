'use client';

import styles from '@/styles/SwitchLoginBox.module.css';
import { LoginContext } from '@/app/LoginContextProvider';
import { useContext } from 'react';

function SwitchLoginBox() {
  const { state, dispatch } = useContext(LoginContext);

  switch (state.type) {
    case 'login': {
      return (
        <div className={styles.switchBox} onClick={() => dispatch({ type: 'SWITCH' })}>
          Create new account
        </div>
      );
    }
    case 'signUp': {
      return (
        <div className={styles.switchBox} onClick={() => dispatch({ type: 'SWITCH' })}>
          Login your account
        </div>
      );
    }
  }
}

export default SwitchLoginBox;
