import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { loginActions, TLoginAction } from "./reducer";
import { APIURL } from "../../app/config";
import { Usuario } from "../types/usuario";

type TLoginRes = {
  token: string;
  expires_in: string;
  user: Usuario;
};

function loginCall(payload: TLoginAction) {
  return axios.post(`${APIURL}/sessions`, {
    email: payload.email,
    password: payload.password,
  });
}

function* loginWorker({ payload }: PayloadAction<TLoginAction>) {
  try {
    const res: AxiosResponse<TLoginRes> = yield call(loginCall, payload);
    console.log("resposta login", res);
    yield put(loginActions.loginSuccess(res.data));
  } catch (error: any) {
    console.log("error returned", error);
    if (error?.response?.data?.message) {
      yield put(loginActions.loginError(error.response.data.message));
      return;
    }
    if (error?.message) {
      yield put(loginActions.loginError(error.message));
    } else {
      yield put(loginActions.loginError(JSON.stringify(error)));
    }
  }
}

export function* loginSaga() {
  yield all([
    takeLatest("login/requestLogin", loginWorker),
  ]);
}
