import { HotelConfiguracao } from "../types/hotel_configuracao";

export const novoHotelConfiguracao = (): HotelConfiguracao => {
  return {
    id: '',
    hotel_ids: '',
    imagem_logo: '',
    ativo: true,
    cliente_id: '',
    itens: [],
  }
}