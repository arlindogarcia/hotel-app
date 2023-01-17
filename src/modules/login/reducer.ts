import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "./types/usuario";

type TInitialState = {
  isLogged: boolean;
  isLoggingIn: boolean;
  token: string;
  successMsg: string;
  error: string;
  usuario: Usuario | null;
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
  usuario: null,
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
      state.usuario = payload.user;
      state.successMsg = "Login efetuado com sucesso!";
    },
    loginError(state: TInitialState, { payload }: PayloadAction<string>) {
      state.isLoggingIn = false;
      state.error = payload;
    },
    logout(state: TInitialState) {
      state.isLogged = false;
      state.usuario = null;
      state.token = "";
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
