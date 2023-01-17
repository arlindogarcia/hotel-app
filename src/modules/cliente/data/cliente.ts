import { Cliente } from "../types/cliente";

export const novoCliente = (): Cliente => {
  return {
    id: '',
    nome: '',
    ativo: true,
    modulos_contratados: '',
  }
}