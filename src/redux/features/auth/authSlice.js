import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: null,
  email: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  setRole: (state, action) => {
    state.role = action.payload;
  },
  setEmail: (state, action) => {
    state.email = action.payload;
  }
  }
})

// Action creators are generated for each case reducer function
export const { setRole, setEmail } = authSlice.actions

export default authSlice.reducer