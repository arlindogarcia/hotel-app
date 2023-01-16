import { all } from "redux-saga/effects";
import { loginSaga } from "../login/saga";

export function* mainSaga() {
  yield all([
    loginSaga(),
  ]);
}
