import React from "react";
import "./AddOffer.css";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { hideAddOfferWindow } from "../../State/WindowsStates";
import { useState, useEffect } from "react";

function AddOffer() {
  const addOffer = useSelector((state) => state.windows.addOffer);
  const dispatch = useDispatch();
  const initialFormData = {
    title: "",
    summary: [""],
    skills: [""],
    experience: "",
    pay: "",
    job_type: "",
    workdays: "",
    description: "",
    urgent: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!addOffer) {
      setFormData(initialFormData);
    }
  }, [addOffer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "description") {
      handleTextareaHeight(e);
    }
  };

  const handleDynamicChange = (field, index, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: prevFormData[field].map((item, idx) =>
        idx === index ? value : item
      ),
    }));
  };

  const handleAddField = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...prevFormData[field], ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const isEmpty = Object.entries(formData).some(([fieldName, fieldValue]) => {
    if (fieldName === "urgent") {
      return false;
    }
    if (Array.isArray(fieldValue)) {
      return fieldValue.some((item) => item === "");
    }
    return fieldValue === "";
  });
  return (
    <div
      className={`ao-container d-flex flex-column align-items-center position-absolute py-2  ${
        addOffer ? "ae-active" : ""
      }`}
    >
      <div className="ae-title ">
        <IoMdClose
          className="ae-close"
          onClick={() => dispatch(hideAddOfferWindow())}
        />
        <div>Add Job Offer</div>
      </div>
      <form className="ao-form d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="title">Job title</label>
          <input
            id="title"
            name="title"
            placeholder="Job title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="summary">Summary</label>
          <div className="ao-dynamic-summ d-flex flex-column">
            {formData.summary.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) =>
                  handleDynamicChange("summary", index, e.target.value)
                }
                placeholder="Summary"
              />
            ))}
            <button type="button" onClick={() => handleAddField("summary")}>
              Add summary
            </button>
          </div>
        </div>
        <div className="d-flex flex-column ae-input ">
          <label htmlFor="skills">Required skills</label>
          <div className="ao-dynamic-skill d-flex flex-column container  pe-0">
            <div className="row">
              {formData.skills.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleDynamicChange("skills", index, e.target.value)
                  }
                  placeholder="Skill"
                  className="col-5"
                />
              ))}
            </div>
            <button type="button" onClick={() => handleAddField("skills")}>
              Add Skill
            </button>
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column ae-input ao-shared">
            <label htmlFor="exp">Experience</label>
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <input
                id="exp"
                name="experience"
                placeholder="Exp"
                type="number"
                min="0"
                style={{ width: "100px" }}
                value={formData.experience}
                onChange={handleChange}
              />
              <span>years</span>
            </div>
          </div>
          <div className="d-flex flex-column ae-input ao-shared">
            <label htmlFor="pay">Pay</label>
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <input
                id="pay"
                name="pay"
                placeholder="Pay"
                style={{ width: "100px" }}
                value={formData.pay}
                onChange={handleChange}
              />
              <span>DT</span>
            </div>
          </div>
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <div className="d-flex flex-column ae-input ao-shared">
            <label htmlFor="job-type">Job type</label>
            <input
              id="job-type"
              name="job_type"
              placeholder="Job type "
              value={formData.job_type}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-column ae-input ao-shared">
            <label htmlFor="workdays">Workdays</label>
            <input
              id="workdays"
              name="workdays"
              placeholder="Workdays"
              value={formData.workdays}
              onChange={handleChange}
            />
          </div>
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
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <label>Urgent </label>
          <div className="toggler ">
            <input
              id="urgent"
              name="urgent"
              type="checkbox"
              checked={formData.urgent}
              onChange={handleChange}
            />
            <label htmlFor="urgent">
              <svg
                className="toggler-on"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <polyline
                  className="path check"
                  points="100.2,40.2 51.5,88.8 29.8,67.5"
                ></polyline>
              </svg>
              <svg
                className="toggler-off"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <line
                  className="path line"
                  x1="34.4"
                  y1="34.4"
                  x2="95.8"
                  y2="95.8"
                ></line>
                <line
                  className="path line"
                  x1="95.8"
                  y1="34.4"
                  x2="34.4"
                  y2="95.8"
                ></line>
              </svg>
            </label>
          </div>
        </div>
        <button className="ao-form-submit" type="submit" disabled={isEmpty}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddOffer;
