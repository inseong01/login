import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: false,
  name: false,
  msg: {
    id: '',
    name: ''
  }
}

const forgetSlice = createSlice({
  name: 'forgetError',
  initialState,
  reducers: {
    resetForgetError: () => {
      return initialState;
    },
  }
})

export const { resetForgetError } = forgetSlice.actions;
export default forgetSlice.reducer