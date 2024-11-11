'use client';

import { useSelector } from 'react-redux';

function LoginTitle() {
  const formState = useSelector((state) => state.formState);

  switch (formState.type) {
    case 'login': {
      return <h1>Login Your Account</h1>;
    }
    case 'signUp': {
      return <h1>Create Your Account</h1>;
    }
  }
}

export default LoginTitle;
