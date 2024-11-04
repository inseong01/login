'use client';

import styles from '@/styles/LoginInputs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTypingLoginError } from '@/lib/features/errorState/loginSlice';
import { getTypingSignUpError } from '@/lib/features/errorState/signUpSlice';
import ForgetLinkButton from './ForgetLinkButton';

function LoginInputs() {
  const loginErrorState = useSelector((state) => state.loginError);
  const signUpErrorState = useSelector((state) => state.signUpError);
  const formState = useSelector((state) => state.formState);
  const dispatch = useDispatch();

  // 입력 함수
  function getTypingValue(e) {
    // 폼 구분
    if (formState.type === 'login') {
      dispatch(getTypingLoginError({ value: e.target.value, name: e.target.name }));
    } else if (formState.type === 'signUp') {
      dispatch(getTypingSignUpError({ value: e.target.value, name: e.target.name }));
    }
  }

  switch (formState.type) {
    case 'login': {
      const { isError, id, password, msg } = loginErrorState;
      console.log(loginErrorState);
      return (
        <>
          <div className={`${styles[formState.type]} ${styles.inputBox}`}>
            {msg.current && (
              <div className={`${styles.msgBox} ${isError ? styles.error : ''}`}>{msg.current}</div>
            )}
            <input
              required
              maxLength={12}
              id="loginID"
              type="text"
              name="id"
              className={`${styles.input} ${id ? styles.wrong : ''}`}
              placeholder={`아이디를 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
          <div className={`${styles[formState.type]} ${styles.inputBox}`}>
            <input
              required
              maxLength={16}
              id="loginPassword"
              type="password"
              name="password"
              className={`${styles.input} ${password ? styles.wrong : ''}`}
              placeholder={`비밀번호를 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
          <ForgetLinkButton />
        </>
      );
    }
    case 'signUp': {
      const { name, id, password, msg } = signUpErrorState;
      return (
        <>
          <div className={`${styles[formState.type]} ${styles.inputBox}`}>
            <div className={styles.category}>이름</div>
            {msg.name && <div className={`${styles.msgBox} ${name ? styles.error : ''}`}>{msg.name}</div>}
            <input
              required
              minLength={2}
              maxLength={8}
              id="signUpName"
              type="text"
              name="name"
              className={`${styles.input} ${name ? styles.wrong : ''}`}
              placeholder={`이름을 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
          <div className={`${styles[formState.type]} ${styles.inputBox}`}>
            <div className={styles.category}>ID</div>
            {msg.id && <div className={`${styles.msgBox} ${id ? styles.error : ''}`}>{msg.id}</div>}
            <div className={styles.inputWrap}>
              <input
                required
                minLength={6}
                maxLength={12}
                id="signUpID"
                type="text"
                name="id"
                className={`${styles.input} ${id ? styles.wrong : ''}`}
                placeholder={`아이디를 입력하세요`}
                onChange={getTypingValue}
              />
              <input type="button" className={styles.input} value="Check" />
            </div>
          </div>
          <div className={`${styles[formState.type]} ${styles.inputBox}`}>
            <div className={styles.category}>비밀번호</div>
            {msg.password && (
              <div className={`${styles.msgBox} ${password ? styles.error : ''}`}>{msg.password}</div>
            )}
            <input
              required
              minLength={8}
              maxLength={16}
              id="signUpPassword"
              type="password"
              name="password"
              className={`${styles.input} ${password ? styles.wrong : ''}`}
              placeholder={`비밀번호를 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
        </>
      );
    }
  }
}

export default LoginInputs;
