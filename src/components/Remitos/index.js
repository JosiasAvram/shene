import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";

const Remitos = () => {
  return (
    <div className="remitos">
      <nav className="navbar">
        <div className="logo">Logo de la Empresa</div>
        <h1 className="section-title">
          <Link to="/home" className="link">
            Remitos
          </Link>
        </h1>
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
    </div>
  );
};

export default Remitos;
