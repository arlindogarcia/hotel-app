import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "../login/types/usuario";

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  error: string;
  success: string;
  usuarios: Usuario[];
  usuario: Usuario | null;
  perfil: Usuario | null;
};

const initialState: TInitialState = {
  isLoadingList: false,
  isLoading: false,
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
    },
    requestUsuariosSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario[]>
    ) {
      state.isLoadingList = false;
      state.usuarios = payload;
    },
    requestUsuario(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestSaveUsuario(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.isLoading = true;
    },
    requestSaveUsuarioSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.error = "";
      state.success = "Usuário salvo com sucesso.";
      state.usuario = payload;
      state.isLoading = false;
    },
    requestSavePerfilSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.error = "";
      state.success = "Perfil salvo com sucesso.";
      state.perfil = payload;
      state.isLoading = false;
    },
    requestUsuarioSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.isLoading = false;
      state.usuario = payload;
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
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestPerfilSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.isLoading = false;
      state.perfil = {
        ...payload,
        old_password: "",
        password: "",
        password_confirmation: "",
      };
    },
    requestSavePerfil(
      state: TInitialState,
      { payload }: PayloadAction<Usuario>
    ) {
      state.isLoading = true;
    },
  },
});

export const sistemaActions = sistemaSlice.actions;

export default sistemaSlice;
