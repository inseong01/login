import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import SubmitButton from '../SubmitButton';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

describe('SubmitButton Component test : ', () => {
  const mockStore = configureMockStore();
  let store;

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('styles', () => {
    store = mockStore({
      formState: { type: 'login' },
      loginError: { isError: false },
      signUpError: { isError: false, isCheckedID: true },
      submitState: { isSubmit: false, submitStatus: '' },
    })
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SubmitButton />
      </Provider>
    )

    const submitInput = document.querySelector('input');
    expect(submitInput).toBeInTheDocument();
    expect(submitInput.value).toBe('SUBMIT');
    expect(submitInput).toHaveClass('btn');
  })

  it('input onClick: "login"', async () => {
    // store mock
    store = mockStore({
      formState: { type: 'login' },
      loginError: { isError: false },
      signUpError: { isError: false, isCheckedID: true },
      submitState: { isSubmit: false, submitStatus: '' },
    })
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SubmitButton />
      </Provider>
    )

    // form mock
    const tagHTML = `
      <div>
        <div>
          <input type='text' id='loginID' value='qwe' />
        </div>
        <div>
          <input type='password' id='loginPassword' value='qwe' />
        </div>
      </div>
    `
    document.body.insertAdjacentHTML('beforebegin', tagHTML);

    // expect
    const submitInput = screen.getByDisplayValue('SUBMIT')
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    fireEvent.click(submitInput);
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })

  it('input onClick: "signUp"', async () => {
    // store mock
    store = mockStore({
      formState: { type: 'signUp' },
      loginError: { isError: false },
      signUpError: { isError: false, isCheckedID: true },
      submitState: { isSubmit: false, submitStatus: 'PROCESS' },
    })
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SubmitButton />
      </Provider>
    )

    // form mock
    const tagHTML = `
      <div>
        <div>
          <input type='text' id='signUpID' value='qwe' />
        </div>
        <div>
          <input type='password' id='signUpPassword' value='qwe' />
        </div>
        <div>
          <input type='password' id='signUpName' value='qwe' />
        </div>
      </div>
    `
    document.body.insertAdjacentHTML('beforebegin', tagHTML);

    // expect
    const submitInput = screen.getByDisplayValue('SUBMIT')
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    fireEvent.click(submitInput);
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})