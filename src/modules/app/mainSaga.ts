import { all } from "redux-saga/effects";
import { loginSaga } from "../login/saga";
import { sistemaSaga } from "../sistema/saga";

export function* mainSaga() {
  yield all([
    loginSaga(),
    sistemaSaga(),
  ]);
}
