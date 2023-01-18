import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cliente } from "./types/cliente";
import { ClientePlano } from "./types/cliente_plano";
import { Hotel } from "./types/hotel";

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  showForm: boolean;
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
  showForm: false,
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
      state.cliente = null;
    },
    requestClientesSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Cliente[]>
    ) {
      state.isLoadingList = false;
      state.clientes = payload;
    },
    requestCliente(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.cliente = null;
      state.showForm = false;
      state.error = "";
      state.success = "";
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
      state.showForm = true;
    },
    // Hoteis
    requestHoteis(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
      state.hotel = null;
    },
    requestHoteisSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel[]>
    ) {
      state.isLoadingList = false;
      state.hoteis = payload;
    },
    requestHotel(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.hotel = null;
      state.showForm = false;
      state.error = "";
      state.success = "";
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
      state.showForm = true;
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
      state.plano = null;
    },
    requestPlanosSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel[]>
    ) {
      state.isLoadingList = false;
      state.planos = payload;
    },
    requestPlano(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.plano = null;
      state.showForm = false;
      state.error = "";
      state.success = "";
    },
    requestPlanoSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Hotel>
    ) {
      state.plano = payload;
      state.showForm = true;
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
