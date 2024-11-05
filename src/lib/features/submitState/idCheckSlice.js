import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  submitStatus: '',
  fetchResult: false,
}

export const asyncDuplicatedIdFetch = createAsyncThunk(
  'signUp/asyncDuplicatedIdFetch',
  async ({ id }) => {
    console.log(id)
    try {
      const response = await fetch('api/checkID', {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signUp: { id } }),
      });

      if (response.ok && response.status === 200) {
        const result = await response.text();
        return { result }; // 'OK' 또는 에러 메시지 반환
      }
    } catch (err) {
      console.error('asyncDuplicatedIdFetch error', err);
      return { result: 'SERVER ERROR' };
    }
  }
)

const idCheckSlice = createSlice({
  name: 'idCheckState',
  initialState,
  reducers: {
    resetIdCheckState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncDuplicatedIdFetch.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        submitStatus: 'PROCESS',
      }
    })
    builder.addCase(asyncDuplicatedIdFetch.fulfilled, (state, action) => {
      // 모든 오류 서버에서 fulfilled 처리
      console.log(action.payload)
      const result = action.payload.result
      const submitStatus = result ? 'SUCCESS' : 'FAIL'
      return {
        ...state,
        submitStatus: submitStatus,
        fetchResult: result,
      }
    })
    builder.addCase(asyncDuplicatedIdFetch.rejected, (state, action) => {
      return {
        ...state,
        submitStatus: 'FAIL',
        fetchResult: false,
      }
    })
  }
})

export const { resetIdCheckState } = idCheckSlice.actions;
export default idCheckSlice.reducer;