import { ClientePlano } from "../../cliente/types/cliente_plano";
import { HotelQuarto } from "../../cliente/types/hotel_quarto";
import Model from "../../types/Model";

export interface UsuarioTemporario extends Model {
  nome: string;
  cliente_id: string;
  cliente_plano_usuario_id: string;
  hotel_cliente_quarto_id: string;
  data_inicio_sessao: string;
  data_fim_sessao: string;
  quarto?: HotelQuarto;
  plano?: ClientePlano;
}