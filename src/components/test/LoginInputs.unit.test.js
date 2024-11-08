import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import LoginInputs from '../LoginInputs'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/makeStore'
import { switchForm } from '@/lib/features/switchState/formSlice'
import userEvent from '@testing-library/user-event'
import { getSubmitLoginEmptyError, getSumbitLoginError } from '@/lib/features/errorState/loginSlice'
import { getSubmitSignUpEmptyError, getSumbitSignUpError, isCheckID } from '@/lib/features/errorState/signUpSlice'

jest.mock('../ForgetLinkButton', () => () => <span>Forget Password</span>)

describe('LoginInputs Component test : ', () => {
  const store = makeStore();
  beforeEach(() => {
    render(
      <Provider store={store}>
        <LoginInputs />
      </Provider>
    )
  })
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('Form type - login', () => {
    it('styles', () => {
      const loginIDTag = document.getElementById('loginID');
      const loginPasswordTag = document.getElementById('loginPassword');
      expect(loginIDTag).toBeInTheDocument();
      expect(loginPasswordTag).toBeInTheDocument();
    })

    describe('functions', () => {
      describe('typing', () => {
        it('Error msg, ID: "가"', async () => {
          const loginIDTag = document.getElementById('loginID');

          await userEvent.click(loginIDTag);
          await userEvent.keyboard('가');

          const errorTag = screen.getByText('영문, 숫자, 특수문자로 입력해주세요.');
          expect(errorTag).toBeInTheDocument();
        })
        it('Error msg, Password: "가"', async () => {
          const loginPasswordTag = document.getElementById('loginPassword');

          await userEvent.click(loginPasswordTag);
          await userEvent.keyboard('가');

          const errorTag = screen.getByText('영문, 숫자, 특수문자로 입력해주세요.');
          expect(errorTag).toBeInTheDocument();
        })
        it('Error msg, ID: " "', async () => {
          const loginIDTag = document.getElementById('loginID');

          await userEvent.click(loginIDTag);
          await userEvent.keyboard(' ');

          const errorTag = screen.getByText('공백은 없어야 합니다.');
          expect(errorTag).toBeInTheDocument();
        })
        it('Error msg, Password: " "', async () => {
          const loginPasswordTag = document.getElementById('loginPassword');

          await userEvent.click(loginPasswordTag);
          await userEvent.keyboard(' ');

          const errorTag = screen.getByText('공백은 없어야 합니다.');
          expect(errorTag).toBeInTheDocument();
        })
      })
      describe('submit empty field', () => {
        it('Error msg, id/password: ""', async () => {
          await act(() => store.dispatch(getSubmitLoginEmptyError({ id: '', password: '' })))

          const errorTag = screen.getByText('아이디와 비밀번호를 입력해주세요.');
          expect(errorTag).toBeInTheDocument();
        })
        it('Error msg, id: ""', async () => {
          await act(() => store.dispatch(getSubmitLoginEmptyError({ id: '', password: 'qwe' })))

          const errorTag = screen.getByText('아이디를 입력해주세요.');
          expect(errorTag).toBeInTheDocument();
        })
        it('Error msg, password: ""', async () => {
          await act(() => store.dispatch(getSubmitLoginEmptyError({ id: 'qwe', password: '' })))

          const errorTag = screen.getByText('비밀번호를 입력해주세요.');
          expect(errorTag).toBeInTheDocument();
        })
      })
      describe('submit login error', () => {
        beforeEach(async () => {
          // form 입력
          const loginIDTag = document.getElementById('loginID');
          const loginPasswordTag = document.getElementById('loginPassword');

          await userEvent.click(loginIDTag);
          await userEvent.keyboard('qwe');
          await userEvent.click(loginPasswordTag);
          await userEvent.keyboard('qwe');
        })

        it('result: "OK"', async () => {
          await act(() => store.dispatch(getSumbitLoginError({ result: 'OK' })))

          const errorTag = document.querySelector('.msgBox');
          expect(errorTag).not.toBeInTheDocument();
        })
        it('result: "SERVER ERROR"', async () => {
          await act(() => store.dispatch(getSumbitLoginError({ result: 'SERVER ERROR' })))

          const errorTag = screen.getByText('서버에 문제가 생겼습니다.');
          expect(errorTag).toBeInTheDocument();
        })
        it('result: "ID ERROR"', async () => {
          await act(() => store.dispatch(getSumbitLoginError({ result: 'ID ERROR' })))

          const errorTag = screen.getByText('아이디가 존재하지 않습니다.');
          expect(errorTag).toBeInTheDocument();
        })
        it('result: "PASSWORD ERROR"', async () => {
          await act(() => store.dispatch(getSumbitLoginError({ result: 'PASSWORD ERROR' })))

          const errorTag = screen.getByText('비밀번호가 일치하지 않습니다.');
          expect(errorTag).toBeInTheDocument();
        })
      })
    })
  })

  describe('Form type - signUp', () => {
    beforeEach(async () => {
      await act(() => store.dispatch(switchForm({ type: 'signUp' })));
    })

    it('styles', async () => {
      const signUpNameTag = document.getElementById('signUpName');
      const signUpIDTag = document.getElementById('signUpID');
      const signUpPasswordTag = document.getElementById('signUpPassword');
      expect(signUpNameTag).toBeInTheDocument()
      expect(signUpIDTag).toBeInTheDocument()
      expect(signUpPasswordTag).toBeInTheDocument()
    })

    describe('functions', () => {
      describe('typing', () => {
        it('Error msg, name: "ㄱㅏ"', async () => {
          const signUpNameTag = document.getElementById('signUpName');

          await userEvent.click(signUpNameTag);
          await userEvent.keyboard('ㄱㅏ');

          const errorTag = screen.getByText('자음 또는 모음으로 설정할 수 없습니다.');
          expect(errorTag).toBeInTheDocument();
        })
        it('Error msg, name/id/password: "가"', async () => {
          const signUpNameTag = document.getElementById('signUpName');
          const signUpIDTag = document.getElementById('signUpID');
          const signUpPasswordTag = document.getElementById('signUpPassword');

          await userEvent.click(signUpNameTag);
          await userEvent.keyboard('가');

          await userEvent.click(signUpIDTag);
          await userEvent.keyboard('가');

          await userEvent.click(signUpPasswordTag);
          await userEvent.keyboard('가');

          const nameErrorTag = screen.getByText('2글자 이상이어야 합니다.');
          const idPwdErrorTags = screen.getAllByText('영문, 숫자, 특수문자로 입력해주세요.');
          expect(nameErrorTag).toBeInTheDocument();
          expect(idPwdErrorTags).toHaveLength(2);
        })

        it('Error msg, name/id/password: " "', async () => {
          const signUpNameTag = document.getElementById('signUpName');
          const signUpIDTag = document.getElementById('signUpID');
          const signUpPasswordTag = document.getElementById('signUpPassword');

          await userEvent.click(signUpNameTag);
          await userEvent.keyboard(' ');

          await userEvent.click(signUpIDTag);
          await userEvent.keyboard(' ');

          await userEvent.click(signUpPasswordTag);
          await userEvent.keyboard(' ');

          const errorTags = screen.getAllByText('공백은 없어야 합니다.');
          expect(errorTags).toHaveLength(3);
        })

        it('Error msg, name/id/password: minLength', async () => {
          const signUpNameTag = document.getElementById('signUpName');
          const signUpIDTag = document.getElementById('signUpID');
          const signUpPasswordTag = document.getElementById('signUpPassword');

          await userEvent.click(signUpNameTag);
          await userEvent.keyboard('q');

          await userEvent.click(signUpIDTag);
          await userEvent.keyboard('q');

          await userEvent.click(signUpPasswordTag);
          await userEvent.keyboard('q');

          const nameErrorTag = screen.getByText('2글자 이상이어야 합니다.');
          const idErrorTag = screen.getByText('6글자 이상이어야 합니다.');
          const passwordErrorTag = screen.getByText('8글자 이상이어야 합니다.');
          expect(nameErrorTag).toBeInTheDocument();
          expect(idErrorTag).toBeInTheDocument();
          expect(passwordErrorTag).toBeInTheDocument();
        })

        it('Error msg, name/id/password: maxLength', async () => {
          const signUpNameTag = document.getElementById('signUpName');
          const signUpIDTag = document.getElementById('signUpID');
          const signUpPasswordTag = document.getElementById('signUpPassword');

          await userEvent.click(signUpNameTag);
          await userEvent.keyboard('qwerqwerqwer');

          await userEvent.click(signUpIDTag);
          await userEvent.keyboard('qwerqwerqwerqwerqwerqwer');

          await userEvent.click(signUpPasswordTag);
          await userEvent.keyboard('qwerqwerqwerqwerqwerqwerqwerqwerqwer');

          const nameErrorTag = screen.getByText('최대 8글자 입니다.');
          const idErrorTag = screen.getByText('최대 12글자 입니다.');
          const passwordErrorTag = screen.getByText('최대 16글자 입니다.');
          expect(nameErrorTag).toBeInTheDocument();
          expect(idErrorTag).toBeInTheDocument();
          expect(passwordErrorTag).toBeInTheDocument();
        })
      })
      describe('check ID', () => {
        it('result: "OK"', async () => {
          await act(() => store.dispatch(isCheckID({ result: 'OK' })));

          const msgTag = screen.getByText('사용 가능한 아이디입니다.')
          expect(msgTag).toBeInTheDocument();
        })
        it('result: "SERVER ERROR"', async () => {
          await act(() => store.dispatch(isCheckID({ result: 'SERVER ERROR' })));

          const msgTag = screen.getByText('서버 오류')
          expect(msgTag).toBeInTheDocument();
        })
        it('result: "default"', async () => {
          await act(() => store.dispatch(isCheckID({ result: 'default' })));

          const msgTag = screen.getByText('중복된 아이디입니다.')
          expect(msgTag).toBeInTheDocument();
        })
      })
      describe('submit empty field', () => {
        it('Error msg, name/id/password: ""', async () => {
          await act(() => store.dispatch(getSubmitSignUpEmptyError({ id: '', password: '', name: '' })));

          const nameErrorTag = screen.getByText('이름을 입력하세요');
          const idErrorTag = screen.getByText('아이디를 입력하세요');
          const passwordErrorTag = screen.getByText('비밀번호를 입력하세요');
          expect(nameErrorTag).toBeInTheDocument();
          expect(idErrorTag).toBeInTheDocument();
          expect(passwordErrorTag).toBeInTheDocument();
        })
        it('Pass msg, "사용 가능한 아이디입니다."', async () => {
          const signUpNameTag = document.getElementById('signUpName');
          const signUpIDTag = document.getElementById('signUpID');
          const signUpPasswordTag = document.getElementById('signUpPassword');

          await userEvent.click(signUpNameTag);
          await userEvent.keyboard('qwe');
          await userEvent.click(signUpIDTag);
          await userEvent.keyboard('qweqweqwe');
          await userEvent.click(signUpPasswordTag);
          await userEvent.keyboard('qweqweqwe');

          await act(() => store.dispatch(isCheckID({ result: 'OK' })));
          await act(() => store.dispatch(getSubmitSignUpEmptyError({ id: 'qweqweqwe', password: 'qweqweqwe', name: 'qwe' })));

          const msgBoxTag = document.querySelector('.msgBox');
          expect(msgBoxTag).not.toHaveClass('error');
        })
      })
    })
  })
})
