import { ItemImagem } from "../types/item_imagem";

export const novoItemImagem = (): ItemImagem => {
  return {
    id: '',
    item_id: '',
    imagem: '',
  }
}