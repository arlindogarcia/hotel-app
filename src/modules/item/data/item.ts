import { Item } from "../types/item";

export const novoItem = (): Item => {
  return {
    id: '',
    nome: '',
    imagem_principal: '',
    descricao_html: '',
    categoria_id: '',
    subcategoria_id: '',
    cliente_id: '',
    imagens: [],
  }
}