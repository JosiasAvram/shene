import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import showPasswordIcon from "../../assets/ojo-show.png";
import hidePasswordIcon from "../../assets/ojo-hide.png";
import packagedMeat from "../../assets/carne-envasada.jpg";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then(function (response) {
        setAllUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleUserChange = (event) => {
    const sanitizedValue = event.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setUser(sanitizedValue);
    setIsUserValid(true);
    setUserError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkUser = (event) => {
    event.preventDefault();
    let userValid = false;
    let passwordValid = false;

    allUsers.forEach((u) => {
      if (u.loginUser === user) {
        userValid = true;
        if (u.password === password) {
          passwordValid = true;
        }
      }
    });

    if (!userValid) {
      setUserError("Usuario incorrecto");
    } else {
      if (!passwordValid) {
        setPasswordError("Contraseña incorrecta");
      }
    }

    if (userValid && passwordValid) {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      localStorage.setItem("token", token);
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <img
        className="background-img"
        src={packagedMeat}
        alt="Descripción de la imagen"
      />
      <div className="login-container">
        <form className="login-form" onSubmit={checkUser}>
          <h2>Login</h2>
          <div className={"form-group" + (userError ? " error" : "")}>
            <label htmlFor="user">Usuario:</label>
            <input
              type="text"
              id="user"
              name="user"
              required
              value={user}
              onChange={handleUserChange}
              className={!isUserValid ? "error" : ""}
            />
            {userError && <p className="error-message">{userError}</p>}
          </div>
          <div className={"form-group" + (passwordError ? " error" : "")}>
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
                className={!isPasswordValid ? "error" : ""}
              />
              <img
                className="password-toggle"
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={togglePasswordVisibility}
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
