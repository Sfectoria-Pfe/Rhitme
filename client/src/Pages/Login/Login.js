import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [admin, setAdmin] = useState(true);
  const [employee, setEmployee] = useState(false);
  const [seepassword, setSeepassword] = useState(false);
  const inputRef = useRef(null);
  const handlePasswordType = () => {
    setSeepassword(!seepassword);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className="vh-100 d-flex flex-column align-items-center justify-content-between"
      style={{ backgroundColor: "white" }}
    >
      <div className="l-g-container"></div>
      <div className="container mt-4 ">
        <div className="row justify-content-lg-between justify-content-md-between justify-content-center align-items-center">
          <div className="l-page-title col-7 text-sm-start text-center mb-3 mb-sm-0">
            SFECTORIA HR
          </div>
          <div className="l-role col-2">
            <button
              className={admin === true ? "l-checked" : "l-inchecked"}
              onClick={() => {
                setAdmin(true);
                setEmployee(false);
              }}
            >
              Admin
            </button>
            <button
              className={employee === true ? "l-checked" : "l-inchecked"}
              onClick={() => {
                setAdmin(false);
                setEmployee(true);
              }}
            >
              Employee
            </button>
          </div>
        </div>
      </div>

      <div className="l-container mt-4 mt-sm-0 border">
        <h1 className="l-title ">Welcome back !</h1>
        <form className="l-form d-flex flex-column align-items-center">
          <div className="l-mail d-flex flex-column">
            <label htmlFor="email ">E-mail</label>
            <MdOutlineEmail className="l-email-icon" />
            <input
              ref={inputRef}
              placeholder="Enter your e-mail"
              type="text"
              className={"l-email"}
              id="email"
            />
          </div>
          <div className="l-pass d-flex flex-column">
            <div className="d-flex justify-content-between">
              <label htmlFor="password">Password</label>
              {seepassword === false ? (
                <FaRegEyeSlash
                  className="see-password "
                  onClick={handlePasswordType}
                />
              ) : (
                <FaRegEye
                  className="see-password"
                  onClick={handlePasswordType}
                />
              )}
            </div>

            <MdOutlinePassword className="l-password-icon" />
            <input
              placeholder="Enter your password"
              type={seepassword ? "text" : "password"}
              className="l-password"
              id="password"
            />

            <p className="l-fpass align-self-end">Forget password ?</p>
          </div>

          <button type="submit" className="l-submit w-50 mb-3">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
