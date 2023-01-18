import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { itemActions } from "./reducer";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { formatError } from "../../utils/formatError";
import { novaCategoria } from "./data/categoria";

function* requestCategoriasWorker() {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: "/categorias",
      method: "get",
    });
    console.log("list", res.data);
    yield put(itemActions.requestCategoriasSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      itemActions.requestError(
        formatError(error)
      )
    );
  }
}

interface IParamShow {
  id: string
}

function* requestCategoriaWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    if (payload.id === 'novo') {
      yield put(itemActions.requestCategoriaSuccess(novaCategoria()));
      return;
    }

    const res: AxiosResponse = yield call(apiCall, {
      url: `/categorias/${payload.id}`,
      method: "get",
    });
    console.log("show", res.data);
    yield put(itemActions.requestCategoriaSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      itemActions.requestError(
        formatError(error)
      )
    );
  }
}

function* requestSaveCategoriaWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/categorias`,
      method: "post",
      data: payload,
    });
    console.log("save", res.data);
    yield put(itemActions.requestSaveCategoriaSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      itemActions.requestError(
        formatError(error)
      )
    );
  }
}

export function* itemSaga() {
  yield all([
    takeLatest("item/requestCategorias", requestCategoriasWorker),
    takeLatest("item/requestCategoria", requestCategoriaWorker),
    takeLatest("item/requestSaveCategoria", requestSaveCategoriaWorker),
  ]);
}
