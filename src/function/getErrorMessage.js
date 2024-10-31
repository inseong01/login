export default function getErrorMessage(e, state, err, setError) {
  // 첫 로그인 검사 방지
  if (state.type === 'login' && state.isFirstLogin) return;
  // 최소 길이 할당
  let minLength = 0;
  let maxLength = 0;
  switch (e.target.name) {
    case 'id': {
      minLength = 6;
      maxLength = minLength * 2;
      break;
    }
    case 'password': {
      minLength = 8;
      maxLength = minLength * 2;
      break;
    }
    case 'name': {
      minLength = 2;
      maxLength = minLength * 4;
      break;
    }
    default: {
      console.error('Set Length Error');
    }
  }
  // 에러 조건
  const isSpace = /[\s]/g.test(e.target.value);
  const isTypeWrong = /[ㄱ-ㅎ|ㅏ-ㅣ|가-핳]/g.test(e.target.value);
  const isMinLength =
    state.type === 'login'
      ? e.target.value.length < minLength &&
      e.target.value.length >= 1
      : e.target.value.length < minLength;
  const isMaxLength = e.target.value.length > maxLength
  // 에러 메시지
  let msg = '';
  if (isTypeWrong) msg = '영문, 숫자, 특수문자로 입력해주세요.';
  else if (isSpace) msg = '공백은 없어야 합니다.';
  else if (isMinLength) msg = `${minLength}글자 이상이어야 합니다.`;
  else if (isMaxLength) msg = `${maxLength}글자 이하이어야 합니다.`;
  // 에러 할당
  switch (e.target.name) {
    case 'id': {
      setError((prev) => {
        return {
          ...prev,
          id: isTypeWrong || isMinLength || isSpace || isMaxLength,
          msg: {
            ...prev.msg,
            id: msg,
            current: msg ? msg : err.msg.pwd ? err.msg.pwd : '',
          },
        };
      });
      return;
    }
    case 'password': {
      setError((prev) => {
        return {
          ...prev,
          pwd: isTypeWrong || isMinLength || isSpace || isMaxLength,
          msg: { ...prev.msg, pwd: msg, current: msg ? msg : err.msg.id ? err.msg.id : '' },
        };
      });
      return;
    }
    case 'name': {
      setError((prev) => {
        return {
          ...prev,
          name: isTypeWrong || isMinLength || isSpace || isMaxLength,
          msg: { ...prev.msg, name: msg, current: '' },
        };
      });
      return;
    }
  }
}