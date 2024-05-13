import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { RiSuitcaseFill } from "react-icons/ri";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartment } from "../../../State/DepartmentState";
import EmployeeChange from "./EmployeeChange";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { updateEmployee } from "../../../State/EmployeesState";
import { changeEmployee } from "../../../State/EmployeesState";

function Job() {
  const { employee } = useOutletContext();
  const [editableEmployee, setEditableEmployee] = useState(employee);
  const departments = useSelector((state) => state.department.departments);
  const status = useSelector((state) => state.department.fetchDepartmentStatus);
  const [save, setSave] = useState(false);
  const [addSkill, setAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const dispatch = useDispatch();
  const onCancel = () => {
    setSave(false);
    setEditableEmployee(employee);
  };
  useEffect(() => {
    if (status === "idle" && employee) {
      dispatch(fetchDepartment());
    }
  }, [dispatch, status]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  const removeDeletedSkills = () => {
    const newSkills = editableEmployee.skills.filter((skill) =>
      employee.skills.includes(skill)
    );
    setEditableEmployee((prevEmployee) => ({
      ...prevEmployee,
      skills: newSkills,
    }));
  };

  const handleDeleteSkill = (index) => {
    const newSkills = editableEmployee.skills.filter((_, i) => i !== index);
    setEditableEmployee((prevEmployee) => ({
      ...prevEmployee,
      skills: newSkills,
    }));
    setSave(true);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditableEmployee((prevEmployee) => ({
      ...prevEmployee,
      [field]: value,
    }));
    setSave(true);
  };

  const onSave = () => {
    let updateData = {
      department_id: editableEmployee.department_id,
      first_name: editableEmployee.first_name,
      last_name: editableEmployee.last_name,
      phone: editableEmployee.phone,
      gender: editableEmployee.gender,
      birthday: editableEmployee.birthday,
      marital_status: editableEmployee.marital_status,
      cin: editableEmployee.cin,
      state: editableEmployee.address.state,
      city: editableEmployee.address.city,
      street: editableEmployee.address.street,
      zip: editableEmployee.address.zip,
      country: editableEmployee.address.country,
      email: editableEmployee.email,
      password: editableEmployee.password,
      job: editableEmployee.job,
      status: editableEmployee.status,
      photo: editableEmployee.photo,
      role_id: editableEmployee.role_id,
      salary: editableEmployee.salary,
      skills: editableEmployee.skills,
      last_opened: editableEmployee.last_opened,
    };
    dispatch(
      updateEmployee({
        employeeId: editableEmployee.employee_id,
        employeeData: updateData,
      })
    );
    dispatch(changeEmployee(editableEmployee));
    setSave(false);
  };

  return (
    <div className="pi-container w-100 mt-3 d-flex flex-column ">
      <EmployeeChange save={save} onCancel={onCancel} onSave={onSave} />

      <div className="pi-header d-flex align-items-center">
        <RiSuitcaseFill className="pi-header-icon" />
        <div className="pi-title">Job</div>
      </div>
      <div className="pi-section d-flex flex-column py-3">
        <div className="pi-section-content d-flex flex-column ">
          <div className="pi-content-single-info d-flex flex-column">
            <label htmlFor="status">Status</label>
            <input id="status" defaultValue={employee.status} readOnly />
          </div>
          <div className="pi-content-single-info d-flex flex-column">
            <label htmlFor="hire">Hire date</label>
            <input
              id="hire"
              defaultValue={formatDate(employee.created_at)}
              readOnly
            />
          </div>
          <div className="pi-section-group d-flex container m-0 p-0">
            <div className="row">
              <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                <label htmlFor="department">Department</label>
                <select
                  value={editableEmployee.department_id}
                  onChange={(e) => handleChange(e, "department_id")}
                >
                  {departments.map((item, index) => (
                    <option key={index} value={item.department_id}>
                      {item.department_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pi-content-info d-flex flex-column col ">
                <label htmlFor="position">Position</label>
                <input
                  id="position"
                  value={editableEmployee.job}
                  onChange={(e) => handleChange(e, "job")}
                />
              </div>
            </div>
          </div>
          <div className="pi-content-single-info d-flex flex-column w-100 ">
            <label htmlFor="">Skills</label>
            <div className="container mx-0 ">
              <div className="row d-flex j-skills ">
                {editableEmployee.skills.map((item, index) => (
                  <div
                    key={index}
                    className="j-skill col-3 d-flex  align-items-center"
                    readOnly
                  >
                    {item}
                    <div onClick={() => handleDeleteSkill(index)}>
                      <IoClose className="j-remove-skill" />
                    </div>
                  </div>
                ))}
                <div className="j-add-skill  d-flex align-items-center">
                  <IoIosAdd
                    className={`icon ${addSkill ? "j-x" : ""}`}
                    onClick={() =>
                      addSkill ? setAddSkill(false) : setAddSkill(true)
                    }
                  />
                  <div
                    className={` align-items-center j-add-input ${
                      addSkill ? "d-flex" : "d-none"
                    }`}
                  >
                    <input
                      placeholder="Type new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setEditableEmployee((prevEmployee) => ({
                          ...prevEmployee,
                          skills: [...prevEmployee.skills, newSkill],
                        }));
                        setNewSkill("");
                        setSave(true);
                      }}
                    >
                      Add skill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pi-content-single-info d-flex flex-column">
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              value={editableEmployee.salary}
              onChange={(e) => handleChange(e, "salary")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
