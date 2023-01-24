import { Item } from "../../item/types/item";
import Model from "../../types/Model";

export interface PedidoItem extends Model {
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  item_id: string;
  item?: Item;
  pedido_id: string;
}