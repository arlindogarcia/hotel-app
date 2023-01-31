import { ChatMensagem } from "../types";

export const novoChatMensagem = (): ChatMensagem => {
  return {
    id: '',
    chat_id: '',
    mensagem: '',
    lido: false,
    usuario_temporario_id: '',
    usuario_id: '',
  }
}