import Model from "../../types/Model";

export interface Cliente extends Model {
  nome: string;
  ativo: boolean;
  modulos_contratados: string;
}