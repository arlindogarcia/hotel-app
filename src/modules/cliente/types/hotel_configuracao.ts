import Model from "../../types/Model";
import { HotelConfiguracaoItem } from "./hotel_configuracao_item";

export interface HotelConfiguracao extends Model {
  hotel_ids: string;
  imagem_logo: string;
  ativo: boolean;
  cliente_id: string;
  itens: HotelConfiguracaoItem[];
  hoteis?: string;
}
