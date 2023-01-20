import { UsuarioTemporario } from "../types/usuario_temporario";

export const novoUsuarioTemporario = (): UsuarioTemporario => {
  return {
    id: '',
    nome: '',
    cliente_id: '',
    cliente_plano_usuario_id: '',
    hotel_cliente_quarto_id: '',
    data_inicio_sessao: '',
    data_fim_sessao: '',
  }
}