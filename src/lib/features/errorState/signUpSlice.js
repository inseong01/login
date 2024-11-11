import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: false,
  password: false,
  name: false,
  isError: false,
  isCheckedID: false,
  msg: {
    id: '',
    password: '',
    name: '',
    current: ''
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
      if (isTypeWrong) msg = 'Please enter letters, numbers, and special characters.';
      else if (isSpace) msg = 'Spaces are not allowed.';
      else if (isNameWrong) msg = 'Cannot be set to a consonant or a vowel.';
      else if (isMinLength) msg = `Must be at least ${minLength} characters.`;
      else if (isMaxLength) msg = `Cannot exceed ${maxLength} characters.`;
      // 에러 할당
      switch (name) {
        case 'id': {
          return {
            ...state,
            id: isTypeWrong || isSpace || isMinLength,
            isError: isError || state.password || state.name,
            isCheckedID: false,
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
    isCheckID: (state, action) => {
      const result = action.payload.result;
      switch (result) {
        case 'OK': {
          return {
            ...state,
            id: false,
            isError: state.password || state.name,
            isCheckedID: true,
            msg: {
              ...state.msg,
              id: 'The ID is available for use.'
            }
          }
        }
        case 'SERVER ERROR': {
          return {
            ...state,
            id: true,
            isError: true,
            isCheckedID: false,
            msg: {
              ...state.msg,
              id: 'Server error'
            }
          }
        }
        default: {
          return {
            ...state,
            id: true,
            isError: true,
            isCheckedID: true,
            msg: {
              ...state.msg,
              id: 'The ID is already in use.'
            }
          }
        }
      }
    },
    getSubmitSignUpEmptyError: (state, action) => {
      const { id, password, name, isCheckedID, msg } = state;
      const isIdEmpty = !action.payload.id;
      const isPasswordEmpty = !action.payload.password;
      const isNameEmpty = !action.payload.name;

      const idError = id || isIdEmpty || !isCheckedID; // id만 isCheckedID 오류 발생
      const passwordError = password || isPasswordEmpty;
      const nameError = name || isNameEmpty;
      const isErrorBefore = id || password || name;
      const isError = isIdEmpty || isPasswordEmpty || isNameEmpty || isErrorBefore || !isCheckedID;

      // 이전 에러 동기화
      return {
        ...state,
        id: idError,
        password: passwordError,
        name: nameError,
        isError,
        msg: {
          ...state.msg,
          id: msg.id
            ? msg.id : isIdEmpty
              ? 'Please enter your ID' : !isCheckedID
                ? 'Please check if the ID is duplicated' : '',
          password: msg.password
            ? msg.password : isPasswordEmpty
              ? 'Please enter your password' : '',
          name: msg.name
            ? msg.name : isNameEmpty
              ? 'Please enter your name' : '',
        }
      }
    },
    getSumbitSignUpError: (state, action) => {
      const result = action.payload.result;
      switch (result) {
        case 'OK': {
          return {
            ...state,
            isCheckedID: true,
          };
        }
        case 'SERVER ERROR': {
          return {
            ...state,
            isError: true,
            isCheckedID: true,
            msg: {
              ...state.msg,
              current: 'Server error',
            },
          }
        }
        default: {
          return {
            ...state,
            isError: true,
            isCheckedID: true,
            msg: {
              ...state.msg,
              current: 'Something is wrong'
            }
          }
        }
      }
    }
  },
})

export const { resetSignUpError, getTypingSignUpError, isCheckID, getSubmitSignUpEmptyError, getSumbitSignUpError } = signUpSlice.actions;
export default signUpSlice.reducer;