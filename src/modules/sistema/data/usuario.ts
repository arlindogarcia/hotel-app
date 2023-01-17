import { Usuario } from "../../login/types/usuario";

export const novoUsuario = (): Usuario => {
  return {
    id: "",
    nome: "",
    email: "",
    password: "",
    celular: "",
    acessos_quais_hoteis: "",
    acessos_sistema: "",
    ativo: true,
  }
}