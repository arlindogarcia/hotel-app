import { Usuario } from "../../login/types/usuario";
import { UsuarioTemporario } from "../../sistema/types/usuario_temporario";
import Model from "../../types/Model";
import Chat from "./chat";

export default interface ChatMensagem extends Model {
  chat_id: string | undefined | null;
  chat?: Chat;
  mensagem: string;
  lido: boolean;
  usuario_temporario_id: string | undefined | null;
  usuario_temporario?: UsuarioTemporario;
  usuario_id: string | undefined | null;
  usuario?: Usuario;
}