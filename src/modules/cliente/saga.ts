import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { clienteActions } from "./reducer";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { formatError } from "../../utils/formatError";
import { novoCliente } from "./data/cliente";

function* requestClientesWorker() {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: "/clientes",
      method: "get",
    });
    console.log("list", res.data);
    yield put(clienteActions.requestClientesSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      clienteActions.requestClientesError(
        formatError(error)
      )
    );
  }
}

interface IParamShow {
  id: string
}

function* requestClienteWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    if (payload.id == 'novo') {
      yield put(clienteActions.requestClienteSuccess(novoCliente()));
      return;
    }

    const res: AxiosResponse = yield call(apiCall, {
      url: `/clientes/${payload.id}`,
      method: "get",
    });
    console.log("show", res.data);
    yield put(clienteActions.requestClienteSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      clienteActions.requestClientesError(
        formatError(error)
      )
    );
  }
}

function* requestSaveClienteWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/clientes`,
      method: "post",
      data: payload,
    });
    console.log("save", res.data);
    yield put(clienteActions.requestSaveClienteSuccess("Usuário salvo com sucesso."));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      clienteActions.requestClientesError(
        formatError(error)
      )
    );
  }
}

export function* clienteSaga() {
  yield all([
    takeLatest("cliente/requestClientes", requestClientesWorker),
    takeLatest("cliente/requestCliente", requestClienteWorker),
    takeLatest("cliente/requestSaveCliente", requestSaveClienteWorker),
  ]);
}
