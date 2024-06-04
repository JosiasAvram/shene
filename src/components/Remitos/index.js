import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logout from "../../assets/cerrar-sesion.png";

const Remitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [productType, setProductType] = useState("alta");
  const [editingRemito, setEditingRemito] = useState(null);
  const [printRemito, setPrintRemito] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleAddProduct = () => {
    if (productCode.trim() === "") {
      alert("El código del producto no puede estar vacío");
      return;
    }
    setProducts([...products, { code: productCode, type: productType }]);
    setProductCode("");
  };

  const handleSaveRemito = () => {
    if (editingRemito !== null) {
      const updatedRemitos = remitos.map((remito) =>
        remito.id === editingRemito ? { ...remito, products } : remito
      );
      setRemitos(updatedRemitos);
    } else {
      setRemitos([...remitos, { id: Date.now(), products }]);
    }
    setProducts([]);
    setShowModal(false);
    setEditingRemito(null);
  };

  const handleDeleteProducts = () => {
    setProducts(products.filter((product) => !product.selected));
  };

  const toggleProductSelection = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].selected = !updatedProducts[index].selected;
    setProducts(updatedProducts);
  };

  const handleModifyRemito = (remito) => {
    setProducts(remito.products);
    setEditingRemito(remito.id);
    setShowModal(true);
  };

  const handlePrintRemito = (remito) => {
    setPrintRemito(remito);
    setTimeout(() => {
      window.print();
      setPrintRemito(null);
    }, 1000);
  };

  const deleteCookie = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="remitos">
      <nav className="navbar">
        <div className="logo no-print">Logo de la Empresa</div>
        <h1 className="section-title">
          <Link to="/home" className="link">
            Remitos
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

      <div className="remitos">
        <button onClick={() => setShowModal(true)}>Agregar Remito</button>
        <ul>
          {remitos.map((remito) => (
            <li key={remito.id}>
              <span>Remito ID: {remito.id}</span>
              <button onClick={() => handlePrintRemito(remito)}>
                Imprimir
              </button>
              <button onClick={() => handleModifyRemito(remito)}>
                Modificar
              </button>
              {printRemito && printRemito.id === remito.id && (
                <div className="print-area">
                  <h2>Remito ID: {remito.id}</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Código de Producto</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remito.products.map((product, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              product.type === "alta"
                                ? "lightgreen"
                                : "lightcoral",
                          }}
                        >
                          <td>{product.code}</td>
                          <td>{product.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setShowModal(false);
                setEditingRemito(null);
              }}
            >
              &times;
            </span>
            <table>
              <thead>
                <tr>
                  <th>Código de Producto</th>
                  <th>Tipo</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        product.type === "alta" ? "lightgreen" : "lightcoral",
                    }}
                  >
                    <td>{product.code}</td>
                    <td>{product.type}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={product.selected || false}
                        onChange={() => toggleProductSelection(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input
              type="number"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              placeholder="Código de Producto"
            />
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="alta">Alta</option>
              <option value="baja">Baja</option>
            </select>
            <button onClick={handleAddProduct}>Agregar Producto</button>
            <button onClick={handleDeleteProducts}>
              Eliminar Productos Seleccionados
            </button>
            <button onClick={handleSaveRemito}>Guardar Remito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Remitos;
