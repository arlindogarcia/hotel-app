import { HotelQuarto } from "../types/hotel_quarto";

export const novoHotelQuarto = (): HotelQuarto => {
  return {
    id: '',
    nome: '',
    ativo: true,
    hotel_cliente_id: '',
  }
}