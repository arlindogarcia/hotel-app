import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../app/config";
import { PayloadAction } from "@reduxjs/toolkit";
import { formatError } from "../../utils/formatError";
import { ICarrinho, IParamsShop, pedidoActions } from "./reducer";

function* requestConfiguracaoItensWorker({ payload }: PayloadAction<IParamsShop>) {
  try {
    const payloadQuery = `?categoria_id=${payload.categoria_id}&subcategoria_id=${payload.subcategoria_id}&search=${payload.search}&orderby=${payload.orderby}`;

    const res: AxiosResponse = yield call(apiCall, {
      url: `/clientes-hoteis-configuracoes/item/shop${payloadQuery}`,
      method: "get",
    });
    console.log("shop", res.data);
    yield put(pedidoActions.requestConfiguracaoItensSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      pedidoActions.requestError(
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
    yield put(pedidoActions.requestEnviarPedidoSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      pedidoActions.requestError(
        formatError(error)
      )
    );
  }
}

function* requestPedidosWorker({ payload }: PayloadAction<Record<string, string>>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/pedidos?apenas_nao_entregues=${payload.apenas_nao_entregues}&status=${payload.status}`,
      method: "get",
    });
    console.log("pedidos", res.data);
    yield put(pedidoActions.requestPedidosSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      pedidoActions.requestError(
        formatError(error)
      )
    );
  }
}

function* requestPedidoWorker({ payload }: PayloadAction<{ id: string }>) {
  try {
    const res: AxiosResponse = yield call(apiCall, {
      url: `/pedidos/${payload.id}`,
      method: "get",
    });
    console.log("pedido", res.data);
    yield put(pedidoActions.requestPedidoSuccess(res.data));
  } catch (error: any) {
    console.log("error", error);
    yield put(
      pedidoActions.requestError(
        formatError(error)
      )
    );
  }
}



export function* pedidoSaga() {
  yield all([
    takeLatest("pedido/requestConfiguracaoItens", requestConfiguracaoItensWorker),
    takeLatest("pedido/requestEnviarPedido", requestEnviarPedidoWorker),
    takeLatest("pedido/requestPedidos", requestPedidosWorker),
    takeLatest("pedido/requestPedido", requestPedidoWorker),
  ]);
}
