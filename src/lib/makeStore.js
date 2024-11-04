import { configureStore } from "@reduxjs/toolkit"
import loginSliceReducer from './features/errorState/loginSlice.js'
import signUpSliceReducer from './features/errorState/signUpSlice.js'
import formSliceReducer from './features/switchState/formSlice.js'

export const makeStore = () => {
  return configureStore({
    reducer: {
      formState: formSliceReducer,
      loginError: loginSliceReducer,
      signUpError: signUpSliceReducer
    }
  })
}