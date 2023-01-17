import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "../login/types/usuario";

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  error: string;
  usuarios: Usuario[];
  usuario: Usuario | null;
};

const initialState: TInitialState = {
  isLoadingList: false,
  isLoading: false,
  error: "",
  usuarios: [],
  usuario: null,
};

const sistemaSlice = createSlice({
  name: "sistema",
  initialState,
  reducers: {
    requestUsuarios(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
    },
    requestUsuariosSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Usuario[]>
    ) {
      state.isLoadingList = false;
      state.usuarios = payload;
    },
    requestUsuario(state: TInitialState) {
      state.isLoading = true;
      state.error = "";
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
    },
  },
});

export const sistemaActions = sistemaSlice.actions;

export default sistemaSlice;
