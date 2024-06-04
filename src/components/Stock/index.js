import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";
import stockData from "../../data/stockData.json";

const Stock = () => {
  const [data, setData] = useState(stockData);
  const [showLowValue, setShowLowValue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSortByKey = () => {
    const sortedData = [...data].sort((a, b) => a.item.localeCompare(b.item));
    setData(sortedData);
  };

  const handleSortByValueDescending = () => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    setData(sortedData);
  };

  const handleSortByValueAscending = () => {
    const sortedData = [...data].sort((a, b) => a.value - b.value);
    setData(sortedData);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleShowLowValue = () => {
    setShowLowValue(!showLowValue);
  };

  const deleteCookie = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="stock">
      <nav className="navbar">
        <div className="logo no-print">Logo de la Empresa</div>
        <h1 className="section-title">
          <Link to="/home" className="link">
            Stock
          </Link>
        </h1>

        <ul className="nav-links no-print">
          <li>
            <Link className="no-print" to="/home">
              Inicio
            </Link>
          </li>
          <li>
            <Link className="no-print" to="/stock">
              Stock
            </Link>
          </li>
          <li>
            <Link className="no-print" to="/remitos">
              Remitos
            </Link>
          </li>
          <li>
            <Link to="/">
              <img
                className="logout no-print"
                src={Logout}
                alt="Cerrar Sesión"
                onClick={deleteCookie}
              />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="filter-container no-print">
        <div className="filter-buttons">
          <button className="filter-btn" onClick={handleSortByKey}>
            Ordenar A - Z
          </button>
          <button className="filter-btn" onClick={handleSortByValueDescending}>
            Ordenar 100 - 0
          </button>
          <button className="filter-btn" onClick={handleSortByValueAscending}>
            Ordenar 0 - 100
          </button>
          <button className="filter-btn" onClick={handlePrint}>
            Imprimir
          </button>
        </div>

        <div className="filter">
          <label>
            <input
              type="checkbox"
              checked={showLowValue}
              onChange={toggleShowLowValue}
            />
            Productos menores a 10
          </label>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="key-column">Productos</th>
              <th className="value-column">Unidades</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              if (showLowValue && item.value >= 10) {
                return null; // No renderizar la fila si showLowValue es true y el valor es mayor o igual a 10
              }
              return (
                <tr key={index}>
                  <td className="key-column">{item.item}</td>
                  <td
                    className={`value-column ${
                      item.value < 10 ? "low-value" : ""
                    }`}
                  >
                    {item.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
