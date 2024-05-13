import React from "react";
import "./Projects.css";
import { IoIosAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../State/ProjectsState";
import { useEffect, useState } from "react";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";
import Project from "./Project";
import { fetchTasks } from "../../State/TasksState";
import {
  hideAddProjectWindow,
  showAddProjectWindow,
} from "../../State/WindowsStates";
import AddProject from "../../Components/AddProject/AddProject";

function Projects() {
  const projects = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.fetchStatus);
  const dispatch = useDispatch();
  const addwindow = useSelector((state) => state.windows.addProject);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProjects());
  }, [status, dispatch]);

  return (
    <>
      <AddProject />
      <div
        className={`r-container d-flex flex-column my-4 align-items-center pb-5 ${
          addwindow ? "blur unselactable" : ""
        }`}
        onClick={() => {
          if (addwindow) dispatch(hideAddProjectWindow());
        }}
      >
        <div className="r-title align-self-start ">
          <h1>Projects</h1>
        </div>
        <button
          className="e-add d-flex align-items-center justify-content-around py-1 "
          style={{ width: "200px" }}
        >
          <IoIosAdd className="e-add-icon" />
          <div
            className="e-add-text"
            onClick={() => dispatch(showAddProjectWindow())}
          >
            Add New Project
          </div>
        </button>
        <div className="rec-offers container">
          <div className="row d-flex justify-content-center">
            {status === "loading" ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className=" col-5">
                    <LoadingShape
                      height="150px"
                      width="400px"
                      borderRadius="10px"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {projects.map((item) => (
                  <Project
                    item={item}
                    key={item.project_id}
                    tasks={item.tasks}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
