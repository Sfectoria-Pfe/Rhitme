import { useState } from "react";
import "./EmployeeInfosPages.css";
import { FaUserAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import EmployeeChange from "./EmployeeChange";
import { updateEmployee } from "../../../State/EmployeesState";
import { useDispatch } from "react-redux";
import { changeEmployee } from "../../../State/EmployeesState";

function Personal() {
  const { employee } = useOutletContext();
  const [editableEmployee, setEditableEmployee] = useState(employee);
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();

  console.log(employee);
  const onCancel = () => {
    setSave(false);
    setEditableEmployee(employee);
  };

  const updateAddress = (field, value) => {
    setEditableEmployee((prevEmployee) => ({
      ...prevEmployee,
      address: {
        ...prevEmployee.address,
        [field]: value,
      },
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

  const isSelected = (value1, value2) => {
    if (value1 === value2) {
      return "selected";
    }
    return "";
  };

  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

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

      <div className="pi-header d-flex align-items-center ">
        <FaUserAlt className="pi-header-icon" />
        <div className="pi-title">Personal</div>
      </div>
      <div>
        <div className="pi-section d-flex flex-column py-3">
          <div className="pi-section-title d-flex align-items-center">
            <FaAddressCard />
            <div>Basic information</div>
          </div>
          <div className="pi-section-content d-flex flex-column ">
            <div className="pi-section-group d-flex container m-0 p-0 ">
              <div className="row">
                <div className="pi-content-info d-flex flex-column col  mb-2 mb-sm-0">
                  <label htmlFor="firstname">First name</label>
                  <input
                    id="firstname"
                    value={editableEmployee.first_name}
                    onChange={(e) => handleChange(e, "first_name")}
                  />
                </div>
                <div className="pi-content-info d-flex flex-column col ">
                  <label htmlFor="lastname">Last name</label>
                  <input
                    id="lastname"
                    value={editableEmployee.last_name}
                    onChange={(e) => handleChange(e, "last_name")}
                  />
                </div>
              </div>
            </div>
            <div className="pi-section-group d-flex container m-0 p-0">
              <div className="row">
                <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                  <label htmlFor="birthday">Birth date</label>
                  <input
                    id="birthday"
                    defaultValue={formatDate(employee.birthday)}
                    readOnly
                  />
                </div>
                <label className="align-self-end col text-nowrap pb-2">
                  Age : {calculateAge(employee.birthday)}
                </label>
              </div>
            </div>
            <div className="pi-section-group d-flex container m-0 p-0">
              <div className="row">
                <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                  <label htmlFor="gender">Gender</label>
                  <input id="gender" defaultValue={employee.gender} readOnly />
                </div>
                <div className="pi-content-info d-flex flex-column col">
                  <label htmlFor="marital_status">Marital Status</label>
                  <select
                    id="marital_status"
                    value={editableEmployee.marital_status}
                    onChange={(e) => handleChange(e, "marital_status")}
                  >
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pi-content-single-info d-flex flex-column">
              <label htmlFor="cin">CIN</label>
              <input id="cin" defaultValue={employee.cin} readOnly />
            </div>
          </div>
        </div>
        <div className="pi-section d-flex flex-column py-3">
          <div className="pi-section-title d-flex align-items-center ">
            <FaHome />
            <div>Address</div>
          </div>
          <div className="pi-section-content d-flex flex-column ">
            <div className="pi-content-single-info d-flex flex-column">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                value={editableEmployee.address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
              />
            </div>
            <div className="pi-section-group d-flex container m-0 p-0">
              <div className="row ">
                <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    value={editableEmployee.address.city}
                    onChange={(e) => updateAddress("city", e.target.value)}
                  />
                </div>
                <div className="pi-content-info d-flex flex-column col mb-2 mb-sm-0">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    value={editableEmployee.address.state}
                    onChange={(e) => updateAddress("state", e.target.value)}
                  />
                </div>
                <div className="pi-content-info d-flex flex-column col">
                  <label htmlFor="zip">ZIP</label>
                  <input
                    id="zip"
                    value={editableEmployee.address.zip}
                    onChange={(e) => updateAddress("zip", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="pi-content-single-info d-flex flex-column">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                value={editableEmployee.address.country}
                onChange={(e) => updateAddress("country", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="pi-section d-flex flex-column py-3">
          <div className="pi-section-title d-flex align-items-center ">
            <MdOutlinePhoneIphone />
            <div>Contact</div>
          </div>
          <div className="pi-section-content d-flex flex-column ">
            <div className="pi-content-single-info d-flex flex-column">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                value={editableEmployee.phone}
                onChange={(e) => handleChange(e, "phone")}
              />
            </div>
            <div className="pi-content-single-info d-flex flex-column">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                value={editableEmployee.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;
