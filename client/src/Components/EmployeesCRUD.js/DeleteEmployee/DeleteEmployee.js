import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideDeleteWindow } from "../../../State/deleteEmployeeState";
import "./DeleteEmployee.css";

function DeleteEmployee({ name, adminPassword }) {
  const deletee = useSelector((state) => state.delete.delete);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    setValue("");
  }, [deletee]);
  return (
    <div
      className={`de-container ${deletee ? "de-active" : ""}`}
      style={{ zIndex: "100000" }}
    >
      <h1 className="de-title">Delete {name}</h1>
      <div className="de-password">
        <label htmlFor="de-password-input">Your password</label>
        <div className={`de-input-field ${wrong ? "de-wrong-password" : ""}`}>
          <input
            id="de-password-input"
            className="de-password-input"
            placeholder="Password"
            onChange={handleChange}
            type="password"
            value={value}
          />
        </div>
      </div>
      <div className="de-check">
        <p>Are you sure you want to delete this employee ?</p>
        <div>
          <Link
            className="de-button-container"
            to={value === adminPassword ? "/dashboard/employees" : ""}
          >
            <button
              className="de-delete"
              onClick={() => {
                if (value === adminPassword) {
                  setValue("");
                  dispatch(hideDeleteWindow());
                } else {
                  setWrong(true);
                  setValue("");
                  setTimeout(() => {
                    setWrong(false);
                  }, 500);
                }
              }}
            >
              Delete
            </button>
          </Link>
          <button
            className="de-cancel"
            onClick={() => {
              dispatch(hideDeleteWindow());
              console.log(deletee);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteEmployee;
