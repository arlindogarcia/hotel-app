import Model from "../../types/Model";

export interface Hotel extends Model {
  nome: string;
  ativo: boolean;
  cliente_id: string;
}