'use client';

import styles from '@/styles/SubmitButton.module.css';
import { LoginContext } from '@/app/LoginContextProvider';
import { useContext } from 'react';

function SubmitButton() {
  const { dispatch } = useContext(LoginContext);

  return (
    <input
      type="submit"
      className={`${styles.btn}`}
      value={'SUBMIT'}
      onClick={() => {
        dispatch({ type: 'CLICK_SUBMIT' });
      }}
    />
  );
}

export default SubmitButton;
