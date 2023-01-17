import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
};
