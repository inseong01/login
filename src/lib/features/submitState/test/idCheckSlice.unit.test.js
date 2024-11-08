import reducer, { asyncDuplicatedIdFetch, resetIdCheckState } from '@/lib/features/submitState/idCheckSlice'

const initialState = {
  isSubmit: false,
  submitStatus: '',
  fetchResult: '',
}

describe('IdCheckState reducer test : ', () => {
  it('ResetIdCheckState Action', () => {
    const outputInit = reducer(undefined, resetIdCheckState());
    expect(outputInit).toMatchObject(initialState);
  })

  describe('ExtraReducers Action', () => {
    const testArr = [
      {
        testName: 'pending',
        action: { type: asyncDuplicatedIdFetch.pending.type },
        expectedInit: {
          isSubmit: true,
          submitStatus: 'PROCESS',
          fetchResult: '',
        }
      },
      {
        testName: 'fulfilled',
        action: { type: asyncDuplicatedIdFetch.fulfilled.type, payload: { result: 'OK' } },
        expectedInit: {
          isSubmit: false, // ...state, 이전 값 상속됨
          submitStatus: 'SUCCESS',
          fetchResult: 'OK',
        }
      },
      {
        testName: 'fulfilled',
        action: { type: asyncDuplicatedIdFetch.fulfilled.type, payload: { result: 'SERVER ERROR' } },
        expectedInit: {
          isSubmit: false,
          submitStatus: 'FAIL',
          fetchResult: 'SERVER ERROR',
        }
      },
      {
        testName: 'fulfilled',
        action: { type: asyncDuplicatedIdFetch.fulfilled.type, payload: { result: 'ERROR' } },
        expectedInit: {
          isSubmit: false,
          submitStatus: 'FAIL',
          fetchResult: 'ERROR',
        }
      },
      {
        testName: 'rejected',
        action: { type: asyncDuplicatedIdFetch.rejected.type },
        expectedInit: {
          isSubmit: false,
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