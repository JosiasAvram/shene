import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Stock from "./components/Stock";
import Remitos from "./components/Remitos";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/remitos" element={<Remitos />} />
    </Routes>
  );
};

export default App;
