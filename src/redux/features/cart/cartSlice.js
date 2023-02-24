import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: {},
    isFetching: false,
    error: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartStart: (state) => {
        state.isFetching = true;
    },
    setCart: (state, action) => {
        state.cart = action.payload;
        state.isFetching = false;
        state.error = false;
    },
    getCartFailed: (state) => {
        state.isFetching = false;
        state.error = true;
    }
  }
})

// Action creators are generated for each case reducer function
export const { getCartStart, setCart, getCartFailed } = cartSlice.actions

export default cartSlice.reducer