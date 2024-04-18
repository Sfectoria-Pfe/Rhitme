import React, { useEffect } from "react";
import { fetchProjectById } from "../../State/ProjectsState";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, Outlet } from "react-router-dom";
import { fetchTasksByProject } from "../../State/TasksState";
import { GrOverview } from "react-icons/gr";
import { CiViewBoard } from "react-icons/ci";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";
import { fetchEmployees } from "../../State/EmployeesState";
import TaskDetails from "./TaskDetails";
import { hideTaskDetailsWindow } from "../../State/WindowsStates";

function ProjectDetails() {
  const { id } = useParams();
  const project = useSelector((state) => state.projects.selectedProject);
  const projectStatus = useSelector((state) => state.projects.projectStatus);
  const tasks = useSelector((state) => state.tasks.tasksByProject);
  const tasksStatus = useSelector((state) => state.tasks.tasksByProjectStatus);
  const employees = useSelector((state) => state.employees.employees);
  const employeesStatus = useSelector((state) => state.employees.status);
  const taskDetails = useSelector((state) => state.windows.taskDetails.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employeesStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [employeesStatus, dispatch]);

  useEffect(() => {
    if (projectStatus === "idle" || project.project_id !== id) {
      dispatch(fetchProjectById(id));
    }
  }, [projectStatus, dispatch, id]);

  useEffect(() => {
    if (tasksStatus === "idle" || project.project_id !== id) {
      dispatch(fetchTasksByProject(id));
    }
  }, [tasksStatus, id, project, dispatch]);

  const classNameFunc = ({ isActive }) => (isActive ? "pd-active" : "pd-link");

  return (
    <>
      <TaskDetails />
      <div
        className={`pd-container d-flex flex-column mt-4 mb-4 pb-5 align-items-center ${
          taskDetails ? "blur unselactable" : ""
        }`}
        onClick={() => {
          if (taskDetails) {
            dispatch(hideTaskDetailsWindow());
          }
        }}
      >
        <div className="c-off-title">
          {projectStatus === "loading" ||
          project?.project_id !== id ||
          employeesStatus === "loading" ? (
            <LoadingShape height="20px" width="300px" borderRadius="10px" />
          ) : (
            project?.title
          )}
        </div>

        <div className="dp-content ">
          <div className=" pd-links d-flex align-items-center ps-5">
            <NavLink className={classNameFunc} to="" end>
              <GrOverview className="dp-link-icon" />
              <div>Overview</div>
            </NavLink>
            <NavLink className={classNameFunc} to="management">
              <CiViewBoard className="dp-link-icon" />
              <div>Management</div>
            </NavLink>
          </div>
          <div
            className="w-100 d-flex justify-content-center "
            style={{ minHeight: "60vh" }}
          >
            {projectStatus === "loading" ||
            project?.project_id !== id ||
            employeesStatus === "loading" ? (
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
              <div className="w-100">
                <Outlet context={{ project, tasks, employees }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
