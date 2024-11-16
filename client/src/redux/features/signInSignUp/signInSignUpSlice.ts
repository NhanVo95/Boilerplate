import { createSlice } from '@reduxjs/toolkit'

// Define the interface for a SignInSignUp
interface SignInSignUp {
  selected: boolean
}

const initialState: SignInSignUp = {
  selected: false
}

const signInSignUpSlice = createSlice({
  name: 'signInSignUp',
  initialState,
  reducers: {
    setSignInSignUp: (state, action) => {
      state.selected = action.payload
    }
  }
})

export const { setSignInSignUp } = signInSignUpSlice.actions

export const signInSignUpReducer = signInSignUpSlice.reducer
