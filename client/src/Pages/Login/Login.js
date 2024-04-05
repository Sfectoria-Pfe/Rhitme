import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Lottie from "lottie-react";
import loginAnimation from "./Animation - 1710104365414.json";
import { Link } from "react-router-dom";

function Login() {
  const [seepassword, setSeepassword] = useState(false);
  const inputRef = useRef(null);
  const handlePasswordType = () => {
    setSeepassword(!seepassword);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="vh-100 d-flex flex-column justify-content-between position-relative overflow-x-hidden">
      <div className="l-g-container "></div>
      <div className=" mt-4 ">
        <Link
          to="/"
          className="l-page-title text-decoration-none align-self-start "
        >
          RHitm
        </Link>
      </div>

      <div className="l-container mt-4 mt-sm-0 border">
        <Lottie
          animationData={loginAnimation}
          loop={true}
          className="l-animation"
        />
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
