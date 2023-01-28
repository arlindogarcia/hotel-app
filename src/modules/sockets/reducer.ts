import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  nova_mensagem?: string;
};

const initialState: TInitialState = {};

const socketsSlice = createSlice({
  name: "sockets",
  initialState,
  reducers: {
    setNovaMensagem(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.nova_mensagem = payload;
    },

  },
});

export const socketsActions = socketsSlice.actions;

export default socketsSlice;
