import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClienteEdit, ClienteList, HotelList } from "../cliente/views";
import ClientePlanoEdit from "../cliente/views/ClientePlanoEdit";
import ClientePlanoList from "../cliente/views/ClientePlanoList";
import HotelEdit from "../cliente/views/HotelEdit";
import Home from "../home/Home";
import { Login } from "../login/views";
import { PerfilEdit, UsuarioEdit, UsuarioList } from "../sistema/views";

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<UsuarioList />} />
        <Route path="/usuarios/:id" element={<UsuarioEdit />} />
        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/:id" element={<ClienteEdit />} />
        <Route path="/hoteis" element={<HotelList />} />
        <Route path="/hoteis/:id" element={<HotelEdit />} />
        <Route path="/perfil" element={<PerfilEdit />} />
        <Route path="/planos" element={<ClientePlanoList />} />
        <Route path="/planos/:id" element={<ClientePlanoEdit />} />
      </Routes>
    </BrowserRouter>
  );
};
