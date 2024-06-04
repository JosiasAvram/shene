import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";
import axios from "axios";

const Stock = () => {
  const [data, setData] = useState([]);
  const [showLowValue, setShowLowValue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/stock")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleSortByKey = () => {
    const sortedData = [...data].sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    setData(sortedData);
  };

  const handleSortByValueDescending = () => {
    const sortedData = [...data].sort((a, b) => b.units - a.units);
    setData(sortedData);
  };

  const handleSortByValueAscending = () => {
    const sortedData = [...data].sort((a, b) => a.units - b.units);
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
              <th className="titleProductName-column">Productos</th>
              <th className="units-column">Unidades</th>
              <th className="titleBarcode-column">Codigo de Barra</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              if (showLowValue && item.units >= 10) {
                return null; // No renderizar la fila si showLowValue es true y el valor es mayor o igual a 10
              }
              return (
                <tr key={index}>
                  <td className="productName-column">{item.productName}</td>
                  <td
                    className={`units-column ${
                      item.units < 10 ? "low-units" : ""
                    }`}
                  >
                    {item.units}
                  </td>
                  <td className="barcode-column">{item.barcode}</td>
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
