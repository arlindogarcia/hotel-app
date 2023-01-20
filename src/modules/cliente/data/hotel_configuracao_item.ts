import { HotelConfiguracaoItem } from "../types/hotel_configuracao_item";

export const novoHotelConfiguracaoItem = (): HotelConfiguracaoItem => {
  return {
    id: '',
    cliente_plano_ids: '',
    tempo_entrega_estimado: 0,
    gratuito: false,
    preco: 0,
    hotel_cliente_configuracao_id: '',
    item_id: '',
  }
}