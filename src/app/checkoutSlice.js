import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutFormValue: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkoutSetFormValue: (state, action) => {
      console.log(action.payload);
      state.checkoutFormValue = {
        ...state.checkoutFormValue,
        ...action.payload,
      };
    },
  },
});

export const { checkoutSetFormValue } = checkoutSlice.actions;

export default checkoutSlice.reducer;
