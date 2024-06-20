import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";
import axios from "axios";

const StockCongelados = () => {
  const [data, setData] = useState([]);
  const [showLowValue, setShowLowValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/stock-froozen")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSortByKey = () => {
    const sortedData = [...data].sort((a, b) =>
      isAscending
        ? a.productName.localeCompare(b.productName)
        : b.productName.localeCompare(a.productName)
    );
    setData(sortedData);
    setIsAscending(!isAscending);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) => {
    const lowerProductName = item.productName.toLowerCase();
    const matchesSearch = lowerProductName.includes(searchTerm);
    const hasLowUnits = item.unitsFresh < 10 || item.unitsFroozen < 10;

    return matchesSearch && (!showLowValue || hasLowUnits);
  });

  return (
    <div className="stock-froozen">
      <nav className="navbar">
        <div className="logo no-print">Logo</div>
        <h1 className="section-title">
          <Link to="/home" className="link">
            Stock Congelados
          </Link>
        </h1>

        <ul className="nav-links no-print">
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filter-buttons">
          <button className="filter-btn" onClick={handleSortByKey}>
            Ordenar {isAscending ? "A - Z" : "Z - A"}
          </button>
          <button className="filter-btn" onClick={handlePrint}>
            Imprimir
          </button>
        </div>

        <div className="checkbox-container">
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
        {filteredData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="titleProductName-column">Productos</th>
                <th className="units-column">Unidades</th>
                <th className="titleBarcode-column">Codigo de Barra</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="productName-column">{item.productName}</td>
                  <td
                    className={`units-column ${
                      item.unitsFroozen < 10 ? "low-units" : ""
                    }`}
                  >
                    {item.unitsFroozen}
                  </td>
                  <td className="barcode-column">{item.barcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            El producto no está cargado en la base de datos.
          </div>
        )}
      </div>
    </div>
  );
};

export default StockCongelados;
