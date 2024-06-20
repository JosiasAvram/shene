import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../../assets/cerrar-sesion.png";
import axios from "axios";

const Bajas = () => {
  const [data, setData] = useState([]);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [productsToUpdate, setProductsToUpdate] = useState({});
  const [showModal, setShowModal] = useState(false);
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
        console.log(error);
      });
  }, []);

  const deleteCookie = () => {
    localStorage.removeItem("token");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setScannedProducts([]); // Clear scanned products when closing the modal
    setProductsToUpdate({});
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

        setProductsToUpdate((prevState) => ({
          ...prevState,
          [product.id]: 1,
        }));
      } else {
        alert("Código de barras no encontrado:", scannedValue);
      }

      e.target.value = ""; // Clear input after processing
    }

    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  console.log(productsToUpdate);
  const handleSubmit = () => {
    // Aquí envías el objeto `productsToUpdate` al endpoint correspondiente
    axios
      .post("http://localhost:8000/stock/remove", productsToUpdate)
      .then((response) => {
        console.log("Stock actualizado", response.data);
        alert("stock modificado con exito");
        // Puedes realizar alguna acción después de la actualización, como cerrar el modal
        closeModal();
      })
      .catch((error) => {
        console.error("Error al actualizar el stock", error);
      });
  };

  return (
    <div className="bajas">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <h1 className="section-title">
          <Link to="/clientes" className="link">
            Bajas
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

      <div className="content">
        <button className="hacer-baja-btn" onClick={openModal}>
          Hacer Baja
        </button>

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
    </div>
  );
};

export default Bajas;
