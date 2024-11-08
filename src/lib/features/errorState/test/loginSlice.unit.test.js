import reducer, {
  resetLoginError,
  getTypingLoginError,
  getSubmitLoginEmptyError,
  getSumbitLoginError
} from '@/lib/features/errorState/loginSlice'

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

describe('LoginSlice reducer test : ', () => {
  it('LoginError initState', () => {
    const outputInit = reducer(undefined, '');
    expect(outputInit).toMatchObject(initialState)
  })

  it('ResetLoginError Action', () => {
    const outputInit = reducer(undefined, resetLoginError);
    expect(outputInit).toMatchObject(initialState);
  })

  describe('GetTypingLoginError Action', () => {
    describe(`id : `, () => {
      const testArr = [
        // id
        {
          testName: 'Pass',
          action: {
            name: 'id',
            value: 'abc'
          },
          expectedInit: {
            id: false,
            password: false,
            isError: false,
            msg: {
              id: '',
              password: '',
              current: '',
            },
          }
        },
        {
          testName: 'Pass, pwd error reset',
          action: {
            name: 'id',
            value: 'abc'
          },
          expectedInit: {
            id: false,
            password: false,
            isError: false,
            msg: {
              id: '',
              password: '',
              current: '',
            },
          },
          inputInit: {
            id: false,
            password: true,
            isError: true,
            msg: {
              id: '',
              password: '비밀번호가 일치하지 않습니다.',
              current: '비밀번호가 일치하지 않습니다.',
            },
          }
        },
        {
          testName: 'Error, 영문, 숫자, 특수문자로 입력해주세요.',
          action: {
            name: 'id',
            value: '가'
          },
          expectedInit: {
            id: true,
            password: false,
            isError: true,
            msg: {
              id: '영문, 숫자, 특수문자로 입력해주세요.',
              password: '',
              current: '영문, 숫자, 특수문자로 입력해주세요.',
            },
          },
        },
        {
          testName: 'Error, 공백은 없어야 합니다.',
          action: {
            name: 'id',
            value: 'a '
          },
          expectedInit: {
            id: true,
            password: false,
            isError: true,
            msg: {
              id: '공백은 없어야 합니다.',
              password: '',
              current: '공백은 없어야 합니다.',
            },
          },
        },
      ]

      for (let i = 0; i < testArr.length; i++) {
        const { testName, action, expectedInit, inputInit } = testArr[i];
        it(`${testName}`, () => {
          const outputInit = reducer(inputInit, getTypingLoginError(action));
          expect(outputInit).toMatchObject(expectedInit);
        })
      }
    })

    describe('password : ', () => {
      const testArr = [
        // password
        {
          testName: 'Pass',
          action: {
            name: 'password',
            value: 'abc'
          },
          expectedInit: {
            id: false,
            password: false,
            isError: false,
            msg: {
              id: '',
              password: '',
              current: '',
            },
          },
        },
        {
          testName: 'Error, 영문, 숫자, 특수문자로 입력해주세요.',
          action: {
            name: 'password',
            value: '가'
          },
          expectedInit: {
            id: false,
            password: true,
            isError: true,
            msg: {
              id: '',
              password: '영문, 숫자, 특수문자로 입력해주세요.',
              current: '영문, 숫자, 특수문자로 입력해주세요.',
            },
          }
        },
        {
          testName: 'Error, 공백은 없어야 합니다.',
          action: {
            name: 'password',
            value: 'a '
          },
          expectedInit: {
            id: false,
            password: true,
            isError: true,
            msg: {
              id: '',
              password: '공백은 없어야 합니다.',
              current: '공백은 없어야 합니다.',
            },
          },
        },
      ]

      for (let i = 0; i < testArr.length; i++) {
        const { testName, action, expectedInit } = testArr[i];
        it(`${testName}`, () => {
          const outputInit = reducer(undefined, getTypingLoginError(action));
          expect(outputInit).toMatchObject(expectedInit);
        })
      }
    })
  })

  describe('getSubmitLoginEmptyError Action', () => {
    const testArr = [
      {
        testName: 'Error, 아이디와 비밀번호를 입력해주세요',
        action: {
          id: '',
          password: ''
        },
        expectedInit: {
          id: true,
          password: true,
          isError: true,
          msg: {
            id: '아이디를 입력해주세요.',
            password: '비밀번호를 입력해주세요.',
            current: '아이디와 비밀번호를 입력해주세요.',
          },
        },
      },
      {
        testName: 'Error, 아이디를 입력해주세요.',
        action: {
          id: '',
          password: 'qweqwe'
        },
        expectedInit: {
          id: true,
          password: false,
          isError: true,
          msg: {
            id: '아이디를 입력해주세요.',
            password: '',
            current: '아이디를 입력해주세요.',
          },
        }
      },
      {
        testName: 'Error, 비밀번호를 입력해주세요.',
        action: {
          id: 'qweqwe',
          password: ''
        },
        expectedInit: {
          id: false,
          password: true,
          isError: true,
          msg: {
            id: '',
            password: '비밀번호를 입력해주세요.',
            current: '비밀번호를 입력해주세요.',
          },
        },
      },
    ]

    for (let i = 0; i < testArr.length; i++) {
      const { testName, expectedInit, action } = testArr[i];
      it(`${testName}`, () => {
        const outputInit = reducer(undefined, getSubmitLoginEmptyError(action));
        expect(outputInit).toMatchObject(expectedInit);
      })
    }
  })

  describe('getSumbitLoginError Action', () => {
    const testArr = [
      {
        testName: 'Pass',
        action: {
          result: 'OK',
        },
        expectedInit: initialState
      },
      {
        testName: 'Error, 서버에 문제가 생겼습니다.',
        action: {
          result: 'SERVER ERROR',
        },
        expectedInit: {
          id: false,
          password: false,
          isError: true,
          msg: {
            id: '',
            password: '',
            current: '서버에 문제가 생겼습니다.',
          },
        }
      },
      {
        testName: 'Error, 아이디가 존재하지 않습니다.',
        action: {
          result: 'ID ERROR',
        },
        expectedInit: {
          id: true,
          password: false,
          isError: true,
          msg: {
            id: '아이디가 존재하지 않습니다.',
            password: '',
            current: '아이디가 존재하지 않습니다.',
          },
        },
      },
      {
        testName: 'Error, 비밀번호가 일치하지 않습니다.',
        action: {
          result: 'PASSWORD ERROR',
        },
        expectedInit: {
          id: false,
          password: true,
          isError: true,
          msg: {
            id: '',
            password: '비밀번호가 일치하지 않습니다.',
            current: '비밀번호가 일치하지 않습니다.',
          },
        },
      },
    ]

    for (let i = 0; i < testArr.length; i++) {
      const { testName, expectedInit, action } = testArr[i];
      it(`${testName}`, () => {
        const outputInit = reducer(undefined, getSumbitLoginError(action));
        expect(outputInit).toMatchObject(expectedInit);
      })
    }
  })

  describe('Error inherit', () => {
    describe('getTypingLoginError : ', () => {
      test('error is translated id to password', () => {
        const action = {
          name: 'id',
          value: 'abc'
        }
        const inputInit = {
          id: true,
          password: true,
          isError: true,
          msg: {
            id: '영문, 숫자, 특수문자로 입력해주세요.',
            password: '공백은 없어야 합니다.',
            current: '공백은 없어야 합니다.',
          },
        }
        const expectedInit = {
          id: false,
          password: true,
          isError: true,
          msg: {
            id: '',
            password: '공백은 없어야 합니다.',
            current: '공백은 없어야 합니다.',
          },
        }
        const outputInit = reducer(inputInit, getTypingLoginError(action));
        expect(outputInit).toMatchObject(expectedInit);
      })
    })
  })
})