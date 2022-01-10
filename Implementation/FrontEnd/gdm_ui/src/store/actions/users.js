import * as types from "./types";
import catchError from "../../hoc/catchError";

import { auth } from "../../axios/main";

export const get_me = (enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    const { data } = await auth.get("/user/");
    dispatch({ type: types.set_me, me: data });
  }, enqueueSnackbar);
};

export const login = ({ email, password }, enqueueSnackbar) => {
  return catchError(async () => {
    const { data } = await auth.post("/login/", { email, password });
    return data;
  }, enqueueSnackbar);
};

export const logout = (enqueueSnackbar) => {
  return catchError(async (dispatch) => {
    const { data } = await auth.post("/logout/");
    dispatch({ type: types.set_me, me: null });
    return data;
  }, enqueueSnackbar);
};
