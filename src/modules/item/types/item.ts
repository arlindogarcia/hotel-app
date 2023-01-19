import Model from "../../types/Model";
import { Categoria } from "./categoria";
import { ItemImagem } from "./item_imagem";
import { Subcategoria } from "./subcategoria";

export interface Item extends Model {
  nome: string;
  imagem_principal: string;
  descricao_html: string;
  categoria_id: string;
  subcategoria_id: string;
  cliente_id: string;
  imagens: ItemImagem[];
  categoria?: Categoria;
  subcategoria?: Subcategoria;
}