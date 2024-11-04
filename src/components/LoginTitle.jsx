'use client';

import { useSelector } from 'react-redux';

function LoginTitle() {
  const formState = useSelector((state) => state.formState);

  switch (formState.type) {
    case 'login': {
      return <span>Login Your Account</span>;
    }
    case 'signUp': {
      return <span>Create Your Account</span>;
    }
  }
}

export default LoginTitle;
