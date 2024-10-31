function SignUpInputs() {
  const err = {
    id: false,
    pwd: true,
  };

  return (
    <>
      <div className={`${styles.inputBox}`}>
        {err.id && <div className={styles.error}>??</div>}
        <input
          type={'text'}
          className={`${styles.input} ${err.id ? styles.wrong : ''}`}
          placeholder={`ID를 입력하세요`}
        />
      </div>
      <div className={`${styles.inputBox}`}>
        {err.pwd && <div className={styles.error}>??</div>}
        <input
          type={'password'}
          className={`${styles.input} ${err.pwd ? styles.wrong : ''}`}
          placeholder={`Password를 입력하세요`}
        />
      </div>
      <div className={styles.forgetLink}>
        <span>Forget Password</span>
      </div>
    </>
  );
}

export default SignUpInputs;
