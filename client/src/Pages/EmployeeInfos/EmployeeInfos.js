import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VscGistSecret } from "react-icons/vsc";
import { MdDelete, MdEmojiEmotions } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import picture from "./download.jpg";
import "./EmployeeInfos.css";
import PasswordReveal from "../../Components/EmployeesCRUD.js/PasswordReveal/PasswordReveal";
import DeleteEmployee from "../../Components/EmployeesCRUD.js/DeleteEmployee/DeleteEmployee";
import { useSelector, useDispatch } from "react-redux";
import {
  showPasswordWindow,
  hidePasswordWindow,
} from "../../State/revealePasswordState";
import {
  hideDeleteWindow,
  showDeleteWindow,
} from "../../State/deleteEmployeeState";
import api from "../../api";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeInfos() {
  const id = useParams();
  const password = useSelector((state) => state.password.password);
  const deletee = useSelector((state) => state.delete.delete);
  const dispatch = useDispatch();
  const [employeeInfos, setEmployeeInfos] = useState({});

  const CapFirst = (str) => {
    if (typeof str === "string" && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    }
    return "";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`users/${id.name}`);

        setEmployeeInfos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <>
      <PasswordReveal employeePassword="firas" adminPassword="admin" />
      <DeleteEmployee
        name={
          CapFirst(employeeInfos.firstName) +
          " " +
          CapFirst(employeeInfos.lastName)
        }
        adminPassword="firas"
      />
      <div
        className={`ei-container ${
          password || deletee ? "blur" : ""
        } d-flex flex-column`}
        onClick={() => {
          if (password) dispatch(hidePasswordWindow());
          if (deletee) dispatch(hideDeleteWindow());
        }}
      >
        <div className="ei-top container mt-4">
          <div className="row d-flex justify-content-between align-items-center ">
            <div className="ei-name col-12 col-md-3 d-flex justify-content-center ">
              {CapFirst(employeeInfos.firstName) +
                " " +
                CapFirst(employeeInfos.lastName)}
            </div>
            <div className="ei-functionalities col-12 mt-4 mt-md-0 col-md-9 col-xl-7 d-flex justify-content-md-around justify-content-between">
              <button
                className="ei-employees-password"
                style={
                  !password && !deletee
                    ? { cursor: "pointer" }
                    : { cursor: "auto" }
                }
                onClick={() => {
                  if (!password && !deletee) {
                    dispatch(showPasswordWindow());
                  }
                }}
              >
                <VscGistSecret className="ei-func-icon d-none d-sm-block" />
                <div className="ei-func-name">
                  Access to employee's password
                </div>
              </button>
              <button
                className="ei-delete-employee"
                style={
                  !password && !deletee
                    ? { cursor: "pointer" }
                    : { cursor: "auto" }
                }
                onClick={() => {
                  if (!deletee) {
                    dispatch(showDeleteWindow());
                  }
                }}
              >
                <MdDelete className="ei-func-icon d-none d-sm-block" />
                <div className="ei-func-name">Delete Employee</div>
              </button>
              <button className="ei-edit-employee">
                <MdEdit className="ei-func-icon d-none d-sm-block" />
                <div className="ei-func-name">Edit employee</div>
              </button>
            </div>
          </div>
        </div>
        <div className="ei-rank">
          <p>Rank</p>
          <h1>2</h1>
        </div>
        <div className="ei-infos-container container w-75">
          <div className="row d-flex align-items-center ">
            <div className="ei-photo-container col d-flex justify-content-center">
              <img src={picture} alt="Profile" className="ei-photo" />
            </div>
            <div className="ei-employee-infos col d-flex flex-column text-nowrap text-center mt-4">
              <p>{CapFirst(employeeInfos.gender)}</p>
              <p>Date of birth : 5/1/2001</p>
              <p>{`E-mail : ${employeeInfos.email}`}</p>
              <p>CIN : {employeeInfos.cin}</p>
              <p>Address : {employeeInfos.address}</p>
              <p>Job : {CapFirst(employeeInfos.job)}</p>
            </div>
          </div>
        </div>
        {/* <p>ktiba</p>
        <p>ktiba</p>

        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktiba</p>
        <p>ktibaqq</p> */}
      </div>
    </>
  );
}

export default EmployeeInfos;
