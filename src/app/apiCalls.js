import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";
import { ecoFreakyRequest } from "services/axios";

export const loginRegister = async (
  dispatch,
  body,
  endpoint,
  history,
  context
) => {
  dispatch(loginStart());
  try {
    const res = await ecoFreakyRequest.post(endpoint, body);

    dispatch(loginSuccess(res.data));

    if (context === "cart") {
      history.push("/");
    }
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
  }
};

export const logOut = async (dispatch, history) => {
  dispatch(logout());
  history.push("/");
  window.location.reload();
};
