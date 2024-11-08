import reducer, { switchForm } from "../formSlice";

describe('FormSlice reducer test : ', () => {
  describe('SwitchForm Action', () => {
    const testArr = [
      { testName: 'Type - login', action: { type: 'login' } },
      { testName: 'Type - signUp', action: { type: 'signUp' } },
    ]
    for (let i = 0; i < testArr.length; i++) {
      const { testName, action } = testArr[i];
      it(testName, () => {
        const outputInit = reducer(undefined, switchForm(action))
        expect(outputInit.type).toBe(action.type);
      })
    }
  })
})