import { all } from "redux-saga/effects";
import { itemSaga } from "../item/saga";
import { clienteSaga } from "../cliente/saga";
import { loginSaga } from "../login/saga";
import { sistemaSaga } from "../sistema/saga";

export function* mainSaga() {
  yield all([
    loginSaga(),
    sistemaSaga(),
    clienteSaga(),
    itemSaga(),
  ]);
}
