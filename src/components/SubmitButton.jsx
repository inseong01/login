'use client';

import { getSubmitLoginEmptyError } from '@/lib/features/errorState/loginSlice';
import { getSubmitSignUpEmptyError } from '@/lib/features/errorState/signUpSlice';
import styles from '@/styles/SubmitButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

function SubmitButton() {
  const formState = useSelector((state) => state.formState);
  const loginErrorState = useSelector((state) => state.loginError);
  const signUpErrorState = useSelector((state) => state.signUpError);
  const dispatch = useDispatch();

  return (
    <input
      type="submit"
      className={`${styles.btn}`}
      value={'SUBMIT'}
      onClick={(e) => {
        switch (formState.type) {
          case 'login': {
            const id = document.getElementById('loginID').value;
            const password = document.getElementById('loginPassword').value;
            dispatch(getSubmitLoginEmptyError({ id, password }));
            // 오류 있으면 전송 제한
            if (loginErrorState.isError) {
              e.preventDefault();
              return;
            }
            return;
          }
          case 'signUp': {
            const id = document.getElementById('signUpID').value;
            const password = document.getElementById('signUpPassword').value;
            const name = document.getElementById('signUpName').value;
            dispatch(getSubmitSignUpEmptyError({ id, password, name }));
            // 오류 있으면 전송 제한
            if (signUpErrorState.isError) {
              e.preventDefault();
              return;
            }
            return;
          }
        }
      }}
    />
  );
}

export default SubmitButton;
