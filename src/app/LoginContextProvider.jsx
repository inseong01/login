'use client';

import { createContext, useReducer } from 'react';

export const LoginContext = createContext({});

const init = {
  type: 'login',
  isSubmit: false,
  isFirstLogin: true,
  data: {},
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SWITCH': {
      const type = state.type === 'login' ? 'signUp' : 'login';
      return {
        ...state,
        type,
        data: {},
      };
    }
    case 'CLICK_SUBMIT': {
      return {
        ...state,
        isSubmit: true,
      };
    }
    case 'SUBMIT_DATA': {
      return {
        ...state,
        isSubmit: false,
        data: action.data,
      };
    }
  }
}

function LoginContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);

  return <LoginContext.Provider value={{ state, dispatch }}>{children}</LoginContext.Provider>;
}

export default LoginContextProvider;
