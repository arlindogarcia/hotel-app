import Model from "../../types/Model";

export interface ClientePlano extends Model {
  nome: string;
  cliente_id: string;
  ativo: boolean;
}