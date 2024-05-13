import "./JobOffers.css";
import { FaRegFilePdf } from "react-icons/fa6";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { hideApplyWindow } from "../../State/OffersSlice";
import { createCandidate } from "../../State/CandidateState";

function Apply() {
  const current_offer = useSelector((state) => state.offer.current_offer);
  const applyWindow = useSelector((state) => state.offer.applyWindow);
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState("");
  const [filealert, setFileAlert] = useState("");
  const [alert, setAlert] = useState("");
  function handleFileChange(event) {
    const file = event.target.files[0];
    event.target.value = null;
    if (file && file.name.endsWith(".pdf")) {
      setFormData({
        ...formData,
        cv: file,
      });
      setFileName(file.name);
      setFileAlert("");
    } else {
      setFileAlert("The file should be in PDF format");
      setTimeout(() => {
        setFileAlert("");
      }, 3000);
    }
  }
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    cv: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = Object.values(formData);
    if (values.some((value) => value === "" || value === null)) {
      setAlert("Please fill out all fields.");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }

    console.log({
      cv: formData.cv,
      candidateData: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        offer_id: current_offer.offer_id,
      },
    });
    dispatch(
      createCandidate({
        cv: formData.cv,
        candidateData: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          offer_id: current_offer.offer_id,
        },
      })
    );
    dispatch(hideApplyWindow());

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      cv: null,
    });
    setFileName("");
  };

  return (
    <div
      className={`app-container position-fixed d-flex flex-column align-items-center py-3 ${
        applyWindow ? "app-active" : ""
      }`}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="app-title">
          <IoClose
            className="position-absolute app-close"
            onClick={() => dispatch(hideApplyWindow())}
          />
          Applying for{" "}
          <span style={{ fontWeight: "500" }}>{current_offer?.title}</span>
        </div>
        <div
          className={`app-alert ${alert === "" ? "d-none" : "d-block"} mt-2`}
        >
          {alert}
        </div>
      </div>

      <form
        className="app-form d-flex flex-column align-items-center "
        onSubmit={handleSubmit}
      >
        <div className="app-form-field container ">
          <div className="row d-flex justify-content-between ">
            <div className="app-input-field col-sm-5 ">
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                name="first_name"
                type="text"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="app-input-field col-sm-5">
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                name="last_name"
                type="text"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="app-form-field container ">
          <div className="row d-flex justify-content-between ">
            <div className="app-input-field col-sm-6">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="app-input-field col-sm-5">
              <label htmlFor="number">Phone number</label>
              <input
                id="number"
                name="phone"
                type="text"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <label
            className={`app-input-label ${filealert === "" ? "" : "app-shake"}`}
            htmlFor="cv-file"
          >
            <FaRegFilePdf className="app-pdf-icon" />
            <label htmlFor="cv-file">Attach your cv here</label>
          </label>
          <div className="app-file-name">
            <p>{filealert === "" ? fileName : filealert}</p>
          </div>
          <input
            type="file"
            accept=".pdf"
            id="cv-file"
            onChange={handleFileChange}
            className="d-none"
          />
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default Apply;
