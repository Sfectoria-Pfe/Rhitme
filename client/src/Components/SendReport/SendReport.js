import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { hideSendReportWindow } from "../../State/WindowsStates";
import { fetchEmployees } from "../../State/EmployeesState";
import Accordion from "react-bootstrap/Accordion";
import { createReport } from "../../State/ReportsState";

function SendReport() {
  const sendReport = useSelector((state) => state.windows.sendReport);
  const employees = useSelector((state) => state.employees.employees);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const status = useSelector((state) => state.employees.status);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employee_id = JSON.parse(localStorage.getItem("employee")).employee_id;
  const [newReport, setNewReport] = useState({
    employeeId: employee_id,
    title: "",
    description: "",
    receiverId: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
    if (name === "description") {
      handleTextareaHeight(event);
    }
  };

  const handleTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleEmployeeClick = (employeeId, employeePhoto, employeeName) => {
    setNewReport((prevReport) => ({
      ...prevReport,
      receiverId: employeeId,
    }));
    setSelectedEmployee({ photo: employeePhoto, name: employeeName });
    setAccordionOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { employeeId, title, description, receiverId } = newReport;
    dispatch(createReport({ employeeId, title, description, receiverId }));
    dispatch(hideSendReportWindow());
    setSelectedEmployee(null);
    window.location.reload();
  };

  return (
    <div
      className={`ao-container d-flex flex-column align-items-center position-absolute py-2  ${
        sendReport ? "ad-active" : ""
      }`}
    >
      <div className="ae-title ">
        <IoMdClose
          className="ae-close"
          onClick={() => dispatch(hideSendReportWindow())}
        />
        <div>New Report</div>
      </div>
      <form className="ao-form d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="title">Report title</label>
          <input
            id="title"
            name="title"
            placeholder="Report title"
            value={newReport.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="description"
            placeholder="Description"
            value={newReport.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex ae-input flex-column align-items-center">
          <label htmlFor="title">
            If reporting an employee, please select him/her
          </label>
          <Accordion
            style={{
              width: "300px",
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
                        "Employees"
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
                      key={employee.employee_id}
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
        <button
          className="ao-form-submit mt-2"
          type="submit"
          disabled={!newReport.title || !newReport.description}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default SendReport;
