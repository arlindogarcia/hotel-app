import Model from "../../types/Model";

export interface Usuario extends Model {
  nome: string;
  email: string;
  password: string;
  celular: string;
  acessos_quais_hoteis: string;
  acessos_sistema: string;
  ativo: boolean;
}