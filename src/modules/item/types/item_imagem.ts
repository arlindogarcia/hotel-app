import Model from "../../types/Model";

export interface ItemImagem extends Model {
  imagem: string;
  item_id: string;
  principal?: boolean;
}