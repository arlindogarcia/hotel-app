import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cliente } from "./types/cliente";
import { ClientePlano } from "./types/cliente_plano";
import { Hotel } from "./types/hotel";

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  error: string;
  success: string;
  clientes: Cliente[];
  cliente: Cliente | null;
  hoteis: Hotel[];
  hotel: Hotel | null;
  planos: Hotel[];
  plano: Hotel | null;
};

const initialState: TInitialState = {
  isLoadingList: false,
  isLoading: false,
  error: "",
  success: "",
  clientes: [],
  cliente: null,
  hoteis: [],
  hotel: null,
  planos: [],
  plano: null,
};

const clienteSlice = createSlice({
  name: "cliente",
  initialState,
  reducers: {
    requestClientes(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
    },
    requestClientesSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Cliente[]>
    ) {
      state.isLoadingList = false;
      state.clientes = payload;
    },
    requestCliente(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestSaveCliente(
      state: TInitialState,
      { payload }: PayloadAction<Cliente>
    ) {
      state.isLoading = true;
    },
    requestSaveClienteSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Cliente>
    ) {
      state.error = "";
      state.cliente = payload;
      state.success = "Cliente salvo com sucesso.";
      state.isLoading = false;
    },
    requestClienteSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Cliente>
    ) {
      state.cliente = payload;
      state.isLoading = false;
    },
    // Hoteis
    requestHoteis(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
    },
    requestHoteisSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel[]>
    ) {
      state.isLoadingList = false;
      state.hoteis = payload;
    },
    requestHotel(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestSaveHotel(
      state: TInitialState,
      { payload }: PayloadAction<Hotel>
    ) {
      state.isLoading = true;
    },
    requestSaveHotelSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel>
    ) {
      state.error = "";
      state.success = "Hotel salvo com sucesso.";
      state.hotel = payload;
      state.isLoading = false;
    },
    requestHotelSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel>
    ) {
      state.hotel = payload;
      state.isLoading = false;
    },
    requestError(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.isLoadingList = false;
      state.isLoading = false;
      state.error = payload;
      state.success = "";
    },
    // Planos
    requestPlanos(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
    },
    requestPlanosSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel[]>
    ) {
      state.isLoadingList = false;
      state.planos = payload;
    },
    requestPlano(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestPlanoSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel>
    ) {
      state.plano = payload;
      state.isLoading = false;
    },
    requestSavePlano(
      state: TInitialState,
      { payload }: PayloadAction<Hotel>
    ) {
      state.isLoading = true;
    },
    requestSavePlanoSuccess(
      state: TInitialState,
      { payload }: PayloadAction<ClientePlano>
    ) {
      state.error = "";
      state.plano = payload;
      state.success = "Plano salvo com sucesso.";
      state.isLoading = false;
    },
  },
});

export const clienteActions = clienteSlice.actions;

export default clienteSlice;
