import Model from "../../types/Model";
import { Hotel } from "./hotel";

export interface HotelQuarto extends Model {
  nome: string;
  ativo: boolean;
  hotel_cliente_id: string;
  hotel?: Hotel;
}