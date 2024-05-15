import React from "react";
import "./AddDepartment.css";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { hideAddDepartmentWindow } from "../../State/WindowsStates";
import { useState } from "react";
import { addDepartment } from "../../State/DepartmentState";

function AddDepartment() {
  const addDepartmentWindow = useSelector(
    (state) => state.windows.addDepartment
  );
  const dispatch = useDispatch();
  const [departmentName, setDepartmentName] = useState("");

  const handleInputChange = (event) => {
    setDepartmentName(event.target.value);
  };
  return (
    <div
      className={`ao-container d-flex flex-column align-items-center position-absolute py-2  ${
        addDepartmentWindow ? "ad-active" : ""
      }`}
    >
      <div className="ae-title ">
        <IoMdClose
          className="ae-close"
          onClick={() => dispatch(hideAddDepartmentWindow())}
        />
        <div>Add Department</div>
      </div>
      <form className="ao-form d-flex flex-column">
        <div className="d-flex flex-column ae-input">
          <label htmlFor="name">Department name</label>
          <input
            name="name"
            placeholder="Department name"
            value={departmentName}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="ao-form-submit"
          type="submit"
          disabled={!departmentName.trim()}
          onClick={() => dispatch(addDepartment(departmentName))}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
