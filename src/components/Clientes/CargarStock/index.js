import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../../assets/cerrar-sesion.png";
import axios from "axios";

const CargarStock = () => {
  const [data, setData] = useState([]);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [productsToUpdate, setProductsToUpdate] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/client-stock")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setScannedProducts([]); // Clear scanned products when closing the modal
    setProductsToUpdate([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim().length > 0) {
      const scannedValue = e.target.value.trim();
      const product = data.find(
        (item) => item.barcode.toString() === scannedValue
      );

      if (product) {
        setScannedProducts((prevProducts) => [
          ...prevProducts,
          { id: product.id, productName: product.productName, units: 1 },
        ]);

        setProductsToUpdate((prevState) => [
          ...prevState,
          { id: product.id, units: 1 },
        ]);
      } else {
        alert("Código de barras no encontrado:", scannedValue);
      }

      e.target.value = ""; // Clear input after processing
    }

    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/client-stock/add", productsToUpdate)
      .then((response) => {
        alert("Stock añadido con éxito en client-stock");

        console.log(response);

        // Si necesitas realizar más acciones después de añadir el stock, puedes hacerlo aquí
        // Por ejemplo, cerrar el modal
        closeModal();
      })
      .catch((error) => {
        console.error("Error al añadir el stock en client-stock", error);
      });
  };

  return (
    <div className="cargar-stock">
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

      {/* Botón para abrir el modal */}
      <button className="cargar-stock-btn" onClick={openModal}>
        Cargar Stock
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Contenido del modal aquí...</p>
            <input
              type="text"
              placeholder="Escanea el código de barras o ingresa manualmente"
              onKeyDown={handleKeyDown}
            />
            {scannedProducts.length > 0 && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Productos</th>
                      <th>Unidades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scannedProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.productName}</td>
                        <td>{product.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={handleSubmit}>Actualizar Stock</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CargarStock;
