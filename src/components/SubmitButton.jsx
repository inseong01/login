'use client';

import { getSubmitLoginEmptyError } from '@/lib/features/errorState/loginSlice';
import { getSubmitSignUpEmptyError } from '@/lib/features/errorState/signUpSlice';
import styles from '@/styles/SubmitButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

function SubmitButton() {
  const formState = useSelector((state) => state.formState);
  const loginErrorState = useSelector((state) => state.loginError);
  const signUpErrorState = useSelector((state) => state.signUpError);
  const submitState = useSelector((state) => state.submitState);
  const idCheckState = useSelector((state) => state.idCheckState);
  const dispatch = useDispatch();

  return (
    <input
      type="submit"
      className={`${styles.btn} ${styles[submitState.submitStatus]}`}
      value={submitState.isSubmit ? submitState.submitStatus : 'SUBMIT'}
      onClick={(e) => {
        // 제출된 다음 클릭 방지
        if (submitState.isSubmit) return e.preventDefault();

        // 제출 유형
        switch (formState.type) {
          case 'login': {
            const id = document.getElementById('loginID').value;
            const password = document.getElementById('loginPassword').value;
            dispatch(getSubmitLoginEmptyError({ id, password }));
            // 오류 있으면 전송 제한
            if (loginErrorState.isError) return e.preventDefault();
            return;
          }
          case 'signUp': {
            const id = document.getElementById('signUpID').value;
            const password = document.getElementById('signUpPassword').value;
            const name = document.getElementById('signUpName').value;
            dispatch(getSubmitSignUpEmptyError({ id, password, name }));
            // 오류 있으면 전송 제한
            if (signUpErrorState.isError || !signUpErrorState.isCheckedID) return e.preventDefault();
            return;
          }
        }
      }}
    />
  );
}

export default SubmitButton;
