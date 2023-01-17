import { Hotel } from "../types/hotel";

export const novoHotel = (): Hotel => {
  return {
    id: '',
    nome: '',
    ativo: true,
    cliente_id: '',
  }
}