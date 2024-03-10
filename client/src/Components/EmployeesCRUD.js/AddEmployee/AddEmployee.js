import React from "react";
import "./AddEmployee.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { hideAddWindow } from "../../../State/addEmployeeState";

function AddEmployee() {
  const add = useSelector((state) => state.add.add);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    gender: "",
    cin: "",
    pnumber: "",
    address: "",
    job: "",
    department: "",
    email: "",
    photo: "",
    password: "",
  });
  const [fileName, setFileName] = useState("");
  const [seepassword, setSeepassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordType = () => {
    setSeepassword(!seepassword);
  };
  const handleConfirmPasswordType = () => {
    setSeeConfirmPassword(!seeConfirmPassword);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      setFormData({
        ...formData,
        photo: file,
      });
    }

    console.log(formData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const isFormEmpty = Object.values(formData).some((value) => value === "");
  const isPasswordMatch = formData.password === confirmPassword;

  return (
    <div
      className={`ae-container d-flex flex-column align-items-center position-absolute pt-2 w-sm-75 ${
        add ? "ae-active" : ""
      }`}
    >
      <div className="ae-title ">
        <IoMdClose
          className="ae-close "
          onClick={() => {
            dispatch(hideAddWindow());
            setFormData({
              firstname: "",
              lastname: "",
              birthday: "",
              gender: "",
              cin: "",
              pnumber: "",
              address: "",
              job: "",
              department: "",
              email: "",
              photo: "",
              password: "",
            });
          }}
        />
        <div>Create account</div>
      </div>
      <form className="ae-form d-flex flex-column" onSubmit={handleSubmit}>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                name="firstname"
                placeholder="First name"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                name="lastname"
                placeholder="Last name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-7 col-lg-6 px-0 px-md-1 px-lg-0">
              <label htmlFor="birthday">Date of birth</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-5 col-lg-4 px-0 px-md-1 px-lg-0">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="cin">CIN</label>
              <input
                id="cin"
                name="cin"
                placeholder="CIN"
                value={formData.cin}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="pnumber">Phone number</label>
              <input
                id="pnumber"
                name="pnumber"
                placeholder="Phone number"
                value={formData.pnumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-7 col-lg-6 px-0 px-md-1 px-lg-0">
              <label htmlFor="adrress">Address</label>
              <input
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-5 col-lg-4 px-0 px-md-1 px-lg-0">
              <label htmlFor="photo">Photo</label>
              <div className="ae-photo d-flex justify-content-center px-0">
                <MdOutlinePhotoLibrary className="ae-photo-icon  " />
                <label htmlFor="photo" className="w-75">
                  {fileName === "" ? "Import Photo" : fileName}
                </label>
              </div>
              <input
                type="file"
                id="photo"
                name="photo"
                className="d-none"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="job">Job</label>
              <input
                id="job"
                name="job"
                placeholder="Job"
                value={formData.job}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                <option value="Development">Development</option>
                <option value="Accounting">Accounting</option>
                <option value="HR management">HR management</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <label htmlFor="email">E-mail</label>
              <input
                type="e-mail"
                id="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column ae-input col-12 col-md-6 col-lg-5 px-0 px-md-1 px-lg-0">
              <div className="d-flex align-items-center w-100 justify-content-between">
                <label htmlFor="password">Password</label>
                {seepassword === false ? (
                  <FaRegEyeSlash
                    className="ae-see-password"
                    onClick={handlePasswordType}
                  />
                ) : (
                  <FaRegEye
                    className="ae-see-password"
                    onClick={handlePasswordType}
                  />
                )}
              </div>

              <input
                type={seepassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column ae-input w-md-50 align-self-lg-center">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <label htmlFor="cpassword">Confirm password</label>
            {seeConfirmPassword === false ? (
              <FaRegEyeSlash
                className="ae-see-password"
                onClick={handleConfirmPasswordType}
              />
            ) : (
              <FaRegEye
                className="ae-see-password"
                onClick={handleConfirmPasswordType}
              />
            )}
          </div>
          <input
            type={seeConfirmPassword ? "text" : "password"}
            id="cpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        <button
          type="submit"
          className="mt-4 mb-3"
          disabled={isFormEmpty || !isPasswordMatch}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
