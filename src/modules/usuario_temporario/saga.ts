import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { formatError } from "../../utils/formatError";
import { ICarrinho, IParamsShop, usuarioTemporarioActions } from "./reducer";

function* requestConfiguracaoItensWorker({ payload }: PayloadAction<IParamsShop>) {
  try {
    const payloadQuery = `?categoria_id=${payload.categoria_id}&subcategoria_id=${payload.subcategoria_id}&search=${payload.search}&orderby=${payload.orderby}`;

    const res: AxiosResponse = yield call(apiCall, {
      url: `/clientes-hoteis-configuracoes/item/shop${payloadQuery}`,
      method: "get",
    });
    console.log("shop", res.data);
    yield put(usuarioTemporarioActions.requestConfiguracaoItensSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      usuarioTemporarioActions.requestError(
        formatError(error)
      )
    );
  }
}

function* requestEnviarPedidoWorker({ payload }: PayloadAction<ICarrinho>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/pedidos`,
      method: "post",
      data: payload,
    });
    console.log("save", res.data);
    yield put(usuarioTemporarioActions.requestEnviarPedidoSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      usuarioTemporarioActions.requestError(
        formatError(error)
      )
    );
  }
}



export function* usuarioTemporarioSaga() {
  yield all([
    takeLatest("usuario_temporario/requestConfiguracaoItens", requestConfiguracaoItensWorker),
    takeLatest("usuario_temporario/requestEnviarPedido", requestEnviarPedidoWorker),
  ]);
}
