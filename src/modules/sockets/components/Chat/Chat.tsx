import {
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as io from "socket.io-client";
import { InitializateSocketChat } from "../..";
import getEnv from "../../../../utils/getEnv";
import { RootState } from "../../../app/mainReducer";
import { novoChatMensagem } from "../../data/novoChatMensagem";
import { socketsActions } from "../../reducer";
import { Chat as ChatType } from "../../types";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Message";

const socket = io.connect(`${getEnv('REACT_APP_API_HOST')}/chat`);

const Chat = () => {
  const usuario = useSelector((state: RootState) => state.login.user || state.login.user_temp);
  const token = useSelector((state: RootState) => state.login.token);
  InitializateSocketChat(socket, usuario?.id as string, token);

  const dispatch = useDispatch();

  const chats = useSelector((state: RootState) => state.sockets.chats || []);
  const chat = useSelector((state: RootState) => state.sockets.chat);
  const e_usuario_temporario = useSelector((state: RootState) => !!state.login.user_temp);

  socket.on('new_conversation', (data: ChatType) => {
    console.log('new_conversation', data)

    if (data.cliente_id !== usuario?.cliente_id) return;

    dispatch(socketsActions.requestChatsSuccess([
      ...chats,
      {
        ...data,
      }
    ]))
  })

  socket.on('return_message', (data: ChatType) => {
    console.log('return_message', data)

    const novoChats: ChatType[] = (chats || []).map((c: ChatType) => {
      if (c.id === data.id) {
        const retorno = {
          ...data,
          mensagens: [
            ...c.mensagens,
            ...data.mensagens,
          ]
        };

        dispatch(socketsActions.requestChatSuccess(retorno));

        return retorno as ChatType;
      }

      return c;
    })

    dispatch(socketsActions.requestChatsSuccess(novoChats));

    const chatAtualizado = {
      ...data,
      mensagens: [
        ...chat?.mensagens || [],
        ...data.mensagens,
      ]
    }

    dispatch(socketsActions.requestChatSuccess(chatAtualizado))
    dispatch(socketsActions.requestChatsSuccess((chats || []).map((c: ChatType) => {
      if (c.id === chatAtualizado.id) {
        return chatAtualizado;
      }

      return c;
    })));
  })

  socket.on('new_message', (data: ChatType) => {
    console.log('new_message', data)

    if (e_usuario_temporario) {
      if (chat?.id === data.id) {
        dispatch(socketsActions.requestChatSuccess({
          ...data,
          mensagens: [
            ...chat?.mensagens || [],
            ...data.mensagens,
          ]
        }))
      }
      return;
    }

    const novoChats: ChatType[] = (chats || []).map((c: ChatType) => {
      if (c.id === data.id) {
        const retorno = {
          ...data,
          mensagens: [
            ...c.mensagens,
            ...data.mensagens,
          ]
        };

        dispatch(socketsActions.requestChatSuccess(retorno));

        return retorno as ChatType;
      }

      return c;
    })

    dispatch(socketsActions.requestChatsSuccess(novoChats));
  })

  const handleSendMessage = (message: string) => {
    if (!message.trim().length) {
      return;
    }

    const novaMensagem = novoChatMensagem();
    novaMensagem.usuario_id = !e_usuario_temporario ? usuario?.id : null;
    novaMensagem.usuario_temporario_id = e_usuario_temporario ? usuario?.id : null;
    novaMensagem.mensagem = message;
    novaMensagem.chat_id = chat?.id ? chat.id : null;
    novaMensagem.created_at = new Date().toISOString();

    socket.emit('message', {
      ...novaMensagem,
      cliente_id: usuario?.cliente_id,
    });
  };

  return (
    <Flex h="100%" flexDir="column">
      <Header />
      <Messages messages={chat?.mensagens || []} />
      <Footer
        handleSendMessage={handleSendMessage}
      />
    </Flex>
  );
}

export default Chat;