'use client';

import styles from '@/styles/LoginInputs.module.css';
import { LoginContext } from '@/app/LoginContextProvider';
import { useContext, useEffect, useState } from 'react';
import getErrorMessage from '@/function/getErrorMessage';

let obj = {};
const initError = {
  id: false,
  pwd: false,
  name: false,
  msg: { id: '', pwd: '', name: '', current: '' },
};

function LoginInputs() {
  const { state, dispatch } = useContext(LoginContext);
  const [err, setError] = useState(initError);

  useEffect(() => {
    if (state.isSubmit) {
      obj['type'] = state.type;
      dispatch({ type: 'SUBMIT_DATA', data: obj });
      obj = {};
    }
    // 화면 전환하면 에러 초기화
    setError(initError);
  }, [state]);

  // 입력 함수
  function getTypingValue(e) {
    // 에러 확인
    getErrorMessage(e, state, err, setError);
    // 값 저장
    obj[e.target.name] = e.target.value;
  }

  switch (state.type) {
    case 'login': {
      return (
        <>
          <div className={`${styles[state.type]} ${styles.inputBox}`}>
            {(err.id || err.pwd) && <div className={styles.error}>{err.msg.current}</div>}
            <input
              required
              type="text"
              name="id"
              className={`${styles.input} ${err.id ? styles.wrong : ''}`}
              placeholder={`ID를 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
          <div className={`${styles[state.type]} ${styles.inputBox}`}>
            <input
              required
              type="password"
              name="password"
              className={`${styles.input} ${err.pwd ? styles.wrong : ''}`}
              placeholder={`Password를 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
          <div className={styles.forgetLink}>
            <span>Forget Password</span>
          </div>
        </>
      );
    }
    case 'signUp': {
      return (
        <>
          <div className={`${styles[state.type]} ${styles.inputBox}`}>
            <div className={styles.category}>이름</div>
            {err.name && <div className={styles.error}>{err.msg.name}</div>}
            <input
              required
              minLength={2}
              type="text"
              name="name"
              className={`${styles.input} ${err.name ? styles.wrong : ''}`}
              placeholder={`이름을 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
          <div className={`${styles[state.type]} ${styles.inputBox}`}>
            <div className={styles.category}>ID</div>
            {err.id && <div className={styles.error}>{err.msg.id}</div>}
            <div className={styles.inputWrap}>
              <input
                required
                minLength={6}
                type="text"
                name="id"
                className={`${styles.input} ${err.id ? styles.wrong : ''}`}
                placeholder={`ID를 입력하세요`}
                onChange={getTypingValue}
              />
              <input type="button" className={styles.input} value="Check" />
            </div>
          </div>
          <div className={`${styles[state.type]} ${styles.inputBox}`}>
            <div className={styles.category}>비밀번호</div>
            {err.pwd && <div className={styles.error}>{err.msg.pwd}</div>}
            <input
              required
              minLength={8}
              type="password"
              name="password"
              className={`${styles.input} ${err.pwd ? styles.wrong : ''}`}
              placeholder={`Password를 입력하세요`}
              onChange={getTypingValue}
            />
          </div>
        </>
      );
    }
  }
}

export default LoginInputs;
