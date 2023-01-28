import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelConfiguracao } from "../cliente/types/hotel_configuracao";
import { HotelConfiguracaoItem } from "../cliente/types/hotel_configuracao_item";
import { ResponsePagination } from "../types/ResponsePagination";
import { Pedido } from "./types/Pedido";

export interface ICarrinho {
  itens: (HotelConfiguracaoItem & { quantidade: number })[];
}

type TInitialState = {
  isLoading?: boolean;
  error?: string;
  success?: string;
  configuracao?: HotelConfiguracao | null;
  configuracao_itens?: ResponsePagination<HotelConfiguracaoItem[]>;
  carrinho: ICarrinho;
  redireciona_para_pagina_sucesso?: boolean;
  pedido_id_salvo?: string;
  pedidos?: Pedido[];
  pedido?: Pedido;
};

const novoCarrinho = (): ICarrinho => {
  return {
    itens: []
  }
}

export interface IParamsShop {
  categoria_id: string;
  subcategoria_id: string;
  search: string;
  orderby: string;
}

const initialState: TInitialState = {
  carrinho: novoCarrinho(),
};

const pedidoSlice = createSlice({
  name: "pedido",
  initialState,
  reducers: {
    requestError(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.isLoading = false;
      state.error = payload;
      state.success = "";
    },
    // CONFIGURACAO INICIAL
    requestConfiguracaoSuccess(
      state: TInitialState,
      { payload }: PayloadAction<HotelConfiguracao>
    ) {
      state.isLoading = false;
      state.configuracao = payload;
    },
    // ITENS DISPONIVEIS
    requestConfiguracaoItens(state: TInitialState, _: PayloadAction<IParamsShop>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestConfiguracaoItensSuccess(
      state: TInitialState,
      { payload }: PayloadAction<ResponsePagination<HotelConfiguracaoItem[]>>
    ) {
      state.configuracao_itens = payload;
      state.isLoading = false;
    },
    // CARRINHO
    requestAddItemToCart(state: TInitialState, { payload }: PayloadAction<HotelConfiguracaoItem>) {
      const itemExistenteIndex = state.carrinho.itens.findIndex((i) => i?.item?.id === payload?.item?.id);

      if (itemExistenteIndex > -1) {
        state.carrinho.itens[itemExistenteIndex].quantidade += 1;
        return;
      }

      state.carrinho.itens.push({
        ...payload,
        quantidade: 1,
      });
    },
    requestRemoveItemToCart(state: TInitialState, { payload }: PayloadAction<HotelConfiguracaoItem>) {
      const itemExistenteIndex = state.carrinho.itens.findIndex((i) => i?.item?.id === payload?.item?.id);

      if (itemExistenteIndex > -1) {
        state.carrinho.itens.splice(itemExistenteIndex, 1);
      }
    },
    requestRemoveQuantityItemToCart(state: TInitialState, { payload }: PayloadAction<HotelConfiguracaoItem>) {
      const itemExistenteIndex = state.carrinho.itens.findIndex((i) => i?.item?.id === payload?.item?.id);

      if (itemExistenteIndex > -1) {
        if (state.carrinho.itens[itemExistenteIndex].quantidade === 1) {
          state.carrinho.itens.splice(itemExistenteIndex, 1);
          return;
        }

        state.carrinho.itens[itemExistenteIndex].quantidade -= 1;
      }
    },
    requestAddQuantityItemToCart(state: TInitialState, { payload }: PayloadAction<HotelConfiguracaoItem>) {
      const itemExistenteIndex = state.carrinho.itens.findIndex((i) => i?.item?.id === payload?.item?.id);

      if (itemExistenteIndex > -1) {
        state.carrinho.itens[itemExistenteIndex].quantidade += 1;
      }
    },
    requestEnviarPedido(state: TInitialState, { payload }: PayloadAction<ICarrinho>) {
      state.isLoading = true;
      state.error = "";
      state.success = "";
    },
    requestEnviarPedidoSuccess(state: TInitialState, { payload }: PayloadAction<Pedido>) {
      state.isLoading = false;
      state.error = "";
      state.success = "";
      state.carrinho = novoCarrinho();
      state.pedido_id_salvo = payload.id as string;
      state.redireciona_para_pagina_sucesso = true;
    },
    requestNaoRedirecionaPraPaginadeSucesso(state: TInitialState) {
      state.redireciona_para_pagina_sucesso = false;
    },
    // PEDIDOS
    requestPedidos(state: TInitialState, _: PayloadAction<Record<string, string | number | boolean>>) {
      state.isLoading = true;
      state.error = "";
      state.success = "";
    },
    requestPedidosSuccess(state: TInitialState, { payload }: PayloadAction<Pedido[]>) {
      state.isLoading = false;
      state.pedidos = payload;
    },
    requestPedido(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.isLoading = true;
      state.error = "";
      state.success = "";
    },
    requestPedidoSuccess(state: TInitialState, { payload }: PayloadAction<Pedido>) {
      state.isLoading = false;
      state.pedido = payload;
    },
    requestSavePedido(state: TInitialState, _: PayloadAction<Pedido>) {
      state.isLoading = true;
      state.error = "";
      state.success = "";
    },
    requestSavePedidoSuccess(state: TInitialState, { payload }: PayloadAction<Pedido>) {
      state.isLoading = false;
      state.pedido = payload;
      state.error = "";
      state.success = "Pedido atualizado com sucesso!";
    },
  },
});

export const pedidoActions = pedidoSlice.actions;

export default pedidoSlice;
