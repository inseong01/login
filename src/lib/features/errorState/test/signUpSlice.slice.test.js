import reducer, {
  resetSignUpError,
  getTypingSignUpError,
  isCheckID,
  getSubmitSignUpEmptyError,
  getSumbitSignUpError
} from '@/lib/features/errorState/signUpSlice'

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

describe('SignUpSlice reducer test : ', () => {
  it('SignUpError initState', () => {
    const outputInit = reducer(undefined, '');
    expect(outputInit).toMatchObject(initialState);
  })

  it('ResetSignUpError Action', () => {
    const inputInit = {
      id: true,
      password: true,
      name: true,
      isError: true,
      isCheckedID: true,
      msg: {
        id: 'error',
        password: 'error',
        name: 'error',
        current: 'error'
      }
    }
    const outputInit = reducer(inputInit, resetSignUpError());
    expect(outputInit).toMatchObject(initialState);
  })

  describe('GetTypingSignUpError Action', () => {
    const testArr = [
      // id
      {
        testName: 'id',
        action: {
          name: 'id',
          value: '가나'
        },
        expectedInit: {
          id: true,
          password: false,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '영문, 숫자, 특수문자로 입력해주세요.',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'id',
        action: {
          name: 'id',
          value: 'a '
        },
        expectedInit: {
          id: true,
          password: false,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '공백은 없어야 합니다.',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'id',
        action: {
          name: 'id',
          value: 'abc'
        },
        expectedInit: {
          id: true,
          password: false,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '6글자 이상이어야 합니다.',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'id',
        action: {
          name: 'id',
          value: 'abcdefghijklmn'
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: false,
          msg: {
            id: '최대 12글자 입니다.',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      // password
      {
        testName: 'password',
        action: {
          name: 'password',
          value: '가나'
        },
        expectedInit: {
          id: false,
          password: true,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '',
            password: '영문, 숫자, 특수문자로 입력해주세요.',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'password',
        action: {
          name: 'password',
          value: 'a '
        },
        expectedInit: {
          id: false,
          password: true,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '',
            password: '공백은 없어야 합니다.',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'password',
        action: {
          name: 'password',
          value: 'abc'
        },
        expectedInit: {
          id: false,
          password: true,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '',
            password: '8글자 이상이어야 합니다.',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'password',
        action: {
          name: 'password',
          value: 'abcdefghijklmnopqrstu'
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: false,
          msg: {
            id: '',
            password: '최대 16글자 입니다.',
            name: '',
            current: ''
          }
        }
      },
      // name
      {
        testName: 'name',
        action: {
          name: 'name',
          value: 'ㅏㅁ'
        },
        expectedInit: {
          id: false,
          password: false,
          name: true,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '',
            password: '',
            name: '자음 또는 모음으로 설정할 수 없습니다.',
            current: ''
          }
        }
      },
      {
        testName: 'name',
        action: {
          name: 'name',
          value: 'a '
        },
        expectedInit: {
          id: false,
          password: false,
          name: true,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '',
            password: '',
            name: '공백은 없어야 합니다.',
            current: ''
          }
        }
      },
      {
        testName: 'name',
        action: {
          name: 'name',
          value: 'a'
        },
        expectedInit: {
          id: false,
          password: false,
          name: true,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '',
            password: '',
            name: '2글자 이상이어야 합니다.',
            current: ''
          }
        }
      },
      {
        testName: 'name',
        action: {
          name: 'name',
          value: 'abcdefghijklmn'
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: false,
          msg: {
            id: '',
            password: '',
            name: '최대 8글자 입니다.',
            current: ''
          }
        }
      },

    ]

    for (let i = 0; i < testArr.length; i++) {
      const { testName, action, expectedInit } = testArr[i];
      describe(`${testName} : `, () => {
        it(`Error, ${action.value} - ${expectedInit.msg[testName]}`, () => {
          const outputInit = reducer(undefined, getTypingSignUpError(action));
          expect(outputInit).toMatchObject(expectedInit);
        })
      })
    }
  })

  describe('IsCheckID Action', () => {
    const testArr = [
      {
        testName: 'OK',
        action: {
          result: 'OK',
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: true,
          msg: {
            id: '사용 가능한 아이디입니다.',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'SERVER ERROR',
        action: {
          result: 'SERVER ERROR',
        },
        expectedInit: {
          id: true,
          password: false,
          name: false,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '서버 오류',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'default',
        action: {
          result: 'default',
        },
        expectedInit: {
          id: true,
          password: false,
          name: false,
          isError: true,
          isCheckedID: true,
          msg: {
            id: '중복된 아이디입니다.',
            password: '',
            name: '',
            current: ''
          }
        }
      },
    ]
    for (let i = 0; i < testArr.length; i++) {
      const { testName, action, expectedInit } = testArr[i];
      it(`${testName}`, () => {
        const outputInit = reducer(undefined, isCheckID(action));
        expect(outputInit).toMatchObject(expectedInit);
      })
    }
  })

  describe('getSubmitSignUpEmptyError Action', () => {
    const testArr = [
      {
        testName: 'All Empty',
        action: {
          id: '',
          password: '',
          name: '',
        },
        expectedInit: {
          id: true,
          password: true,
          name: true,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '아이디를 입력하세요',
            password: '비밀번호를 입력하세요',
            name: '이름을 입력하세요',
            current: ''
          }
        }
      },
      {
        testName: 'ID is not checked',
        action: {
          id: 'qwe',
          password: '',
          name: '',
        },
        expectedInit: {
          id: true,
          password: true,
          name: true,
          isError: true,
          isCheckedID: false,
          msg: {
            id: '아이디 중복을 확인해주세요',
            password: '비밀번호를 입력하세요',
            name: '이름을 입력하세요',
            current: ''
          }
        }
      },
      {
        testName: 'Pass',
        action: {
          id: 'qwe',
          password: 'qwe',
          name: 'qwe',
        },
        inputInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: true,
          msg: {
            id: '',
            password: '',
            name: '',
            current: ''
          }
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: true,
          msg: {
            id: '',
            password: '',
            name: '',
            current: ''
          }
        }
      },
    ]
    for (let i = 0; i < testArr.length; i++) {
      const { testName, action, expectedInit, inputInit } = testArr[i];
      it(`${testName}`, () => {
        const outputInit = reducer(inputInit, getSubmitSignUpEmptyError(action));
        expect(outputInit).toMatchObject(expectedInit);
      })
    }
  })

  describe('getSumbitSignUpError Action', () => {
    const testArr = [
      {
        testName: 'OK',
        action: {
          result: 'OK'
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: false,
          isCheckedID: true,
          msg: {
            id: '',
            password: '',
            name: '',
            current: ''
          }
        }
      },
      {
        testName: 'SERVER ERROR',
        action: {
          result: 'SERVER ERROR'
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: true,
          isCheckedID: true,
          msg: {
            id: '',
            password: '',
            name: '',
            current: '서버에 문제가 생겼습니다.'
          }
        }
      },
      {
        testName: 'default',
        action: {
          result: 'default',
        },
        expectedInit: {
          id: false,
          password: false,
          name: false,
          isError: true,
          isCheckedID: true,
          msg: {
            id: '',
            password: '',
            name: '',
            current: '뭔가 잘못 됐습니다.'
          }
        },
      },
    ]
    for (let i = 0; i < testArr.length; i++) {
      const { testName, action, expectedInit, inputInit } = testArr[i];
      it(`${testName}`, () => {
        const outputInit = reducer(inputInit, getSumbitSignUpError(action));
        expect(outputInit).toMatchObject(expectedInit);
      })
    }
  })
})