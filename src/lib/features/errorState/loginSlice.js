import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: false,
  password: false,
  isError: false,
  msg: {
    id: '',
    password: '',
    current: '',
  },
}

const loginSlice = createSlice({
  name: 'loginError',
  initialState,
  reducers: {
    resetLoginError: () => {
      return initialState;
    },
    getTypingLoginError: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      // 에러 조건
      const isSpace = /[\s]/g.test(value);
      const isTypeWrong = /[ㄱ-ㅎ|ㅏ-ㅣ|가-핳]/g.test(value);
      // 에러 메시지
      let msg = '';
      if (isTypeWrong) msg = '영문, 숫자, 특수문자로 입력해주세요.';
      else if (isSpace) msg = '공백은 없어야 합니다.';
      // 에러 할당
      switch (name) {
        case 'id': {
          // db 메시지 여부로 ID 변경 시 PWD 에러 초기화
          const isDBPasswordMsg = state.msg.password === '비밀번호가 일치하지 않습니다.';
          return {
            ...state,
            id: isTypeWrong || isSpace,
            password: state.password && !isDBPasswordMsg,
            isError: isTypeWrong || isSpace || state.password && !isDBPasswordMsg,
            msg: {
              ...state.msg,
              id: msg,
              password: state.msg.password && !isDBPasswordMsg ? state.msg.password : '',
              current: msg ? msg : state.msg.password && !isDBPasswordMsg ? state.msg.password : ''
            }
          }
        }
        case 'password': {
          return {
            ...state,
            password: isTypeWrong || isSpace,
            isError: state.id || isTypeWrong || isSpace,
            msg: {
              ...state.msg,
              password: msg,
              current: msg ? msg : state.msg.id ? state.msg.id : '',
            }
          }
        }
      }
    },
    getSubmitLoginEmptyError: (state, action) => {
      const isIdEmpty = !action.payload.id;
      const isPasswordEmpty = !action.payload.password;
      const isErrorBefore = state.id || state.password;
      let errorMsg = '';

      if (isIdEmpty && isPasswordEmpty) {
        errorMsg = '아이디와 비밀번호를 입력해주세요.'
      } else if (isIdEmpty) {
        errorMsg = '아이디를 입력해주세요.'
      } else if (isPasswordEmpty) {
        errorMsg = '비밀번호를 입력해주세요.'
      }

      // 형식이 있을 때(공백 삽입 O)
      if (!errorMsg && isErrorBefore) {
        return {
          ...state,
          id: state.id,
          password: state.password,
          isError: isErrorBefore,
          msg: {
            id: state.msg.id,
            password: state.msg.password,
            current: state.msg.id || state.msg.password
          }
        }
      }

      // 형식이 비었을 때
      return {
        ...state,
        id: state.id || isIdEmpty,
        password: state.password || isPasswordEmpty,
        isError: isIdEmpty || isPasswordEmpty || isErrorBefore,
        msg: {
          id: isIdEmpty ? '아이디를 입력해주세요.' : '',
          password: isPasswordEmpty ? '비밀번호를 입력해주세요.' : '',
          current: errorMsg
        }
      }
    },
    getSumbitLoginError: (state, action) => {
      const result = action.payload.result;
      switch (result) {
        case 'OK': {
          return state;
        }
        case 'SERVER ERROR': {
          return {
            ...state,
            isError: true,
            msg: {
              ...state.msg,
              current: '서버에 문제가 생겼습니다.',
            },
          }
        }
        case 'ID ERROR': {
          return {
            id: true,
            password: false,
            isError: true,
            msg: {
              id: '아이디가 존재하지 않습니다.',
              password: '',
              current: '아이디가 존재하지 않습니다.',
            },
          }
        }
        case 'PASSWORD ERROR': {
          return {
            id: false,
            password: true,
            isError: true,
            msg: {
              id: '',
              password: '비밀번호가 일치하지 않습니다.',
              current: '비밀번호가 일치하지 않습니다.',
            },
          }
        }
      }
    }
  }
})

export const { resetLoginError, getTypingLoginError, getSubmitLoginEmptyError, getSumbitLoginError } = loginSlice.actions;
export default loginSlice.reducer; // 단일 reducer 내보내기