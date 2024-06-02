import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";
import stockData from "../../data/stockData.json";

const Stock = () => {
  const [data, setData] = useState(stockData);
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
    setDropdownVisible(false);
  };

  const handleSortByValueDescending = () => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    setData(sortedData);
    setDropdownVisible(false);
  };

  const handleSortByValueAscending = () => {
    const sortedData = [...data].sort((a, b) => a.value - b.value);
    setData(sortedData);
    setDropdownVisible(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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

      <div className="dropdown no-print">
        <button className="dropbtn no-print" onClick={toggleDropdown}>
          Opciones de Ordenamiento
        </button>
        {dropdownVisible && (
          <div className="dropdown-content no-print">
            <button onClick={handleSortByKey}>Ordenar por Producto</button>
            <button onClick={handleSortByValueDescending}>
              Ordenar por Unidades (Descendente)
            </button>
            <button onClick={handleSortByValueAscending}>
              Ordenar por Unidades (Ascendente)
            </button>
            <button onClick={handlePrint}>Imprimir Tabla</button>
          </div>
        )}
      </div>

      <div className="filter no-print">
        <label>
          <input
            type="checkbox"
            checked={showLowValue}
            onChange={toggleShowLowValue}
          />
          Mostrar solo productos con valores menores a 10
        </label>
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
