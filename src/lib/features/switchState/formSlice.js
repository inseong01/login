import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: 'formState',
  initialState: {
    type: 'login'
  },
  reducers: {
    switchForm: (state, action) => {
      return {
        type: action.payload.type
      }
    }
  }
})

export const { switchForm } = formSlice.actions;
export default formSlice.reducer;