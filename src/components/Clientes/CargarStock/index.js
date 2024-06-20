import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../../assets/cerrar-sesion.png";

const CargarStock = () => {
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
          <Link to="/clientes" className="link">
            Cargar Stock
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
    </div>
  );
};

export default CargarStock;
