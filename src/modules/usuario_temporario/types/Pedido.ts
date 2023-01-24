import { HotelQuarto } from "../../cliente/types/hotel_quarto";
import { UsuarioTemporario } from "../../sistema/types/usuario_temporario";
import Model from "../../types/Model";
import { PedidoItem } from "./PedidoItem";

export interface Pedido extends Model {
  valor_total: number;
  status: number;
  hotel_cliente_quarto_id: string;
  quarto?: HotelQuarto;
  usuario_temporario_id: string;
  usuario_temporario?: UsuarioTemporario;
  data_entrega: string;
  data_entrega_desejada: string;
  itens: PedidoItem[];
}