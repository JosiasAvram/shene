import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";

const Home = () => {
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
        <h1 className="section-title">Inicio</h1>
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
      <div className="big-button-container">
        <div className="big-button-container-info">
          <Link to="/stock" className="big-button">
            <h1>Stock Fresco</h1>
          </Link>
        </div>

        <div className="big-button-container-info">
          <Link to="/stock-congelados" className="big-button">
            <h1>Stock Congelados</h1>
          </Link>
        </div>

        <div className="big-button-container-info">
          <Link to="/remitos" className="big-button">
            <h1>Stock Productos Procesados</h1>
          </Link>
        </div>

        <div className="big-button-container-info">
          <Link to="/remitos" className="big-button">
            <h1>Precio por Kilo</h1>
          </Link>
        </div>

        <div className="big-button-container-info">
          <Link to="/remitos" className="big-button">
            <h1>Clientes</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
