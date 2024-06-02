import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Stock from "../../assets/klipartz.com.png";
import Remito from "../../assets/pngegg.png";
import Logout from "../../assets/cerrar-sesion.png";

const Home = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">Logo de la Empresa</div>
        <h1 className="section-title">Inicio</h1>
        <ul className="nav-links">
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          <li>
            <Link to="/stock">Stock</Link>
          </li>
          <li>
            <Link to="/remitos">Remitos</Link>
          </li>
          <li>
            <Link to="/">
              <img className="logout" src={Logout} alt="Cerrar Sesión" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <h1>Bienvenido a Carnes Frescas S.A.</h1>
      </div>
      <div className="big-button-container">
        <div className="big-button-container-info">
          <h1>Stock</h1>
          <Link to="/stock" className="big-button">
            <img src={Stock} alt="Stock" />
          </Link>
        </div>
        <div className="big-button-container-info">
          <h1>Cargar Remito</h1>
          <Link to="/stock" className="big-button">
            <img src={Remito} alt="Stock" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
