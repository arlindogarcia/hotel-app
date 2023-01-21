import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioTemporario } from "../sistema/types/usuario_temporario";
import { Usuario } from "./types/usuario";

type TInitialState = {
  isLogged: boolean;
  isLoggingIn: boolean;
  token: string;
  successMsg: string;
  error: string;
  user: Usuario | null;
  user_temp: UsuarioTemporario | null;
};

export type TLoginAction = {
  email: string;
  password: string;
};

const initialState: TInitialState = {
  isLogged: false,
  isLoggingIn: false,
  token: "",
  successMsg: "",
  user: null,
  user_temp: null,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    requestLogin(state: TInitialState, _: PayloadAction<TLoginAction>) {
      state.isLogged = false;
      state.isLoggingIn = true;
      state.successMsg = "";
      state.error = "";
    },
    loginSuccess(state: TInitialState, { payload }: PayloadAction<{ token: string; user: Usuario; expires_in: string; }>) {
      state.isLogged = true;
      state.isLoggingIn = false;
      state.token = payload.token;
      state.user = payload.user;
      state.successMsg = "Login efetuado com sucesso!";
      state.user_temp = null;
    },
    loginError(state: TInitialState, { payload }: PayloadAction<string>) {
      state.isLoggingIn = false;
      state.error = payload;
    },
    logout(state: TInitialState) {
      state.isLogged = false;
      state.user = null;
      state.token = "";
    },
    loginUsuarioTemporarioSuccess(state: TInitialState, { payload }: PayloadAction<{ token: string; user: UsuarioTemporario }>) {
      state.isLogged = true;
      state.isLoggingIn = false;
      state.successMsg = "";
      state.error = "";
      state.token = payload.token;
      state.user_temp = payload.user;
      state.user = null;
    }
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
