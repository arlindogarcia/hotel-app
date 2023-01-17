import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { sistemaActions } from "./reducer";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { novoUsuario } from "./data/usuario";
import { formatError } from "../../utils/formatError";

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

interface IParamShow {
  id: string
}

function* requestUsuarioWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    if (payload.id == 'novo') {
      yield put(sistemaActions.requestUsuarioSuccess(novoUsuario()));
      return;
    }

    const res: AxiosResponse = yield call(apiCall, {
      url: `/usuarios/${payload.id}`,
      method: "get",
    });
    console.log("show", res.data);
    yield put(sistemaActions.requestUsuarioSuccess(res.data));
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

function* requestSaveUsuarioWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/usuarios`,
      method: "post",
      data: payload,
    });
    console.log("save", res.data);
    yield put(sistemaActions.requestSaveUsuarioSuccess("Usuário salvo com sucesso."));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}

function* requestPerfilWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/profile`,
      method: "get",
    });
    console.log("show", res.data);
    yield put(sistemaActions.requestPerfilSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}

function* requestSavePerfilWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/profile`,
      method: "put",
      data: payload,
    });
    console.log("save", res.data);
    yield put(sistemaActions.requestSaveUsuarioSuccess("Perfil salvo com sucesso."));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}


export function* sistemaSaga() {
  yield all([
    takeLatest("sistema/requestUsuarios", requestUsuariosWorker),
    takeLatest("sistema/requestUsuario", requestUsuarioWorker),
    takeLatest("sistema/requestSaveUsuario", requestSaveUsuarioWorker),
    takeLatest("sistema/requestPerfil", requestPerfilWorker),
    takeLatest("sistema/requestSavePerfil", requestSavePerfilWorker),
  ]);
}
