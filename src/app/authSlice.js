import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  customerId: null, // woocommerce customer id
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setCustomerId } =
  userSlice.actions;

export default userSlice.reducer;
