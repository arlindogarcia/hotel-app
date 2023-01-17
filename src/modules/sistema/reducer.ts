import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "../login/types/usuario";

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  showForm: boolean;
  error: string;
  success: string;
  usuarios: Usuario[];
  usuario: Usuario | null;
  perfil: Usuario | null;
};

const initialState: TInitialState = {
  isLoadingList: false,
  isLoading: false,
  showForm: false,
  error: "",
  success: "",
  usuarios: [],
  usuario: null,
  perfil: null,
};

const sistemaSlice = createSlice({
  name: "sistema",
  initialState,
  reducers: {
    requestUsuarios(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
      state.usuario = null;
    },
    requestUsuariosSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario[]>
    ) {
      state.isLoadingList = false;
      state.usuarios = payload;
    },
    requestUsuario(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.usuario = null;
      state.showForm = false;
      state.error = "";
      state.success = "";
    },
    requestSaveUsuario(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.isLoading = true;
    },
    requestSaveUsuarioSuccess(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.error = "";
      state.success = payload;
      state.isLoading = false;
    },
    requestUsuarioSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.usuario = payload;
      state.showForm = true;
    },
    requestUsuariosError(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.isLoadingList = false;
      state.isLoading = false;
      state.error = payload;
      state.success = "";
    },
    // PERFIL
    requestPerfil(state: TInitialState) {
      state.perfil = null;
      state.showForm = false;
      state.error = "";
      state.success = "";
    },
    requestPerfilSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.perfil = {
        ...payload,
        old_password: "",
        password: "",
        password_confirmation: "",
      };
      state.showForm = true;
    },
    requestSavePerfil(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.isLoading = true;
    },
    requestSavePerfilSuccess(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.error = "";
      state.success = payload;
      state.isLoading = false;
    },
  },
});

export const sistemaActions = sistemaSlice.actions;

export default sistemaSlice;
