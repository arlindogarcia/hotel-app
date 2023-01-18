import { Subcategoria } from "../types/subcategoria"

export const novaSubcategoria = (): Subcategoria => {
  return {
    id: '',
    nome: '',
    ativo: true,
    categoria_id: '',
  }
}