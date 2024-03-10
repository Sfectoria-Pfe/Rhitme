import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./JobOffers.css";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";

function Offer({ title, description, requirements, index }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [alert, setAlert] = useState("");
  const [desc, setDesc] = useState(false);
  function handleFileChange(event) {
    const file = event.target.files[0];
    event.target.value = null;
    if (file && file.name.endsWith(".pdf")) {
      setSelectedFile(file);
      setFileName(file.name);
      setAlert("");
    } else {
      setAlert("The file should be in PDF format");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }
  return (
    <div className="o-container">
      <div className="o-title">
        <h6>{title}</h6>
        <div className="o-details" onClick={() => setDesc(!desc)}>
          <p>Details</p>
          <IoIosArrowDown className={`o-arrow ${desc ? "o-rotate" : ""}`} />
        </div>
      </div>
      <div className={`o-description ${desc ? "" : "o-hidden-desc"}`}>
        <p>{description}</p>
        <div className="o-requirements">
          <p>Job Requirements :</p>
          <ul>
            {requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <form className="o-attachement">
          <p>
            To apply for this position, please attach your CV in{" "}
            <span className="o-bold">PDF format</span>
          </p>
          <div className={`o-input-label ${alert === "" ? "" : "o-shake"}`}>
            <FaRegFilePdf className="o-pdf-icon" />
            <label htmlFor={`pdf-${index}`}>Attach your cv here</label>
          </div>
          <div className="o-file-name">
            <p>{alert === "" ? fileName : alert}</p>
          </div>
          <input
            type="file"
            accept=".pdf"
            id={`pdf-${index}`}
            onChange={handleFileChange}
          />
          <button type="submit" className="o-apply" disabled={!selectedFile}>
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}

export default Offer;
