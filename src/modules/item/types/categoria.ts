import Model from "../../types/Model";
import { Subcategoria } from "./subcategoria";

export interface Categoria extends Model {
  nome: string;
  cliente_id: string;
  ativo: boolean;
  subcategorias: Subcategoria[];
}