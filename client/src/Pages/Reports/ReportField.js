import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reports.css";
import { Link } from "react-router-dom";
import pic from "./picture1.jpg";

function ReportField({ name, title, id, date }) {
  return (
    <div className="r-field container ">
      <div className="row d-flex justify-content-around w-100 align-items-center r-fieldrow pb-2">
        <div className="col-md-1 d-flex justify-content-center my-1">
          <img src={pic} alt="Profile" />
        </div>

        <div className="r-info col-md-3 my-1 text-center">{name}</div>
        <div className="r-info col-md-4 text-wrap my-1 text-center">
          {title}
        </div>
        <div className="r-date r-info col-md-2 my-1 text-center">{date}</div>
        <Link
          to={`reportdetails/${id}`}
          className="r-details r-info  col-5 col-md-1 my-1 text-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default ReportField;
