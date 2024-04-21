import React from "react";
import "./Departments.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartment } from "../../State/DepartmentState";
import { fetchEmployees } from "../../State/EmployeesState";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import EmployeeChange from "../EmployeeInfos/EmployeeInfosPages/EmployeeChange";
import { IoIosAdd } from "react-icons/io";
import {
  showAddDepartmentWindow,
  hideAddDepartmentWindow,
} from "../../State/WindowsStates";
import AddDepartment from "../../Components/AddDepartment/AddDepartment";

function Departments() {
  const departements = useSelector((state) => state.department.departments);
  const departementStatus = useSelector(
    (state) => state.department.fetchDepartmentStatus
  );
  const employees = useSelector((state) => state.employees.employees);
  const employeesStatus = useSelector((state) => state.employees.status);
  const dispatch = useDispatch();
  const [editableDepartments, setEditableDepartments] = useState(departements);
  const [editName, setEditName] = useState(false);
  const [save, setSave] = useState(false);
  const addDepartment = useSelector((state) => state.windows.addDepartment);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const onCancel = () => {
    setSave(false);
    setEditableDepartments(departements);
    setEditName(false);
  };

  useEffect(() => {
    if (departementStatus === "idle") dispatch(fetchDepartment());
  }, [dispatch, departementStatus]);

  useEffect(() => {
    if (employeesStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [employeesStatus, dispatch]);

  useEffect(() => {
    if (departementStatus === "succeeded") {
      setEditableDepartments(departements);
    }
  }, [departementStatus, departements]);

  const handleDepartmentNameChange = (departmentId, newName) => {
    const updatedDepartments = [...editableDepartments];
    const departmentIndex = updatedDepartments.findIndex(
      (department) => department.department_id === departmentId
    );
    if (departmentIndex !== -1) {
      updatedDepartments[departmentIndex] = {
        ...updatedDepartments[departmentIndex],
        department_name: newName,
      };
      setEditableDepartments(updatedDepartments);
    }
  };

  const handleDepartmentHeadChange = (departmentId, newHead) => {
    const updatedDepartments = [...editableDepartments];
    const departmentIndex = updatedDepartments.findIndex(
      (department) => department.department_id === departmentId
    );
    if (departmentIndex !== -1) {
      updatedDepartments[departmentIndex] = {
        ...updatedDepartments[departmentIndex],
        department_head_id: newHead,
      };
      setEditableDepartments(updatedDepartments);

      setSave(true);
    }
  };

  return (
    <>
      <AddDepartment />
      <div
        className={`r-container d-flex flex-column my-4 align-items-center justify-content-center pb-5 ${
          addDepartment ? "blur unselactable" : ""
        }`}
        onClick={() => {
          if (addDepartment) dispatch(hideAddDepartmentWindow());
        }}
      >
        <EmployeeChange save={save} onCancel={onCancel} />
        {departementStatus === "loading" || employeesStatus === "loading" ? (
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
        ) : (
          <>
            <div className="r-title align-self-start">
              <h1>{departements?.length + " " + "Departments"}</h1>
            </div>
            <button
              className="e-add d-flex align-items-center justify-content-around py-1 "
              onClick={() => {
                dispatch(showAddDepartmentWindow());
              }}
              style={{ width: "190px" }}
            >
              <IoIosAdd className="e-add-icon" />
              <div className="e-add-text">Add Department</div>
            </button>
            <div className="dep-content container pb-5">
              <div
                className="row d-flex justify-content-around"
                style={{ gap: "20px" }}
              >
                {editableDepartments?.map((item) => (
                  <div
                    key={item.department_id}
                    className="col-md-5 col d-flex flex-column dep-department py-3"
                  >
                    <div className="d-flex align-items-center dep-name pb-2">
                      {editName ? (
                        <input
                          value={item.department_name}
                          onChange={(e) =>
                            handleDepartmentNameChange(
                              item.department_id,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <div>{item.department_name}</div>
                      )}

                      <button
                        className="editBtn"
                        onClick={() => {
                          setEditName(true);
                          setSave(true);
                        }}
                      >
                        <svg height="1em" viewBox="0 0 512 512">
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      className="ms-1 d-flex flex-column"
                      style={{ gap: "10px" }}
                    >
                      <div>
                        {item.department_head_id === null ? (
                          <div className="dep-no-head">
                            Department head has not yet been appointed
                          </div>
                        ) : (
                          <>
                            <div className="dep-head-title">
                              Department head{" "}
                            </div>
                            <Link
                              className="dep-head d-flex justify-content-around align-items-center py-1 my-1"
                              to={`../employeeInfos/${
                                employees.find(
                                  (employee) =>
                                    employee.user_id === item.department_head_id
                                )?.user_id
                              }`}
                            >
                              <img
                                src={
                                  employees.find(
                                    (employee) =>
                                      employee.user_id ===
                                      item.department_head_id
                                  )?.photo
                                }
                              />
                              <div className="dep-head-name">
                                {employees.find(
                                  (employee) =>
                                    employee.user_id === item.department_head_id
                                )?.first_name +
                                  " " +
                                  employees.find(
                                    (employee) =>
                                      employee.user_id ===
                                      item.department_head_id
                                  )?.last_name}
                              </div>
                              <div
                                className={`e-status ${
                                  employees.find(
                                    (employee) =>
                                      employee.user_id ===
                                      item.department_head_id
                                  )?.status === "active"
                                    ? "e-active"
                                    : "e-out"
                                }`}
                              >
                                {employees.find(
                                  (employee) =>
                                    employee.user_id === item.department_head_id
                                )?.status === "active"
                                  ? "Active"
                                  : "Out"}
                              </div>
                            </Link>
                          </>
                        )}
                      </div>

                      <div className="d-flex flex-column align-items-center">
                        <Accordion
                          style={{
                            width: "60%",
                          }}
                        >
                          <Accordion.Item eventKey="0" className="rr-accordion">
                            <Accordion.Header>
                              <div className="rr-top d-flex flex-column">
                                <div className=" d-flex align-items-center">
                                  <div
                                    style={{
                                      fontSize: "90%",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Select new department head
                                  </div>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body className="rr-accordion-body p-0 ">
                              <div className="mx-3">
                                {employees
                                  .filter(
                                    (employee) =>
                                      employee.department_id ===
                                        item.department_id &&
                                      employee.user_id !==
                                        item.department_head_id
                                  )
                                  .map((employee) => (
                                    <div
                                      className="dep-head d-flex justify-content-start align-items-center py-2 my-1"
                                      key={employee.user_id}
                                      style={{
                                        gap: "10px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleDepartmentHeadChange(
                                          item.department_id,
                                          employee.user_id
                                        )
                                      }
                                    >
                                      <img src={employee.photo} />
                                      <div className="dep-head-name">
                                        {employee.first_name +
                                          " " +
                                          employee.last_name}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <Accordion>
                        <Accordion.Item eventKey="0" className="rr-accordion">
                          <Accordion.Header className="rr-accordion-header ">
                            <div className="rr-top d-flex flex-column">
                              <div className="rr-infos d-flex align-items-center">
                                <div>
                                  {employees.filter(
                                    (employee) =>
                                      employee.department_id ===
                                        item.department_id &&
                                      employee.user_id !==
                                        item.department_head_id
                                  ).length +
                                    " " +
                                    (employees.filter(
                                      (employee) =>
                                        employee.department_id ===
                                          item.department_id &&
                                        employee.user_id !==
                                          item.department_head_id
                                    ).length === 1
                                      ? "employee"
                                      : "employees")}
                                </div>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="rr-accordion-body">
                            <div className="rr-report-content mx-3">
                              {employees
                                .filter(
                                  (employee) =>
                                    employee.department_id ===
                                      item.department_id &&
                                    employee.user_id !== item.department_head_id
                                )
                                .map((employee) => (
                                  <Link
                                    className="dep-head d-flex justify-content-around align-items-center py-2 my-1"
                                    to={`../employeeInfos/${employee.user_id}`}
                                    style={{
                                      borderBottom: "solid 1px #000000b4",
                                    }}
                                    key={employee.user_id}
                                  >
                                    <img src={employee.photo} />
                                    <div className="dep-head-name">
                                      {employee.first_name +
                                        " " +
                                        employee.last_name}
                                    </div>
                                    <div
                                      className={`e-status ${
                                        employee.status === "active"
                                          ? "e-active"
                                          : "e-out"
                                      }`}
                                    >
                                      {employee.status === "active"
                                        ? "Active"
                                        : "Out"}
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Departments;
