import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Stock from "./components/Stock";
import Remitos from "./components/Remitos";
import StockCongelados from "./components/StockCongelados";
import Clientes from "./components/Clientes";
import Precios from "./components/Precios";
import VerStock from "./components/Clientes/VerStock";
import Altas from "./components/Clientes/Altas";
import Bajas from "./components/Clientes/Bajas";
import RemitosDeVenta from "./components/Clientes/RemitosDeVenta";
import CargarStock from "./components/Clientes/CargarStock";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/stock-congelados" element={<StockCongelados />} />
      <Route path="/remitos" element={<Remitos />} />
      <Route path="/precios" element={<Precios />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/ver-stock" element={<VerStock />} />
      <Route path="/clientes/altas" element={<Altas />} />
      <Route path="/clientes/bajas" element={<Bajas />} />
      <Route path="/clientes/remitos-de-venta" element={<RemitosDeVenta />} />
      <Route path="/clientes/cargar-stock" element={<CargarStock />} />
    </Routes>
  );
};

export default App;
