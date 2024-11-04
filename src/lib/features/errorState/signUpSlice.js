import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: false,
  password: false,
  name: false,
  isError: false,
  msg: {
    id: '',
    password: '',
    name: '',
  }
}

const signUpSlice = createSlice({
  name: 'signUpError',
  initialState,
  reducers: {
    resetSignUpError: () => {
      return initialState;
    },
    getTypingSignUpError: (state, action) => {
      const name = action.payload.name;
      const text = action.payload.value;
      // 최소 길이 할당
      let minLength = 0;
      let maxLength = 0;
      switch (name) {
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
      const isSpace = /[\s]/g.test(text);
      const isTypeWrong =
        name !== 'name'
          ? /[ㄱ-ㅎ|ㅏ-ㅣ|가-핳]/g.test(text)
          : false;
      const isNameWrong =
        name === 'name'
          ? /[ㄱ-ㅎ|ㅏ-ㅣ]/g.test(text)
          : false
      const isMinLength =
        text.length < minLength
      const isMaxLength =
        text.length >= maxLength
      const isError = name === 'name'
        ? isSpace || isMinLength || isNameWrong
        : isSpace || isMinLength || isTypeWrong;
      // 에러 메시지
      let msg = '';
      if (isTypeWrong) msg = '영문, 숫자, 특수문자로 입력해주세요.';
      else if (isSpace) msg = '공백은 없어야 합니다.';
      else if (isNameWrong) msg = `자음 또는 모음으로 설정할 수 없습니다.`;
      else if (isMinLength) msg = `${minLength}글자 이상이어야 합니다.`;
      else if (isMaxLength) msg = `최대 ${maxLength}글자 입니다.`;
      // 에러 할당
      switch (name) {
        case 'id': {
          return {
            ...state,
            id: isTypeWrong || isSpace || isMinLength,
            isError: isError || state.password || state.name,
            msg: {
              ...state.msg,
              id: msg,
            },
          };
        }
        case 'password': {
          return {
            ...state,
            password: isTypeWrong || isSpace || isMinLength,
            isError: state.id || isError || state.name,
            msg: { ...state.msg, password: msg },
          };
        }
        case 'name': {
          return {
            ...state,
            name: isNameWrong || isSpace || isMinLength,
            isError: state.id || state.password || isError,
            msg: { ...state.msg, name: msg },
          };
        }
      }
    },
    getSubmitSignUpEmptyError: (state, action) => {
      const { id, password, name, msg } = state;
      const isIdEmpty = !action.payload.id;
      const isPasswordEmpty = !action.payload.password;
      const isNameEmpty = !action.payload.name;
      const isErrorBefore = state.id || state.password || state.name;

      // 이전 에러 동기화
      return {
        id: id || isIdEmpty,
        password: password || isPasswordEmpty,
        name: name || isNameEmpty,
        isError: isIdEmpty || isPasswordEmpty || isNameEmpty || isErrorBefore,
        msg: {
          id: msg.id ? msg.id : isIdEmpty ? '아이디를 입력하세요' : '',
          password: msg.password ? msg.password : isPasswordEmpty ? '비밀번호를 입력하세요' : '',
          name: msg.name ? msg.name : isNameEmpty ? '이름을 입력하세요' : '',
        }
      }
    }
  },
})

export const { resetSignUpError, getTypingSignUpError, getSubmitSignUpEmptyError } = signUpSlice.actions;
export default signUpSlice.reducer;