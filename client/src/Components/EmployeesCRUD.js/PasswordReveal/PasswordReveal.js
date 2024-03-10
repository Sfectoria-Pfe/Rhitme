import React, { useState, useEffect } from "react";
import "./PasswordReveal.css";
import { useSelector, useDispatch } from "react-redux";
import { hidePasswordWindow } from "../../../State/revealePasswordState";
import { IoMdClose } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function PasswordReveal({ employeePassword, adminPassword }) {
  const password = useSelector((state) => state.password.password);
  let pass = "";
  for (let i = 0; i < employeePassword.length; i++) {
    pass += "*";
  }
  const dispatch = useDispatch();
  const [seepassword, setSeepassword] = useState(false);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    setValue("");
    setIsValid(false);
  }, [password]);

  return (
    <div className={`pr-container ${password ? "pr-active" :''}`}>
      <IoMdClose
        className="pr-close"
        onClick={() => dispatch(hidePasswordWindow())}
      />
      <h1 className="pr-title">Employee's Password</h1>
      <div className="pr-form">
        <div className="pr-password">
          <label htmlFor="pr-password-input">Your password</label>
          <div className={`pr-input-field ${wrong ? "pr-wrong-password" : ""}`}>
            <input
              id="pr-password-input"
              className="pr-password-input"
              placeholder="Password"
              onChange={handleChange}
              type={seepassword ? "text" : "password"}
              value={value}
            />
            {seepassword === false ? (
              <FaRegEyeSlash
                className="pr-see-password "
                onClick={() => setSeepassword(!seepassword)}
              />
            ) : (
              <FaRegEye
                className="pr-see-password"
                onClick={() => setSeepassword(!seepassword)}
              />
            )}
          </div>
        </div>
        <button
          className="pr-reveal-button"
          onClick={() => {
            if (value === adminPassword) {
              setIsValid(true);
              setValue("");
            } else {
              setIsValid(false);
              setWrong(true);
              setValue("");
              setTimeout(() => {
                setWrong(false);
              }, 500);
            }
          }}
        >
          Reveal password
        </button>
      </div>
      <div className="pr-revealing-text">
        {`Employee's password : ${isValid ? employeePassword : pass}`}
      </div>
    </div>
  );
}

export default PasswordReveal;
