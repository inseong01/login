import getErrorMessage from "../getErrorMessage";

const err = {
  id: false,
  password: false,
  name: false,
  msg: { id: '', password: '', name: '', current: '' },
};


describe('GetErrorMessage function test : ', () => {
  let setErrorMock;
  beforeEach(() => {
    setErrorMock = jest.fn();
  })
  afterEach(() => {
    setErrorMock.mockClear();
  })

  describe('Login', () => {
    let res;

    describe('- No Error', () => {
      const state = {
        type: 'login',
        isFirstLogin: true,
      }
      const events = [
        { e: { target: { value: 'a', name: 'id' } } },
        { e: { target: { value: 'a', name: 'password' } } },
        { e: { target: { value: 'aaaaaaaaaaaaaaaaaa', name: 'id' } } },
        { e: { target: { value: 'aaaaaaaaaaaaaaaaaa', name: 'password' } } },
        { e: { target: { value: '가나다', name: 'id' } } },
        { e: { target: { value: '가나다', name: 'password' } } },
        { e: { target: { value: 'ab c', name: 'id' } } },
        { e: { target: { value: 'ab c', name: 'password' } } },
      ]

      for (let i = 0; i < events.length; i++) {
        const { e } = events[i];
        const targetName = e.target.name;
        const targetValue = e.target.value;
        const targetLength = e.target.value.length;

        test(`${targetName}: '${targetValue}'(${targetLength})`, () => {
          getErrorMessage(e, state, err, setErrorMock);
          res = setErrorMock.mock.calls[0];
          expect(res).toBeUndefined()
        })
      }
    })

    // login 에러 메시지 변경, 'ID 또는 Password가 일치하지 않습니다.'
  })

  describe('SignUp', () => {
    const state = {
      type: 'SignUp',
      isFirstLogin: true,
    }
    let res;

    describe('- length', () => {
      const lessLengthEvents = [
        { e: { target: { value: 'a', name: 'id' } } },
        { e: { target: { value: 'a', name: 'password' } } },
        { e: { target: { value: 'a', name: 'name' } } }
      ]
      const moreLengthEvents = [
        { e: { target: { value: 'aaaaaaaaaaaaaaaaaaaa', name: 'id' } } },
        { e: { target: { value: 'aaaaaaaaaaaaaaaaaaaa', name: 'password' } } },
        { e: { target: { value: 'aaaaaaaaaaaaaaaaaaaa', name: 'name' } } }
      ]
      const correctEvents = [
        { e: { target: { value: 'aaaaaaaa', name: 'id' } } },
        { e: { target: { value: 'aaaaaaaaaaaa', name: 'password' } } },
        { e: { target: { value: 'aaaa', name: 'name' } } }
      ]
      const length = {
        'id': { min: 6, max: 12 },
        'password': { min: 8, max: 16 },
        'name': { min: 2, max: 8 }
      }

      for (let i = 0; i < lessLengthEvents.length; i++) {
        const { e } = lessLengthEvents[i];
        const valueLength = e.target.value.length;
        const targetName = e.target.name;
        const minLength = length[targetName].min;

        test(`Error, ${targetName}(${valueLength}) is more than ${minLength}`, () => {
          getErrorMessage(e, state, err, setErrorMock);
          res = setErrorMock.mock.lastCall[0]((prev => prev));
          expect(res).toMatchObject({
            [targetName]: true,
            msg: {
              [targetName]: `${minLength}글자 이상이어야 합니다.`,
              current: targetName === 'name' ? '' : `${minLength}글자 이상이어야 합니다.`
            }
          })

        })
      }

      for (let i = 0; i < moreLengthEvents.length; i++) {
        const { e } = moreLengthEvents[i];
        const valueLength = e.target.value.length;
        const targetName = e.target.name;
        const maxLength = length[targetName].max;

        test(`Error, ${targetName}(${valueLength}) is less than ${maxLength}`, () => {
          getErrorMessage(e, state, err, setErrorMock);
          res = setErrorMock.mock.lastCall[0]((prev => prev));
          expect(res).toMatchObject({
            [targetName]: true,
            msg: {
              [targetName]: `${maxLength}글자 이하이어야 합니다.`,
              current: targetName === 'name' ? '' : `${maxLength}글자 이하이어야 합니다.`
            }
          })
        })
      }

      for (let i = 0; i < correctEvents.length; i++) {
        const { e } = correctEvents[i];
        const valueLength = e.target.value.length;
        const targetName = e.target.name;
        const maxLength = length[targetName].max;

        test(`Correct, ${targetName}(${valueLength}) is okay(${maxLength})`, () => {
          getErrorMessage(e, state, err, setErrorMock);
          res = setErrorMock.mock.lastCall[0]((prev => prev));
          expect(res).toMatchObject({
            [targetName]: false,
            msg: {
              [targetName]: '',
              current: ''
            }
          })
        })
      }
    })
    describe('- space', () => {
      const valueHaveSpaceEvents = [
        { e: { target: { value: 'a ', name: 'id' } } },
        { e: { target: { value: 'a ', name: 'password' } } },
        { e: { target: { value: 'a ', name: 'name' } } }
      ]

      for (let i = 0; i < valueHaveSpaceEvents.length; i++) {
        const { e } = valueHaveSpaceEvents[i];
        const value = e.target.value;
        const targetName = e.target.name;

        test(`Error, ${targetName} '${value}' has space`, () => {
          getErrorMessage(e, state, err, setErrorMock);
          res = setErrorMock.mock.lastCall[0]((prev => prev));
          expect(res).toMatchObject({
            [targetName]: true,
            msg: {
              [targetName]: '공백은 없어야 합니다.',
              current: targetName === 'name' ? '' : '공백은 없어야 합니다.'
            }
          })

        })
      }
    })
    describe('- word', () => {
      const invalidWordEvents = [
        { e: { target: { value: '가나', name: 'id' } } },
        { e: { target: { value: '가나', name: 'password' } } },
        { e: { target: { value: '가나', name: 'name' } } }
      ]

      for (let i = 0; i < invalidWordEvents.length; i++) {
        const { e } = invalidWordEvents[i];
        const value = e.target.value;
        const targetName = e.target.name;
        let errorTitle = targetName === 'name' ? 'Correct' : 'Error';
        let validTitle = targetName === 'name' ? 'valid' : 'invalid';

        test(`${errorTitle}, ${targetName} '${value}' is ${validTitle}`, () => {
          getErrorMessage(e, state, err, setErrorMock);
          res = setErrorMock.mock.lastCall[0]((prev => prev));
          expect(res).toMatchObject({
            [targetName]: targetName === 'name' ? false : true,
            msg: {
              [targetName]: '영문, 숫자, 특수문자로 입력해주세요.',
              current: targetName === 'name' ? '' : '영문, 숫자, 특수문자로 입력해주세요.'
            }
          })
        })
      }
    })
  })
})