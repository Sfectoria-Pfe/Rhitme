import React, { useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { hideAddWindow, showAddWindow } from "../../State/addEmployeeState";
import { useSelector, useDispatch } from "react-redux";
import { hidePasswordWindow } from "../../State/revealePasswordState";
import { hideDeleteWindow } from "../../State/deleteEmployeeState";
import { hideReportReply } from "../../State/reportReply";
import { hideAddProjectWindow } from "../../State/WindowsStates";
import { IoPersonAdd } from "react-icons/io5";
import { hideAddOfferWindow } from "../../State/WindowsStates";
import { PiBuildingsFill } from "react-icons/pi";
import { FaProjectDiagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { hideTaskDetailsWindow } from "../../State/WindowsStates";
import { hideAddDepartmentWindow } from "../../State/WindowsStates";
import { hideAddTaskWindow } from "../../State/WindowsStates";

function Sidebar() {
  const sidebar = useSelector((state) => state.sidebar.sidebar);

  const dispatch = useDispatch();

  return (
    <div
      className={`s-container ${sidebar === true ? "d-none" : "d-flex"} ${
        sidebar === true ? "d-lg-flex" : "d-lg-none"
      } flex-column justify-content-between align-items-center py-5 `}
      onClick={() => {
        dispatch(hideDeleteWindow());
        dispatch(hidePasswordWindow());
        dispatch(hideAddWindow());
        dispatch(hideReportReply());
        dispatch(hideAddOfferWindow());
        dispatch(hideAddProjectWindow());
        dispatch(hideTaskDetailsWindow());
        dispatch(hideAddDepartmentWindow());
        dispatch(hideAddTaskWindow());
      }}
    >
      <ul className="d-flex flex-column">
        <NavLink
          className="s-link d-flex align-items-center justify-content-start"
          to=""
          end
        >
          <IoHome className="s-icon" />
          <div className="s-link-text ">Home</div>
        </NavLink>
        <NavLink
          className="s-link d-flex align-items-center justify-content-start"
          to="employees"
          end
        >
          <FaUsers className="s-icon" />
          <div className="s-link-text"> Employees</div>
        </NavLink>
        <NavLink
          className="s-link d-flex align-items-center justify-content-start"
          to="reports"
        >
          <BiSolidReport className="s-icon" />
          <div className="s-link-text"> Reports</div>
        </NavLink>
        <NavLink
          className="s-link d-flex align-items-center justify-content-start"
          to="recruitment"
        >
          <IoPersonAdd className="s-icon" />
          <div className="s-link-text">Recruitment</div>
        </NavLink>
        <NavLink
          className="s-link d-flex align-items-center justify-content-start"
          to="departments"
        >
          <PiBuildingsFill className="s-icon" />
          <div className="s-link-text"> Departments</div>
        </NavLink>
        <NavLink
          className="s-link d-flex align-items-center justify-content-start"
          to="projects"
        >
          <FaProjectDiagram className="s-icon" />
          <div className="s-link-text"> Projects</div>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
