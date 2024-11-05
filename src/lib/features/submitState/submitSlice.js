import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  submitStatus: '',
  fetchResult: '',
};

export const asyncSubmitFetch = createAsyncThunk(
  'submitSlice/asyncSubmitFetch',
  async ({ type, data }) => {
    try {
      const response = await fetch(`api/${type}`, {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      await new Promise((res) => setTimeout(() => res(), 1000))

      if (response.ok && response.status === 200) {
        const result = await response.text();
        await new Promise((res) => setTimeout(() => res(), 1000))
        return { result }; // 'OK' 또는 에러 메시지 반환
      };
    } catch (err) {
      console.error('asyncSubmitFetch error,', err);
      return { result: 'SERVER ERROR' };
    }
  }
)

const submitSlice = createSlice({
  name: 'submitState',
  initialState,
  reducers: {
    resetSubmitState: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSubmitFetch.pending, (state, action) => {
      return {
        ...state,
        isSubmit: true,
        submitStatus: 'PROCESS',
      }
    })
    builder.addCase(asyncSubmitFetch.fulfilled, (state, action) => {
      // 모든 오류 서버에서 fulfilled 처리
      const status = action.payload.result === 'OK' ? 'SUCCESS' : 'FAIL';
      return {
        ...state,
        // isSubmit: true,
        submitStatus: status,
        fetchResult: action.payload.result
      }
    })
    builder.addCase(asyncSubmitFetch.rejected, (state, action) => {
      return {
        ...state,
        // isSubmit: true,
        submitStatus: 'FAILD',
        fetchResult: action.payload.result
      }
    })
  }
})

export const { resetSubmitState } = submitSlice.actions;
export default submitSlice.reducer;