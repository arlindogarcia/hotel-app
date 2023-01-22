import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelConfiguracao } from "../cliente/types/hotel_configuracao";
import { HotelConfiguracaoItem } from "../cliente/types/hotel_configuracao_item";

type TInitialState = {
  isLoading: boolean;
  error: string;
  success: string;
  configuracao: HotelConfiguracao | null;
  configuracao_itens: HotelConfiguracaoItem[];
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
  },
});

export const usuarioTemporarioActions = usuarioTemporarioSlice.actions;

export default usuarioTemporarioSlice;
