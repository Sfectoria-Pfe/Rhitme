import { useState } from "react";
import "./AddTask.css";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { hideAddTaskWindow } from "../../State/WindowsStates";
import Accordion from "react-bootstrap/Accordion";
import { createTask } from "../../State/TasksState";

function AddTask({ project }) {
  const employees = useSelector((state) => state.employees.employees);
  const addTask = useSelector((state) => state.windows.addTask);
  const dispatch = useDispatch();
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newTask, setNewTask] = useState({
    project_id: project,
    employee_id: "",
    title: "",
    description: "",
    start: "",
    end: "",
    points: "",
    manager_approved: false,
    status: "upcoming",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    if (name === "description") {
      handleTextareaHeight(event);
    }
  };

  const handleEmployeeClick = (employeeId, employeePhoto, employeeName) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      employee_id: employeeId,
    }));
    setSelectedEmployee({ photo: employeePhoto, name: employeeName });
    setAccordionOpen(false);
  };

  const handleTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const isFormValid = () => {
    return (
      newTask.title.trim() !== "" &&
      newTask.start.trim() !== "" &&
      newTask.end.trim() !== "" &&
      newTask.description.trim() !== "" &&
      newTask.points.trim() !== "" &&
      newTask.employee !== ""
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newTask);
    dispatch(createTask(newTask));
    // setNewTask({
    //   project: project,
    //   employee: "",
    //   title: "",
    //   description: "",
    //   start: "",
    //   end: "",
    //   points: "",
    //   status: "upcoming",
    //   done_date: null,
    // });
    window.location.reload();
    setSelectedEmployee(null);
    setAccordionOpen(false);
    dispatch(hideAddTaskWindow());
  };

  console.log(newTask);
  return (
    <div
      className={`ao-container d-flex flex-column align-items-center position-absolute py-2  ${
        addTask ? "ad-active" : ""
      }`}
    >
      <div className="ae-title ">
        <IoMdClose
          className="ae-close"
          onClick={() => dispatch(hideAddTaskWindow())}
        />
        <div>Add Task</div>
      </div>
      <form className="ao-form d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex flex-column ae-input">
          <label htmlFor="title">Taks title</label>
          <input
            name="title"
            id="title"
            placeholder="Taks title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-7 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="start">Starting</label>
              <input
                type="date"
                id="start"
                name="start"
                value={newTask.start}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-7 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="end">Due date </label>
              <input
                type="date"
                id="end"
                name="end"
                value={newTask.end}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex flex-column ae-input ao-shared">
            <label htmlFor="points ">Points </label>
            <input
              id="points"
              name="points"
              placeholder="Points"
              min="0"
              style={{ width: "120px" }}
              value={newTask.points}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Accordion
              style={{
                width: "220px",
              }}
              activeKey={accordionOpen ? "0" : null}
            >
              <Accordion.Item eventKey="0" className="rr-accordion">
                <Accordion.Header
                  style={{ width: "100%" }}
                  onClick={() => setAccordionOpen(!accordionOpen)}
                >
                  <div className="rr-top d-flex flex-column">
                    <div className=" d-flex align-items-center">
                      <div
                        style={{
                          fontSize: "90%",
                          fontWeight: "500",
                        }}
                      >
                        {selectedEmployee ? (
                          <div
                            className="dep-head d-flex justify-content-start align-items-cente"
                            style={{ gap: "10px" }}
                          >
                            <img
                              src={selectedEmployee.photo}
                              alt="Selected Employee"
                              style={{ height: "30px", width: "30px" }}
                            />
                            <div className="dep-head-name d-flex align-items-center">
                              {selectedEmployee.name}
                            </div>
                          </div>
                        ) : (
                          "Assignee"
                        )}
                      </div>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body
                  className="rr-accordion-body p-0 "
                  style={{ height: "200px", overflowY: "scroll" }}
                >
                  <div className="mx-3">
                    {employees.map((employee) => (
                      <div
                        className="dep-head d-flex justify-content-start align-items-center py-2 my-1"
                        key={employee.user_id}
                        style={{
                          gap: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleEmployeeClick(
                            employee.employee_id,
                            employee.photo,
                            employee.first_name + " " + employee.last_name
                          )
                        }
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
        </div>
        <button
          className="ao-form-submit mt-2"
          type="submit"
          disabled={!isFormValid()}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTask;
