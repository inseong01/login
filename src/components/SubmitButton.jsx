'use client';

import styles from '@/styles/SubmitButton.module.css';
import { LoginContext } from '@/app/LoginContextProvider';
import { useContext, useState } from 'react';

function SubmitButton() {
  const { state, dispatch } = useContext(LoginContext);

  return (
    <input
      type="submit"
      className={`${styles.btn}`}
      value={'SUBMIT'}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'CLICK_SUBMIT' });
      }}
    />
  );
}

export default SubmitButton;
