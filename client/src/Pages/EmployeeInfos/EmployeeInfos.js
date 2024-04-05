import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { GiRank3 } from "react-icons/gi";
import "./EmployeeInfos.css";
import DeleteEmployee from "../../Components/EmployeesCRUD.js/DeleteEmployee/DeleteEmployee";
import {
  hideDeleteWindow,
  showDeleteWindow,
} from "../../State/deleteEmployeeState";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeeById } from "../../State/EmployeeState";
import { fetchDepartmentById } from "../../State/DepartmentState";
import { fetchEmployees } from "../../State/EmployeesState";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";
import Lottie from "lottie-react";
import Birthday from "./Birthday.json";

function EmployeeInfos() {
  const { id } = useParams();
  const employee = useSelector((state) => state.employee.selectedEmployee);
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employee.status);
  const error = useSelector((state) => state.employee.error);
  const deletee = useSelector((state) => state.delete.delete);
  const selectedDepartment = useSelector(
    (state) => state.department.selectedDepartment
  );
  const dispatch = useDispatch();

  function getEmployeeRank(employeeId, employees) {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const sortedEmployees = [...employees].sort(
      (a, b) => b.monthly_points[currentMonth] - a.monthly_points[currentMonth]
    );
    const employeeIndex = sortedEmployees.findIndex(
      (employee) => employee.user_id === employeeId
    );
    const rank = employeeIndex + 1;

    let suffix = "th";
    if (rank === 1) {
      suffix = "st";
    } else if (rank === 2) {
      suffix = "nd";
    } else if (rank === 3) {
      suffix = "rd";
    }

    return `${rank}${suffix}`;
  }

  const isBirthday = (birthdayString) => {
    const birthday = new Date(birthdayString);
    const today = new Date();

    return (
      birthday.getDate() === today.getDate() &&
      birthday.getMonth() === today.getMonth()
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  function dateDiff(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    const diffInMilliseconds = Math.abs(today - date);
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const remainingDays = diffInDays % 30;
    const diffInYears = Math.floor(diffInMonths / 12);
    const remainingMonths = diffInMonths % 12;

    const parts = [];
    if (diffInYears > 0) {
      parts.push(`${diffInYears} y`);
    }
    if (remainingMonths > 0) {
      parts.push(`${remainingMonths} m`);
    }
    if (remainingDays > 0) {
      parts.push(`${remainingDays} d`);
    }

    return parts.join(" - ");
  }

  useEffect(() => {
    if (status === "idle" || employee?.user_id !== id) {
      dispatch(fetchEmployeeById(id));
    }
    if (employee && employee.department_id) {
      dispatch(fetchDepartmentById(employee.department_id));
    }
    if (employee) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status, id, employee]);

  useEffect(() => {
    return () => {
      if (deletee) {
        dispatch(hideDeleteWindow());
      }
    };
  }, [deletee, dispatch]);

  const classNameFunc = ({ isActive }) => (isActive ? "ei-active" : "ei-link");
  return (
    <>
      <DeleteEmployee name="Firas" adminPassword="firas" />
      <div className="ei-container d-flex flex-column align-items-center">
        <div className="w-100  container-fluid">
          <div className="ei-header d-flex row px-4">
            <div className="ei-photo col-12 col-lg-2 mb-4 mb-lg-0 ">
              {status === "loading" ? (
                <LoadingShape
                  height="180px"
                  width="180px"
                  borderRadius="50%"
                  className="ei-photo-shape"
                />
              ) : (
                <img src={employee ? employee.photo : null} />
              )}
            </div>
            <div className=" d-flex flex-column ei-header-functionalities col-12 col-lg-9 ">
              <div className="ei-header-content container">
                <div className="row d-flex align-items-center">
                  <div
                    className="col-12 col-lg-6 align-items-center mb-2 mb-lg-0 align-items-lg-start ei-header-infos d-flex flex-column"
                    style={{ gap: status === "loading" ? "10px" : "0px" }}
                  >
                    <div className="ei-header-name">
                      {status === "loading" ? (
                        <LoadingShape
                          height="20px"
                          width="250px"
                          borderRadius="5px"
                        />
                      ) : employee ? (
                        employee.first_name + " " + employee.last_name
                      ) : null}
                    </div>
                    <div className="ei-header-job">
                      {status === "loading" ? (
                        <LoadingShape
                          height="15px"
                          width="200px"
                          borderRadius="5px"
                        />
                      ) : employee ? (
                        employee.job
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="col-12 col-lg-6
                   justify-content-center justify-content-lg-end ei-header-buttons d-flex "
                  >
                    <button
                      className="ei-header-Btn"
                      style={{ width: "115px" }}
                    >
                      Delete
                      <MdDelete className="icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="ei-navs ">
                <div className="ei-links d-flex list-unstyled ">
                  <NavLink to="personal" className={classNameFunc}>
                    Personal
                  </NavLink>
                  <NavLink to="" className={classNameFunc} end>
                    Job
                  </NavLink>
                  <NavLink to="performance" className={classNameFunc}>
                    Performance
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ei-content d-flex">
          <div className="ei-side d-flex flex-column d-none d-lg-block">
            {status === "loading" ? (
              <LoadingShape height="0px" width="0px" borderRadius="8px" />
            ) : (
              employee && (
                <>
                  <div
                    className={`ei-side-birthday align-items-end ${
                      isBirthday(employee.birthday) ? "d-flex" : "d-none"
                    }`}
                  >
                    <div className="ei-birthday-icon">
                      <Lottie
                        animationData={Birthday}
                        loop={true}
                        className="ei-birthday-animation"
                      />
                    </div>
                    <div>
                      <div className="ei-birthday-wish">Happy Birthday !</div>
                      <div className="ei-birthday-today">Today</div>
                    </div>
                  </div>
                </>
              )
            )}

            <div className="ei-side-section">
              <div className="ei-side-info">
                {status === "loading" ? (
                  <LoadingShape
                    height="20px"
                    width="160px"
                    borderRadius="8px"
                  />
                ) : (
                  <>
                    <IoLocation className="ei-icon" />
                    <div>
                      {employee
                        ? employee.address.state +
                          ", " +
                          employee.address.country
                        : null}
                    </div>
                  </>
                )}
              </div>
              <div className="ei-side-info">
                {status === "loading" ? (
                  <LoadingShape
                    height="20px"
                    width="150px"
                    borderRadius="8px"
                  />
                ) : (
                  <>
                    <FaPhoneAlt className="ei-icon" />
                    <div>{employee ? employee.phone : null}</div>
                  </>
                )}
              </div>
              <div className="ei-side-info">
                {status === "loading" ? (
                  <LoadingShape
                    height="20px"
                    width="180px"
                    borderRadius="8px"
                  />
                ) : (
                  <>
                    <IoMail className="ei-icon" />
                    <div>{employee ? employee.email : null}</div>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="ei-side-section">
              {status === "loading" ? (
                <LoadingShape height="70px" width="180px" borderRadius="8px" />
              ) : (
                <div>
                  <div className="ei-side-hiring">Hire date</div>
                  <div className="ei-hire-date">
                    {employee ? formatDate(employee.created_at) : null}
                  </div>
                  <div className="ei-hire-period px-2">
                    {employee ? dateDiff(employee.created_at) + " ago" : null}
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className="ei-side-section">
              <div className="ei-side-info">
                {status === "loading" ? (
                  <LoadingShape
                    height="20px"
                    width="160px"
                    borderRadius="8px"
                  />
                ) : (
                  <>
                    <FaBuilding className="ei-icon" />
                    <div>
                      {selectedDepartment
                        ? selectedDepartment.department_name
                        : null}
                    </div>
                  </>
                )}
              </div>
              <div className="ei-side-info">
                {status === "loading" ? (
                  <LoadingShape
                    height="20px"
                    width="160px"
                    borderRadius="8px"
                  />
                ) : (
                  <>
                    <MdOutlineWork className="ei-icon" />
                    <div>{employee ? employee.job : null}</div>
                  </>
                )}
              </div>
              <div className="ei-side-info">
                {status === "loading" ? (
                  <LoadingShape
                    height="20px"
                    width="120px"
                    borderRadius="8px"
                  />
                ) : (
                  <>
                    <GiRank3 className="ei-icon" />
                    <div>
                      {employee && employees
                        ? getEmployeeRank(employee.user_id, employees)
                        : null}
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="ei-side-section">
              {status === "loading" ? (
                <LoadingShape height="70px" width="180px" borderRadius="8px" />
              ) : (
                <div>
                  <div className="ei-side-hiring">Current projects</div>
                  <li className="ei-hire-date px-2">Hr management</li>
                  <li className="ei-hire-date px-2">Hr management</li>
                  <li className="ei-hire-date px-2">Hr management</li>
                  <li className="ei-hire-date px-2">Hr management</li>
                </div>
              )}
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            {status === "succeeded" && selectedDepartment ? (
              <Outlet context={{ employee, selectedDepartment }} />
            ) : (
              <div className="spinner-container">
                <div className="spinner">
                  <div className="spinner">
                    <div className="spinner">
                      <div className="spinner">
                        <div className="spinner">
                          <div className="spinner"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeInfos;
