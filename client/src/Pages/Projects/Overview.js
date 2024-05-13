import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./Projects.css";
import EmployeeChange from "../EmployeeInfos/EmployeeInfosPages/EmployeeChange";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineChangeCircle } from "react-icons/md";
import Accordion from "react-bootstrap/Accordion";
import { MdOutlineCancel } from "react-icons/md";
import { updateProject } from "../../State/ProjectsState";

function Overview() {
  const { project } = useOutletContext();
  const [editableProject, setEditableProject] = useState(project);
  const [save, setSave] = useState(false);

  const employees = useSelector((state) => state.employees.employees);
  const [changeManager, setChangeManager] = useState(false);
  const dispatch = useDispatch();
  const onCancel = () => {
    setSave(false);
    setEditableProject(project);
  };
  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditableProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));

    setSave(true);
  };

  const onSave = () => {
    const updateData = {
      title: editableProject.title,
      description: editableProject.description,
      start: editableProject.start,
      end: editableProject.end,
      revenue: editableProject.revenue,
      manager: editableProject.manager_id,
      client: editableProject.client,
      delivered: editableProject.delivered,
    };
    console.log(updateData);

    dispatch(
      updateProject({ projectId: project.project_id, projectData: updateData })
    );
    setSave(false);
  };

  return (
    <div className="ps-3">
      <EmployeeChange save={save} onCancel={onCancel} onSave={onSave} />
      <div
        className="pi-section d-flex flex-column py-3 "
        style={{ borderTop: "none" }}
      >
        <div className="pi-section-content d-flex flex-column ">
          <div className="pi-content-single-info d-flex flex-column">
            <label htmlFor="description">Description</label>
            <textarea
              className="pro-ovr-textarea"
              id="description"
              value={editableProject.description}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>

          <div className="pi-section-group d-flex container m-0 p-0">
            <div className="row">
              <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                <label htmlFor="starting">Starts at</label>
                <input
                  id="starting"
                  type="date"
                  className="pro-ovr-date"
                  value={editableProject.start.slice(0, 10)}
                  onChange={(e) => handleChange(e, "start")}
                />
              </div>
              <div className="pi-content-info d-flex flex-column col ">
                <label htmlFor="ending">Ends at</label>
                <input
                  type="date"
                  className="pro-ovr-date"
                  id="ending"
                  value={editableProject.end.slice(0, 10)}
                  onChange={(e) => handleChange(e, "end")}
                />
              </div>
            </div>
          </div>

          <div className="pi-content-single-info d-flex flex-column">
            <label htmlFor="manager">Manager</label>
            <div className="d-flex  align-items-center" style={{ gap: "10px" }}>
              <div className="d-flex align-items-center task-ovr-manager px-3 py-1">
                <img
                  src={
                    employees.find(
                      (employee) =>
                        employee.employee_id === editableProject.manager_id
                    ).photo
                  }
                />
                {employees.find(
                  (employee) =>
                    employee.employee_id === editableProject.manager_id
                ).first_name +
                  " " +
                  employees.find(
                    (employee) =>
                      employee.employee_id === editableProject.manager_id
                  ).last_name}
              </div>
              {changeManager ? (
                <MdOutlineCancel
                  className="task-ass-change"
                  onClick={() => setChangeManager(false)}
                  style={{ fontSize: "150%" }}
                />
              ) : (
                <MdOutlineChangeCircle
                  className="task-ass-change"
                  onClick={() => setChangeManager(true)}
                  style={{ fontSize: "150%" }}
                />
              )}
            </div>
            {changeManager ? (
              <div>
                <Accordion
                  style={{
                    width: "300px",
                  }}
                >
                  <Accordion.Item eventKey="0" className="rr-accordion">
                    <Accordion.Header style={{ width: "100%" }}>
                      <div className="rr-top d-flex flex-column">
                        <div className=" d-flex align-items-center">
                          <div
                            style={{
                              fontSize: "90%",
                              fontWeight: "500",
                            }}
                          >
                            Select new manager for this project
                          </div>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="rr-accordion-body p-0 ">
                      <div className="mx-3">
                        {employees.map((employee) => (
                          <div
                            className="dep-head d-flex justify-content-start align-items-center py-2 my-1"
                            key={employee.employee_id}
                            style={{
                              gap: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setEditableProject((prevProject) => ({
                                ...prevProject,
                                manager_id: employee.employee_id,
                              }));

                              setSave(true);
                            }}
                          >
                            <img src={employee.photo} />
                            <div className="dep-head-name">
                              {employee.first_name + " " + employee.last_name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ) : null}
          </div>
          <div className="pi-section-group d-flex container m-0 p-0">
            <div className="row">
              <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                <label htmlFor="client">Client</label>
                <input
                  id="client"
                  value={editableProject.client}
                  onChange={(e) => handleChange(e, "client")}
                />
              </div>
              <div className="pi-content-info d-flex flex-column col ">
                <label htmlFor="ending">Revenue</label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "5px" }}
                >
                  <input
                    style={{ width: "100px" }}
                    min="0"
                    id="ending"
                    value={editableProject.revenue}
                    onChange={(e) => handleChange(e, "revenue")}
                  />
                  <span className="pro-input-span">DT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
