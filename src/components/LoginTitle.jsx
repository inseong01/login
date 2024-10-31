'use client';

import { LoginContext } from '@/app/LoginContextProvider';
import { useContext } from 'react';

function LoginTitle() {
  const { state } = useContext(LoginContext);

  switch (state.type) {
    case 'login': {
      return <span>Login Your Account</span>;
    }
    case 'signUp': {
      return <span>Create Your Account</span>;
    }
  }
}

export default LoginTitle;
