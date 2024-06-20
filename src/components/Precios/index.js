import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";
import axios from "axios";
import * as XLSX from "xlsx";

const Precios = () => {
  const [data, setData] = useState([]);
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
      .get("http://localhost:8000/price")
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

  const deleteCookie = () => {
    localStorage.removeItem("token");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const exportToExcel = () => {
    const exportData = data.map(({ productName, price }) => ({
      Producto: productName,
      Precio: price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Precios");

    XLSX.writeFile(workbook, "precios_excel.xlsx");
  };

  const filteredData = data.filter((item) => {
    const lowerProductName = item.productName.toLowerCase();
    const matchesSearch = lowerProductName.includes(searchTerm);

    return matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  return (
    <div className="price">
      <nav className="navbar">
        <div className="logo no-print">Logo</div>
        <h1 className="section-title">
          <Link to="/home" className="link">
            Precios
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
      </div>

      <div className="filter-buttons">
        <button className="filter-btn" onClick={handleSortByKey}>
          Ordenar {isAscending ? "A - Z" : "Z - A"}
        </button>
        <button className="filter-btn" onClick={handlePrint}>
          Imprimir
        </button>
        <button className="filter-btn" onClick={exportToExcel}>
          Exportar a Excel
        </button>
      </div>

      <div className="table-container">
        {filteredData.length > 0 ? (
          <table id="table-to-xls">
            <thead>
              <tr>
                <th className="titleProductName-column">Productos</th>
                <th className="title-price-column">Precio x Kilo</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="productName-column">{item.productName}</td>
                  <td className="price-column">{formatPrice(item.price)}</td>
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

export default Precios;
