import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react';
import LoginTitle from '../LoginTitle';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/makeStore';
import { switchForm } from '@/lib/features/switchState/formSlice';

describe('LoginTitle Component test : ', () => {
  const store = makeStore();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <LoginTitle />
      </Provider>
    )
  })

  test('"login" title', async () => {
    const tag = document.querySelector('span');
    expect(tag).toBeInTheDocument();
    expect(tag.textContent).toBe('Login Your Account');
  })

  test('"signUp" title', async () => {
    await act(() => store.dispatch(switchForm({ type: 'signUp' })))
    const tag = document.querySelector('span');
    expect(tag).toBeInTheDocument();
    expect(tag.textContent).toBe('Create Your Account');
  })
})