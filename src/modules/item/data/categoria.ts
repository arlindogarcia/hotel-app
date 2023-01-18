import { Categoria } from "../types/categoria"

export const novaCategoria = (): Categoria => {
  return {
    id: '',
    nome: '',
    cliente_id: '',
    ativo: true,
    subcategorias: [],
  }
}