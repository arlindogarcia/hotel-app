import { Usuario } from "../../login/types/usuario";
import { UsuarioTemporario } from "../../sistema/types/usuario_temporario";
import Model from "../../types/Model";
import ChatMensagem from "./chat_mensagem";

export default interface Chat extends Model {
  finalizado: boolean;
  cliente_id: string;
  usuario_temporario_id: string;
  usuario_temporario?: UsuarioTemporario;
  usuario_id: string;
  usuario?: Usuario;
  mensagens: ChatMensagem[];
}