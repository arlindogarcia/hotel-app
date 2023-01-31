import { Chat } from "../types";

export const novoChat = (): Chat => {
  return {
    id: '',
    finalizado: false,
    cliente_id: '',
    usuario_temporario_id: '',
    usuario_id: '',
    mensagens: [],
  }
}