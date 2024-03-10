import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reports.css";
import ReportField from "./ReportField";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

function Reports() {
  const report = [
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
    <ReportField
      id="123"
      name="Firas Trabelsi"
      title="I can't fit in with the team I was placed in"
      date="02/02/2024"
    />,
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentReports = report.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="r-container d-flex flex-column my-4 ">
      <div className="r-title">
        <h1>Reports</h1>
      </div>
      <div className="e-sorting d-flex align-items-center align-self-end">
        <label hmtlfor="sort">SORT BY : </label>
        <select id="sort">
          <option value="name">Title</option>
          <option value="status">Employee name</option>
          <option value="job">Date</option>
        </select>
      </div>
      <div className="r-reports d-flex flex-column">{currentReports}</div>
      <ReactPaginate
        className={report.length <= postsPerPage ? "" : ""}
        activeClassName={"e-item e-current "}
        breakClassName={"e-item e-break-me "}
        breakLabel={"..."}
        containerClassName={"e-pagination d-flex align-self-center"}
        disabledClassName={"e-disabled-page"}
        marginPagesDisplayed={1}
        nextClassName={"e-item e-next "}
        nextLabel={
          <MdNavigateNext
            onClick={() =>
              currentPage < Math.ceil(report.length / postsPerPage)
                ? setCurrentPage(currentPage + 1)
                : setCurrentPage(currentPage)
            }
          />
        }
        pageCount={Math.ceil(report.length / postsPerPage)}
        pageClassName={"e-item e-pagination-page "}
        pageRangeDisplayed={1}
        previousClassName={"e-item e-previous"}
        previousLabel={
          <MdNavigateBefore
            onClick={() =>
              currentPage !== 1
                ? setCurrentPage(currentPage - 1)
                : setCurrentPage(currentPage)
            }
          />
        }
      />
    </div>
  );
}

export default Reports;
