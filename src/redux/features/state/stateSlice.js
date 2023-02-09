import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: () => {
      state.loading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = stateSlice.actions

export default stateSlice.reducer