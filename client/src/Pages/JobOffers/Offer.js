import React from "react";
import "./JobOffers.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOffer, showOfferDetails } from "../../State/OffersSlice";

function Offer({ title, id, summary }) {
  const current_offer = useSelector((state) => state.offer.current_offer);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.offer.isOpen);

  return (
    <div
      className={`o-container py-3 px-3 d-flex flex-column ${
        id === current_offer ? "o-active" : ""
      }`}
      onClick={() => {
        dispatch(setCurrentOffer(id));
        if (!isOpen) {
          dispatch(showOfferDetails());
        }
      }}
    >
      <div className="o-title">{title}</div>
      <ul>
        {summary.map((item, index) => (
          <li className="text-muted" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  // <div className="o-container">
  //   <div className="o-title">
  //     <h6>{title}</h6>
  //     <div className="o-details" onClick={() => setDesc(!desc)}>
  //       <p>Details</p>
  //       <IoIosArrowDown className={`o-arrow ${desc ? "o-rotate" : ""}`} />
  //     </div>
  //   </div>
  //   <div className={`o-description ${desc ? "" : "o-hidden-desc"}`}>
  //     <p>{description}</p>
  //     <div className="o-requirements">
  //       <p>Job Requirements :</p>
  //       <ul>
  //         {requirements.map((item) => (
  //           <li key={item}>{item}</li>
  //         ))}
  //       </ul>
  //     </div>
  //     <form className="o-attachement">
  //       <p>
  //         To apply for this position, please attach your CV in{" "}
  //         <span className="o-bold">PDF format</span>
  //       </p>
  //       <div className={`o-input-label ${alert === "" ? "" : "o-shake"}`}>
  //         <FaRegFilePdf className="o-pdf-icon" />
  //         <label htmlFor={`pdf-${index}`}>Attach your cv here</label>
  //       </div>
  //       <div className="o-file-name">
  //         <p>{alert === "" ? fileName : alert}</p>
  //       </div>
  //       <input
  //         type="file"
  //         accept=".pdf"
  //         id={`pdf-${index}`}
  //         onChange={handleFileChange}
  //       />
  //       <button type="submit" className="o-apply" disabled={!selectedFile}>
  //         Apply
  //       </button>
  //     </form>
  //   </div>
  // </div>
}

export default Offer;
