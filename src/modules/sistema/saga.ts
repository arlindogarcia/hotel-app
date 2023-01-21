import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { sistemaActions } from "./reducer";
import { apiCall, APIURL } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { novoUsuario } from "./data/usuario";
import { formatError } from "../../utils/formatError";
import { novoUsuarioTemporario } from "./data/usuario_temporario";
import { UsuarioTemporario } from "./types/usuario_temporario";
import { loginActions } from "../login/reducer";

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
    if (payload.id === 'novo') {
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
    yield put(sistemaActions.requestSaveUsuarioSuccess(res.data));
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
    yield put(sistemaActions.requestSavePerfilSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}

function* requestUsuariosTemporariosWorker({ payload }: PayloadAction<{ escopo: string }>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/usuarios-temporarios?escopo=${payload.escopo}`,
      method: "get",
    });
    console.log("list", res.data);
    yield put(sistemaActions.requestUsuariosTemporariosSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}

interface IParamShow {
  id: string
}

function* requestUsuarioTemporarioWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    if (payload.id === 'novo') {
      yield put(sistemaActions.requestUsuarioTemporarioSuccess(novoUsuarioTemporario()));
      return;
    }

    const res: AxiosResponse = yield call(apiCall, {
      url: `/usuarios-temporarios/${payload.id}`,
      method: "get",
    });
    console.log("show", res.data);
    yield put(sistemaActions.requestUsuarioTemporarioSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}

function* requestSaveUsuarioTemporarioWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/usuarios-temporarios`,
      method: "post",
      data: payload,
    });
    console.log("save", res.data);
    yield put(sistemaActions.requestSaveUsuarioTemporarioSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      sistemaActions.requestUsuariosError(
        formatError(error)
      )
    );
  }
}
interface TLoginRes {
  token: string;
  user: UsuarioTemporario;
};

function loginCall(payload: { id: String }) {
  return axios.post(`${APIURL}/sessions/usuario-temporario/${payload.id}`);
}

function* requestUsuarioTemporarioLoginWorker({ payload }: PayloadAction<IParamShow>) {
  try {
    const res: AxiosResponse<TLoginRes> = yield call(loginCall, payload);
    console.log("resposta login", res);
    yield put(sistemaActions.requestUsuarioTemporarioLoginSuccess(res.data));
    yield put(loginActions.loginUsuarioTemporarioSuccess(res.data));
  } catch (error: any) {
    console.log("error returned", error);
    yield put(sistemaActions.requestUsuariosError(formatError(error)));
  }
}

export function* sistemaSaga() {
  yield all([
    takeLatest("sistema/requestUsuarios", requestUsuariosWorker),
    takeLatest("sistema/requestUsuario", requestUsuarioWorker),
    takeLatest("sistema/requestSaveUsuario", requestSaveUsuarioWorker),
    takeLatest("sistema/requestPerfil", requestPerfilWorker),
    takeLatest("sistema/requestSavePerfil", requestSavePerfilWorker),
    takeLatest("sistema/requestUsuariosTemporarios", requestUsuariosTemporariosWorker),
    takeLatest("sistema/requestUsuarioTemporario", requestUsuarioTemporarioWorker),
    takeLatest("sistema/requestSaveUsuarioTemporario", requestSaveUsuarioTemporarioWorker),
    takeLatest("sistema/requestUsuarioTemporarioLogin", requestUsuarioTemporarioLoginWorker),
  ]);
}
