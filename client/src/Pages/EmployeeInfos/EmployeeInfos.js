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
  // const password = useSelector((state) => state.password.password);
  const deletee = useSelector((state) => state.delete.delete);
  const dispatch = useDispatch();
  const [employeeInfos, setEmployeeInfos] = useState({});

  useEffect(() => {
    return () => {
      if (deletee) {
        dispatch(hideDeleteWindow());
      }
    };
  }, [deletee, dispatch]);

  // const CapFirst = (str) => {
  //   if (typeof str === "string" && str.length > 0) {
  //     return str.charAt(0).toUpperCase() + str.substring(1);
  //   }
  //   return "";
  // };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await api.get(`users/${id.name}`);

  //       setEmployeeInfos(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUsers();
  // }, [id]);

  return (
    <>
      <DeleteEmployee name="Firas" adminPassword="firas" />
      <div
        className={`container ${deletee ? "blur" : ""}`}
        onClick={() => {
          if (deletee) dispatch(hideDeleteWindow());
        }}
      >
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div
                className=" text-white d-flex flex-row"
                style={{ backgroundColor: "#041b2a", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <img
                    src={picture}
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "150px", height: "150px", zIndex: 1 }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h5>Andy Horwitz</h5>
                  <p>New York</p>
                </div>
                <button
                  className="ei-delete-button"
                  onClick={() => {
                    if (!deletee) {
                      dispatch(showDeleteWindow());
                    }
                  }}
                >
                  <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </div>
              <div
                className="p-4 text-black container"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="row d-flex align-items-center justify-content-between py-3">
                  <div className="ei-buttons col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center  py-1">
                    <button
                      type="button"
                      className="mx-4 d-flex align-items-center "
                    >
                      <MdEdit className="ei-func-icon " />
                      <div className="ei-func-name">Edit profile</div>
                    </button>
                  </div>

                  <div className="ei-rendement d-flex justify-content-center justify-content-sm-end text-center col-12 col-sm-5 py-1">
                    <div>
                      <p className="mb-1 h5">5</p>
                      <p className="small text-muted mb-0">Rank</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">25</p>
                      <select className="small text-muted ">
                        <option>Current points</option>
                        <option>This year points</option>
                        <option>Total points</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="ei-employee-infos d-flex flex-column text-nowrap ">
                    <p>Male</p>
                    <p>Date of birth : 5/1/2001</p>
                    <p>E-mail: firas@gamil.com</p>
                    <p>CIN : 12541256</p>
                    <p>Address : Ariena</p>
                    <p>Job : asses</p>{" "}
                  </div>
                </div>
                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0">Recent photos</p>
                <p className="mb-0">
                  <a href="#!" className="text-muted">
                    Show all
                  </a>
                </p>
              </div>
              <div className="row g-2">
                <div className="col mb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
                <div className="col mb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
              </div>
              <div className="row g-2">
                <div className="col">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
                <div className="col">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <PasswordReveal employeePassword="firas" adminPassword="admin" />
    //   <DeleteEmployee
    //     name={
    //       CapFirst(employeeInfos.firstName) +
    //       " " +
    //       CapFirst(employeeInfos.lastName)
    //     }
    //     adminPassword="firas"
    //   />
    //   <div
    //     className={`ei-container  d-flex flex-column`}
    //
    //   >
    //     <div className="ei-top container mt-4">
    //       <div className="row d-flex justify-content-between align-items-center ">
    //         <div className="ei-name col-12 col-md-3 d-flex justify-content-center ">
    //           {CapFirst(employeeInfos.firstName) +
    //             " " +
    //             CapFirst(employeeInfos.lastName)}
    //         </div>
    //         <div className="ei-functionalities col-12 mt-4 mt-md-0 col-md-9 col-xl-7 d-flex justify-content-md-around justify-content-between">
    //           <button
    //             className="ei-employees-password"
    //             style={
    //               !password && !deletee
    //                 ? { cursor: "pointer" }
    //                 : { cursor: "auto" }
    //             }
    //             onClick={() => {
    //               if (!password && !deletee) {
    //                 dispatch(showPasswordWindow());
    //               }
    //             }}
    //           >
    //             <VscGistSecret className="ei-func-icon d-none d-sm-block" />
    //             <div className="ei-func-name">
    //               Access to employee's password
    //             </div>
    //           </button>
    //           <button
    //             className="ei-delete-employee"
    //             style={
    //               !password && !deletee
    //                 ? { cursor: "pointer" }
    //                 : { cursor: "auto" }
    //             }
    //
    //           >
    //             <MdDelete className="ei-func-icon d-none d-sm-block" />
    //             <div className="ei-func-name">Delete Employee</div>
    //           </button>
    //           <button className="ei-edit-employee">
    //             <MdEdit className="ei-func-icon d-none d-sm-block" />
    //             <div className="ei-func-name">Edit employee</div>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="ei-rank">
    //       <p>Rank</p>
    //       <h1>2</h1>
    //     </div>
    //     <div className="ei-infos-container container w-75">
    //       <div className="row d-flex align-items-center ">
    //         <div className="ei-photo-container col d-flex justify-content-center">
    //           <img src={picture} alt="Profile" className="ei-photo" />
    //         </div>
    //         <div className="ei-employee-infos col d-flex flex-column text-nowrap text-center mt-4">
    //           <p>{CapFirst(employeeInfos.gender)}</p>
    //           <p>Date of birth : 5/1/2001</p>
    //           <p>{`E-mail : ${employeeInfos.email}`}</p>
    //           <p>CIN : {employeeInfos.cin}</p>
    //           <p>Address : {employeeInfos.address}</p>
    //           <p>Job : {CapFirst(employeeInfos.job)}</p>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <p>ktiba</p>
    //     <p>ktiba</p>

    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktiba</p>
    //     <p>ktibaqq</p> */}
    //   </div>
    // </>
  );
}

export default EmployeeInfos;
