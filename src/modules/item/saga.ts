import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { itemActions } from "./reducer";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { formatError } from "../../utils/formatError";
import { novaCategoria } from "./data/categoria";
import { novoItem } from "./data/item";

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

function* requestItensWorker() {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: "/itens",
      method: "get",
    });
    console.log("list", res.data);
    yield put(itemActions.requestItensSuccess(res.data));
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

function* requestItemWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    if (payload.id === 'novo') {
      yield put(itemActions.requestItemSuccess(novoItem()));
      return;
    }

    const res: AxiosResponse = yield call(apiCall, {
      url: `/itens/${payload.id}`,
      method: "get",
    });
    console.log("show", res.data);
    yield put(itemActions.requestItemSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      itemActions.requestError(
        formatError(error)
      )
    );
  }
}

function* requestSaveItemWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/itens`,
      method: "post",
      data: payload,
    });
    console.log("save", res.data);
    yield put(itemActions.requestSaveItemSuccess(res.data));
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
    takeLatest("item/requestItens", requestItensWorker),
    takeLatest("item/requestItem", requestItemWorker),
    takeLatest("item/requestSaveItem", requestSaveItemWorker),
  ]);
}
