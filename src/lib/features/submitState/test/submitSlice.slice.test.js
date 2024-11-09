import reducer, { asyncSubmitFetch, resetSubmitState } from "../submitSlice";

const initialState = {
  isSubmit: false,
  submitStatus: '',
  fetchResult: '',
};

describe('SubmitState reducer test : ', () => {
  it('ResetSubmitState Action', () => {
    const outputInit = reducer(undefined, resetSubmitState());
    expect(outputInit).toMatchObject(initialState);
  })

  describe('ExtraReducers Action', () => {
    const testArr = [
      {
        testName: 'pending',
        action: { type: asyncSubmitFetch.pending.type },
        expectedInit: {
          isSubmit: true,
          submitStatus: 'PROCESS',
          fetchResult: '',
        }
      },
      {
        testName: 'fulfilled',
        action: { type: asyncSubmitFetch.fulfilled.type, payload: { result: 'OK' } },
        expectedInit: {
          isSubmit: true, // ...state, 이전 값 상속됨
          submitStatus: 'SUCCESS',
          fetchResult: 'OK',
        }
      },
      {
        testName: 'fulfilled',
        action: { type: asyncSubmitFetch.fulfilled.type, payload: { result: 'SERVER ERROR' } },
        expectedInit: {
          isSubmit: true,
          submitStatus: 'FAIL',
          fetchResult: 'SERVER ERROR',
        }
      },
      {
        testName: 'rejected',
        action: { type: asyncSubmitFetch.rejected.type, payload: { result: 'REJECTED' } },
        expectedInit: {
          isSubmit: true,
          submitStatus: 'FAIL',
          fetchResult: 'REJECTED',
        }
      },
    ]

    for (let i = 0; i < testArr.length; i++) {
      const { testName, action, expectedInit } = testArr[i];
      it(`${testName} - "${expectedInit.fetchResult}"`, () => {
        const response = reducer(initialState, action);
        expect(response).toMatchObject(expectedInit);
      })
    }
  })
})