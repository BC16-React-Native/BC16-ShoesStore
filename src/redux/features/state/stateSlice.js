import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  lauch: false,
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
    },
    setLauch: (state, action) => {
      state.lauch = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { startLoading, endLoading, setLauch } = stateSlice.actions

export default stateSlice.reducer