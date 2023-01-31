import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Chat from "./types/chat";

export interface IRequestChats {
  finalizado: boolean;
}

type TInitialState = {
  nova_mensagem?: string;
  chats?: Chat[];
  chat?: Chat | null;
  isLoading?: boolean;
  error?: string;
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
    // CHAT
    requestError(state: TInitialState, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    requestChats(state: TInitialState, _: PayloadAction<IRequestChats>) {
      state.isLoading = true;
      state.error = "";
    },
    requestChatsSuccess(state: TInitialState, { payload }: PayloadAction<Chat[]>) {
      state.isLoading = false;
      state.chats = payload;

      const itemSelecionadoIndex = payload.findIndex(chat => chat.id === state.chat?.id) || -1;
      if (itemSelecionadoIndex < 0) return;
      state.chat = state.chats[itemSelecionadoIndex];
    },
    requestChat(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.isLoading = true;
      state.error = "";
    },
    requestChatSuccess(state: TInitialState, { payload }: PayloadAction<Chat | null>) {
      state.isLoading = false;
      state.chat = payload;

      const chatsIndex = state.chats?.findIndex(chat => chat.id === payload?.id) || -1;

      if (!payload || chatsIndex < 0 || !state.chats) return;

      state.chats[chatsIndex] = payload;
    },
    newMessage(state: TInitialState, { payload }: PayloadAction<Chat>) {
      const chatIndex = state.chats?.findIndex(chat => chat.id === payload.id) || -1;

      if (chatIndex < 0) return;
      if (!state.chats) return;

      const kkk = {
        ...state.chats[chatIndex],
        mensagens: [
          ...state.chats[chatIndex].mensagens,
          ...payload.mensagens,
        ],
      };
      state.chats[chatIndex] = kkk;

      if (state.chat?.id === state.chats[chatIndex].id) {
        state.chat = state.chats[chatIndex]
      }
    },
  },
});

export const socketsActions = socketsSlice.actions;

export default socketsSlice;
