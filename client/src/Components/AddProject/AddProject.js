import React from "react";
import "./AddProject.css";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { hideAddProjectWindow } from "../../State/WindowsStates";
import { useState, useEffect } from "react";
import { createProject } from "../../State/ProjectsState";

function AddProject() {
  const addProject = useSelector((state) => state.windows.addProject);
  const employeeId = JSON.parse(localStorage.getItem("employee")).employee_id;
  const dispatch = useDispatch();
  const initialFormData = {
    title: "",
    description: "",
    start: "",
    end: "",
    revenue: "",
    client: "",
    manager: employeeId,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!addProject) {
      setFormData(initialFormData);
    }
  }, [addProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "description") {
      handleTextareaHeight(e);
    }
    console.log(formData);
  };

  const handleTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const isEmpty = Object.values(formData).some(
    (fieldValue) => fieldValue === ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formData));
    window.location.reload();
    setFormData(initialFormData);
    dispatch(hideAddProjectWindow());
  };
  return (
    <div
      className={`ao-container d-flex flex-column align-items-center position-absolute py-2  ${
        addProject ? "ad-active" : ""
      }`}
    >
      <div className="ae-title ">
        <IoMdClose
          className="ae-close"
          onClick={() => dispatch(hideAddProjectWindow())}
        />
        <div>Add Project</div>
      </div>
      <form className="ao-form d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="title">Project title</label>
          <input
            id="title"
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="container">
          <div className="row d-flex justify-content-around">
            <div className="d-flex flex-column ae-input col-12 col-md-5 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="starting">Starts at</label>
              <input
                type="date"
                id="starting"
                name="start"
                value={formData.start}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-5 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="end">Ends at</label>
              <input
                type="date"
                id="ending"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex flex-column ae-input ">
            <label htmlFor="client">Client</label>
            <input
              id="client"
              name="client"
              placeholder="Client"
              value={formData.client}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-column ae-input ao-shared">
            <label htmlFor="revenue">Revenue</label>
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <input
                id="revenue"
                name="revenue"
                placeholder="Revenue"
                style={{ width: "100px" }}
                value={formData.revenue}
                onChange={handleChange}
              />
              <span>DT</span>
            </div>
          </div>
        </div>
        <button className="ao-form-submit" type="submit" disabled={isEmpty}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddProject;
