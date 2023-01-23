import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelConfiguracao } from "../cliente/types/hotel_configuracao";
import { HotelConfiguracaoItem } from "../cliente/types/hotel_configuracao_item";

type ICarrinho = {
  itens: (HotelConfiguracaoItem & { quantidade: number })[];
}

type TInitialState = {
  isLoading: boolean;
  error: string;
  success: string;
  configuracao: HotelConfiguracao | null;
  configuracao_itens: HotelConfiguracaoItem[];
  carrinho: ICarrinho;
};

export interface IParamsShop {
  categoria_id: string;
  subcategoria_id: string;
  search: string;
  orderby: string;
}

const initialState: TInitialState = {
  isLoading: false,
  error: "",
  success: "",
  configuracao_itens: [],
  configuracao: null,
  carrinho: {
    itens: [],
  },
};

const usuarioTemporarioSlice = createSlice({
  name: "usuario_temporario",
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
      { payload }: PayloadAction<HotelConfiguracaoItem[]>
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
  },
});

export const usuarioTemporarioActions = usuarioTemporarioSlice.actions;

export default usuarioTemporarioSlice;
