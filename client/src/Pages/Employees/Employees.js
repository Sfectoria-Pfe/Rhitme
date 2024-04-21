import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import "./Employees.css";
import { CiSearch } from "react-icons/ci";
import EmployeeField from "./EmployeeField";
import { IoIosAdd } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from "../../Components/EmployeesCRUD.js/AddEmployee/AddEmployee";
import { useSelector, useDispatch } from "react-redux";
import { showAddWindow, hideAddWindow } from "../../State/addEmployeeState";
import { fetchEmployees, updateEmployees } from "../../State/EmployeesState";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";

function Employees() {
  const add = useSelector((state) => state.add.add);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const [sortedby, setSortedby] = useState("name");
  const [searchInput, setSearchInput] = useState("");

  const Sort = (employees, sorting) => {
    if (sorting === "job") {
      employees.sort((a, b) => a.job.localeCompare(b.job));
    } else if (sorting === "name") {
      employees.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sorting === "date") {
      employees.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sorting === "points") {
      employees.sort((a, b) => b.points - a.points);
    } else employees.sort((a, b) => a.status.localeCompare(b.status));
    return employees;
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const Filter = (employees, searchInput) => {
    if (searchInput.trim() === "") {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.job.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const handleSorting = (event) => {
    const selectedValue = event.target.value;
    setSortedby(selectedValue);

    const sortedEmployees = Sort([...employees], selectedValue);

    dispatch(updateEmployees(sortedEmployees));
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5;
  const lastPostIndex = (currentPage + 1) * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentEmployees = Filter(employees, searchInput).slice(
    firstPostIndex,
    lastPostIndex
  );

  return (
    <>
      <AddEmployee />
      <div
        className={`e-container d-flex flex-column align-items-center ${
          add ? "blur unselactable" : ""
        } d-flex flex-column mb-5`}
        onClick={() => {
          if (add) dispatch(hideAddWindow());
        }}
      >
        <div className="e-top container mt-3">
          <div className="row d-flex justify-content-sm-between w-100 justify-content-center">
            <h3 className="col-9 col-sm-4 col-lg-3 d-flex justify-content-center text-center">
              Employees
            </h3>
            <div className="e-search col-12 col-sm-7 col-lg-5 col-xl-4 col-md-6  d-flex align-items-center justify-content-sm-end justify-content-center">
              <input
                type="text"
                className="e-search-input"
                placeholder="Search"
                onChange={handleSearch}
                value={searchInput}
              />
              <CiSearch className="e-search-icon " />
            </div>
          </div>
        </div>
        <button
          className="e-add d-flex align-items-center justify-content-around py-1"
          onClick={() => {
            if (!add) {
              dispatch(showAddWindow());
            } else {
              dispatch(hideAddWindow());
            }
          }}
        >
          <IoIosAdd className="e-add-icon" />
          <div className="e-add-text">Add Employee</div>
        </button>
        <div className="e-sorting d-flex align-items-center align-self-end">
          <label hmtlfor="sort">SORT BY : </label>
          <select id="sort" value={sortedby} onChange={handleSorting}>
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="job">Occupation</option>
            <option value="date">Hiring date</option>
            <option value="points">Performance</option>
          </select>
        </div>
        <div className="employees-list">
          {status === "loading" ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="e-field">
                  <LoadingShape height="70px" width="70px" borderRadius="50%" />
                  <LoadingShape
                    height="20px"
                    width="150px"
                    borderRadius="7px"
                  />
                  <LoadingShape
                    height="20px"
                    width="150px"
                    borderRadius="7px"
                  />
                  <LoadingShape height="30px" width="60px" borderRadius="7px" />
                </div>
              ))}
            </>
          ) : (
            currentEmployees.map((item, index) => (
              <EmployeeField
                key={index}
                id={item.user_id}
                name={item.first_name + " " + item.last_name}
                job={item.job}
                active={item.status}
                picture={item.photo}
                status={status}
              />
            ))
          )}
        </div>
        {status !== "succeeded" || employees.length <= postsPerPage ? (
          <div style={{ height: "70px" }}></div>
        ) : (
          <ReactPaginate
            onPageChange={handlePageClick}
            activeClassName={"e-item e-current "}
            breakClassName={"e-item e-break-me "}
            breakLabel={"..."}
            containerClassName={"e-pagination d-flex my-5"}
            disabledClassName={"e-disabled-page"}
            marginPagesDisplayed={1}
            nextClassName={"e-item e-next "}
            nextLabel={
              <MdNavigateNext
                onClick={() =>
                  currentPage < Math.ceil(employees.length / postsPerPage) - 1
                    ? setCurrentPage(currentPage + 1)
                    : setCurrentPage(currentPage)
                }
                style={{ color: "#041b2a" }}
              />
            }
            pageCount={Math.ceil(employees.length / postsPerPage)}
            pageClassName={"e-item e-pagination-page "}
            pageRangeDisplayed={1}
            previousClassName={"e-item e-previous"}
            previousLabel={
              <MdNavigateBefore
                onClick={() =>
                  currentPage !== 0
                    ? setCurrentPage(currentPage - 1)
                    : setCurrentPage(currentPage)
                }
                style={{ color: "#041b2a" }}
              />
            }
          />
        )}
      </div>
    </>
  );
}

export default Employees;
