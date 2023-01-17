import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { sistemaActions } from "./reducer";
import { apiCall } from "../app/config";

function* requestUsuariosWorker() {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: "/usuarios",
      method: "get",
    });
    console.log("list", res.data);
    yield put(sistemaActions.requestUsuariosSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        error?.response?.data?.message
          ? error.response?.data?.message
          : JSON.stringify(error)
      )
    );
  }
}

export function* sistemaSaga() {
  yield all([
    takeLatest("sistema/requestUsuarios", requestUsuariosWorker),
  ]);
}
