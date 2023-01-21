import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDateTime } from "../../utils/formatDate";
import { Usuario } from "../login/types/usuario";
import { UsuarioTemporario } from "./types/usuario_temporario";


interface TLoginRes {
  token: string;
  user: UsuarioTemporario;
};

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  error: string;
  success: string;
  usuarios: Usuario[];
  usuario: Usuario | null;
  perfil: Usuario | null;
  usuarios_temporarios: UsuarioTemporario[];
  usuario_temporario: UsuarioTemporario | null;
};

const initialState: TInitialState = {
  isLoadingList: false,
  isLoading: false,
  error: "",
  success: "",
  usuarios: [],
  usuario: null,
  perfil: null,
  usuarios_temporarios: [],
  usuario_temporario: null,
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
      state.usuario = {
        ...payload,
        password: '',
      };
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
      state.usuario = {
        ...payload,
        password: '',
      };
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
    // USUARIO TEMPORARIO
    requestUsuariosTemporarios(state: TInitialState, _: PayloadAction<{ escopo: string }>) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
    },
    requestUsuariosTemporariosSuccess(
      state: TInitialState,
      { payload }: PayloadAction<UsuarioTemporario[]>
    ) {
      state.isLoadingList = false;
      state.usuarios_temporarios = payload;
    },
    requestUsuarioTemporario(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestSaveUsuarioTemporario(
      state: TInitialState,
      { payload }: PayloadAction<UsuarioTemporario>
    ) {
      state.isLoading = true;
    },
    requestSaveUsuarioTemporarioSuccess(
      state: TInitialState,
      { payload }: PayloadAction<UsuarioTemporario>
    ) {
      state.error = "";
      state.success = "Usuário temporário salvo com sucesso.";
      state.usuario_temporario = {
        ...payload,
        data_inicio_sessao: formatDateTime(payload.data_inicio_sessao, 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
        data_fim_sessao: formatDateTime(payload.data_fim_sessao, 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
      };
      state.isLoading = false;
    },
    requestUsuarioTemporarioSuccess(
      state: TInitialState,
      { payload }: PayloadAction<UsuarioTemporario>
    ) {
      state.isLoading = false;
      state.usuario_temporario = {
        ...payload,
        data_inicio_sessao: formatDateTime(payload.data_inicio_sessao, 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
        data_fim_sessao: formatDateTime(payload.data_fim_sessao, 'yyyy-MM-dd HH:mm').replace(' ', 'T'),
      };
    },
    requestUsuarioTemporarioLogin(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
      state.isLoading = true;
    },
    requestUsuarioTemporarioLoginSuccess(state: TInitialState, { payload }: PayloadAction<TLoginRes>) {
      state.isLoading = false;
    },
  },
});

export const sistemaActions = sistemaSlice.actions;

export default sistemaSlice;
