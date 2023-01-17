import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClienteEdit, ClienteList, HotelList } from "../cliente/views";
import HotelEdit from "../cliente/views/HotelEdit";
import Home from "../home/Home";
import { Login } from "../login/views";
import { UsuarioEdit, UsuarioList } from "../sistema/views";

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
      </Routes>
    </BrowserRouter>
  );
};
