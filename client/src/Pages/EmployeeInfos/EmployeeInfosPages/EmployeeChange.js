import React from "react";
import "./EmployeeInfosPages.css";
import { IoIosSave } from "react-icons/io";

function EmployeeChange({ save, onCancel, onSave }) {
  return (
    <div
      className={`ec-container d-flex px-4 align-items-center ${
        save ? "ec-active" : ""
      }`}
    >
      <button className="ec-change" onClick={onSave}>
        Save changes
        <IoIosSave className="icon" />
      </button>
      <div className="ec-cancel" onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
}

export default EmployeeChange;
