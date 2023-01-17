import { Usuario } from "../../login/types/usuario";

export const novoUsuario = (): Usuario => {
  return {
    id: "",
    nome: "",
    email: "",
    password: "",
    celular: "",
    acessos_quais_hoteis: "Todos",
    acessos_sistema: "",
    ativo: true,
  }
}