import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";

const Clientes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const deleteCookie = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <h1 className="section-title">
          <Link to="/home" className="link">
            Clientes
          </Link>
        </h1>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <img
                className="logout"
                src={Logout}
                alt="Cerrar Sesión"
                onClick={deleteCookie}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <h1>Steaks BBQ</h1>
      </div>
      <div className="section-button-container">
        <div className="big-button-container">
          <div className="big-button-container-info">
            <Link to="/clientes/ver-stock" className="big-button">
              <h1>Ver Stock</h1>
            </Link>
          </div>

          <div className="big-button-container-info">
            <Link to="/clientes/bajas" className="big-button">
              <h1>Bajas</h1>
            </Link>
          </div>

          <div className="big-button-container-info">
            <Link to="/clientes/altas" className="big-button">
              <h1>Altas</h1>
            </Link>
          </div>

          <div className="big-button-container-info">
            <Link to="/clientes/remitos-de-venta" className="big-button">
              <h1>Remito de Venta</h1>
            </Link>
          </div>

          <div className="big-button-container-info">
            <Link to="/clientes/cargar-stock" className="big-button">
              <h1>Cargar Stock</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
