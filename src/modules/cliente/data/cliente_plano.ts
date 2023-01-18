import { ClientePlano } from "../types/cliente_plano";

export const novoClientePlano = (): ClientePlano => {
  return {
    id: '',
    nome: '',
    cliente_id: '',
    ativo: true,
  }
}