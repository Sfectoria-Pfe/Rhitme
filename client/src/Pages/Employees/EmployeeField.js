import React from "react";
import { Link } from "react-router-dom";

function EmployeeField({ picture, name, job, active, id }) {
  return (
    <Link to={`employeeinfos/${id}`} className="e-field">
      <img src={picture} alt="Profile" />
      <h3 className="e-info">{name}</h3>
      <h3 className="e-info">{job}</h3>
      <h3 className={`e-status ${active ? "e-active" : "e-out"}`}>
        {active ? "Active" : "Out"}
      </h3>
    </Link>
  );
}

export default EmployeeField;
