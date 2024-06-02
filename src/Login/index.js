import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

// Importamos las imágenes de los ojos
import showPasswordIcon from "../assets/ojo-show.png";
import hidePasswordIcon from "../assets/ojo-hide.png";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUserChange = (event) => {
    setUser(event.target.value);
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
    let valid = true;
    if (user !== "josias") {
      setUserError("Usuario incorrecto");
      setIsUserValid(false);
      valid = false;
    }
    if (password !== "35531716") {
      setPasswordError("Contraseña incorrecta");
      setIsPasswordValid(false);
      valid = false;
    }
    if (valid) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login">
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
              className={!isUserValid ? 'error' : ''}
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
                className={!isPasswordValid ? 'error' : ''}
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
