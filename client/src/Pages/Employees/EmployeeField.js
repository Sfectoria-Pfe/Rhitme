import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";

function EmployeeField({ picture, name, job, active, id, status }) {
  const add = useSelector((state) => state.add.add);
  console.log(status);
  if (add) {
    return (
      <div className="e-field">
        <img src={picture} alt="Profile" />
        <h3 className="e-info">{name}</h3>
        <h3 className="e-info">{job}</h3>
        <h3 className={`e-status ${active ? "e-active" : "e-out"}`}>
          {active ? "Active" : "Out"}
        </h3>
      </div>
    );
  }

  return (
    <Link to={`../employeeInfos/${id}`} className="e-field">
      <img src={picture} alt="Profile" />
      <h3 className="e-info">{name}</h3>
      <h3 className="e-info">{job}</h3>
      <h3 className={`e-status ${active === "active" ? "e-active" : "e-out"}`}>
        {active === "active" ? "Active" : "Out"}
      </h3>
    </Link>
  );
}

export default EmployeeField;
