import { Item } from "../../item/types/item";
import Model from "../../types/Model";

export interface HotelConfiguracaoItem extends Model {
  cliente_plano_ids: string;
  tempo_entrega_estimado: number;
  gratuito: boolean;
  preco: number;
  hotel_cliente_configuracao_id: string;
  item_id: string;
  item?: Item;
  planos?: string;
}