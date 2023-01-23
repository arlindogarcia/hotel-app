import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClienteEdit, ClienteList, HotelList, HotelConfiguracaoEdit, HotelConfiguracaoList, HotelQuartoList, HotelQuartoEdit } from "../cliente/views";
import ClientePlanoEdit from "../cliente/views/ClientePlanoEdit";
import ClientePlanoList from "../cliente/views/ClientePlanoList";
import HotelEdit from "../cliente/views/HotelEdit";
import Home from "../home/Home";
import { CategoriaEdit, CategoriaList } from "../item/views";
import ItemEdit from "../item/views/ItemEdit";
import ItemList from "../item/views/ItemList";
import { Login } from "../login/views";
import Logout from "../login/views/Logout";
import { PerfilEdit, UsuarioEdit, UsuarioList, UsuarioTemporarioList, UsuarioTemporarioEdit, UsuarioTemporarioLogin } from "../sistema/views";
import { ShopList } from "../usuario_temporario/views";
import ShopCart from "../usuario_temporario/views/ShopCart";

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/usuarios" element={<UsuarioList />} />
        <Route path="/usuarios/:id" element={<UsuarioEdit />} />
        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/:id" element={<ClienteEdit />} />
        <Route path="/hoteis" element={<HotelList />} />
        <Route path="/hoteis/:id" element={<HotelEdit />} />
        <Route path="/perfil" element={<PerfilEdit />} />
        <Route path="/planos" element={<ClientePlanoList />} />
        <Route path="/planos/:id" element={<ClientePlanoEdit />} />
        <Route path="/categorias" element={<CategoriaList />} />
        <Route path="/categorias/:id" element={<CategoriaEdit />} />
        <Route path="/itens" element={<ItemList />} />
        <Route path="/itens/:id" element={<ItemEdit />} />
        <Route path="/hoteis-configuracoes" element={<HotelConfiguracaoList />} />
        <Route path="/hoteis-configuracoes/:id" element={<HotelConfiguracaoEdit />} />
        <Route path="/hoteis-quartos" element={<HotelQuartoList />} />
        <Route path="/hoteis-quartos/:id" element={<HotelQuartoEdit />} />
        <Route path="/usuarios-temporarios" element={<UsuarioTemporarioList />} />
        <Route path="/usuarios-temporarios/:id" element={<UsuarioTemporarioEdit />} />
        <Route path="/usuarios-temporarios/login/:id" element={<UsuarioTemporarioLogin />} />
        <Route path="/produtos" element={<ShopList />} />
        <Route path="/carrinho" element={<ShopCart />} />
      </Routes>
    </BrowserRouter>
  );
};
