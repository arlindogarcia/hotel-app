import Model from "../../types/Model";

export interface Subcategoria extends Model {
  nome: string;
  ativo: boolean;
  categoria_id: string;
}