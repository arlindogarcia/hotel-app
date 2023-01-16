import { all } from "redux-saga/effects";
import { loginSaga } from "../login/store/saga";

export function* mainSaga() {
  yield all([
    loginSaga(),
  ]);
}
