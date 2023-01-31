import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { formatError } from "../../utils/formatError";
import { IRequestChats, socketsActions } from "./reducer";


function* requestChatsWorker({ payload }: PayloadAction<IRequestChats>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/chats?finalizado=${payload?.finalizado}`,
      method: "get",
    });
    console.log("chats", res.data);
    yield put(socketsActions.requestChatsSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      socketsActions.requestError(
        formatError(error)
      )
    );
  }
}

function* requestChatWorker({ payload }: PayloadAction<{ id: string }>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/chats/${payload.id}`,
      method: "get",
    });
    console.log("pedido", res.data);
    yield put(socketsActions.requestChatSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      socketsActions.requestError(
        formatError(error)
      )
    );
  }
}

export function* socketsSaga() {
  yield all([
    takeLatest("sockets/requestChats", requestChatsWorker),
    takeLatest("sockets/requestChat", requestChatWorker),
  ]);
}
