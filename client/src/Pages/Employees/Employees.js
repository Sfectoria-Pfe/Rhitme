import React, { useEffect } from "react";
import { useState } from "react";
import "./Employees.css";
import { CiSearch } from "react-icons/ci";
import EmployeeField from "./EmployeeField";
import picture from "./download.jpg";
import { IoIosAdd } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import p1 from "./picture1.jpg";
import p2 from "./picture2.jpg";
import p3 from "./picture3.jpg";
import p4 from "./picture4.jpg";
import p5 from "./picture5.jpg";
import api from "../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from "../../Components/EmployeesCRUD.js/AddEmployee/AddEmployee";
import { useSelector, useDispatch } from "react-redux";
import { showAddWindow, hideAddWindow } from "../../State/addEmployeeState";

function Employees() {
  const employees = [
    {
      picture: p5,
      name: "Ahmed Mohsen",
      job: "Graphic designer",
      status: true,
    },
    {
      picture: p1,
      name: "Firas Trabelsi",
      job: "Web developer",
      status: false,
    },
    {
      picture: p2,
      name: "Maria Ben Ahmed",
      job: "SCRUM master",
      status: true,
    },
    {
      picture: p3,
      name: "Youssef Takali",
      job: "Data analyst",
      status: true,
    },
    { picture: p4, name: "Zahra Salhi", job: "Web developer", status: true },
    {
      picture: p5,
      name: "Ali",
      job: "Graphic designer",
      status: true,
    },
    {
      picture: picture,
      name: "Ali",
      job: "Graphic designer",
      status: true,
    },
    {
      picture: picture,
      name: "Ali",
      job: "Graphic designer",
      status: true,
    },
    {
      picture: picture,
      name: "Mohsen",
      job: "Graphic designer",
      status: false,
    },
    { picture: picture, name: "Mohsen", job: "Graphic designer", status: true },
    {
      picture: picture,
      name: "Youssef",
      job: "Graphic designer",
      status: true,
    },
    { picture: picture, name: "Mohsen", job: "Graphic designer", status: true },
    {
      picture: picture,
      name: "Ali",
      job: "Graphic designer",
      status: true,
    },
  ];

  const add = useSelector((state) => state.add.add);
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  // const [employees, setEmployees] = useState([]);
  const [sortedby, setSortedby] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const Sort = (employees, sorting) => {
    if (sorting === "job") {
      employees.sort((a, b) => a.job.localeCompare(b.job));
    } else if (sorting === "name") {
      employees.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else employees.sort((a, b) => a.status.localeCompare(b.status));
    return employees;
  };
  const Filter = (employees, searchInput) => {
    if (searchInput.trim() === "") {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.job.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await api.get("/users");
  //       let filteredEmployees = Filter(response.data, searchInput);
  //       filteredEmployees = Sort(filteredEmployees, sortedby);
  //       setEmployees(filteredEmployees);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUsers();
  //   console.log(employees);
  // }, [sortedby, searchInput]);

  // Capitalize the first letter of a string
  const CapFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  const handleSorting = (event) => {
    setSortedby(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentEmployees = employees.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <AddEmployee />
      <div
        className={`e-container d-flex flex-column align-items-center ${
          add ? "blur" : ""
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
              console.log(add);
            } else {
              dispatch(hideAddWindow());
              console.log(add);
            }
          }}
        >
          <IoIosAdd className="e-add-icon" />
          <div className="e-add-text">Add Employee</div>
        </button>
        <div className="e-sorting d-flex align-items-center">
          <label hmtlfor="sort">SORT BY : </label>
          <select id="sort" value={sortedby} onChange={handleSorting}>
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="job">Occupation</option>
          </select>
        </div>
        <div className="employees-list">
          {currentEmployees.map((item, index) => (
            <EmployeeField
              key={index}
              id={item.id}
              name={item.name}
              job={item.job}
              active={item.status}
              picture={p1}
            />
          ))}
        </div>
        <ReactPaginate
          className={employees.length <= postsPerPage ? "" : ""}
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
                currentPage < Math.ceil(employees.length / postsPerPage)
                  ? setCurrentPage(currentPage + 1)
                  : setCurrentPage(currentPage)
              }
            />
          }
          pageCount={Math.ceil(employees.length / postsPerPage)}
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
    </>
  );
}

export default Employees;
