import React, { useEffect } from "react";
import "./JobOffers.css";
import { MdOutlineSchedule } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import xp from "./experience.png";
import skills from "./skills.png";
import { useDispatch, useSelector } from "react-redux";
import { hideOfferDetails, showApplyWindow } from "../../State/OffersSlice";
import { IoClose } from "react-icons/io5";

function OfferDetails() {
  const current_offer = useSelector((state) => state.offer.current_offer);
  const offer = useSelector((state) =>
    state.offer.offers.find((offer) => offer.id === current_offer)
  );

  const dispatch = useDispatch();
  const desc = offer.description.replace(/\n/g, "<br/>");

  return (
    <div className="od-container ">
      <div className="od-header d-flex flex-column justify-content-center align-items-start">
        <IoClose
          className="od-close d-block d-lg-none"
          onClick={() => dispatch(hideOfferDetails())}
        />
        <div>{offer.title}</div>
        <button
          className="px-2 py-1"
          onClick={() => {
            dispatch(showApplyWindow());
          }}
        >
          Apply for this job
        </button>
      </div>
      <div className="od-content mt-4 d-flex flex-column">
        <div className="od-part ">
          <div className="od-part-title">Profile needed</div>
          <div className="od-part-content">
            <img
              src={skills}
              width="19px"
              height="19px"
              className="od-part-icon "
            />
            <div>
              <div className="od-req-title">Skills</div>
              <div className="od-skills-list d-flex list-unstyled container">
                <div className="row">
                  {offer.skills.map((item, index) => (
                    <li className="od-req col-1" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="od-part-content">
            <img
              src={xp}
              width="21px"
              height="20px"
              className="od-part-icon "
            />
            <div>
              <div className="od-req-title">Experience</div>
              <div className="od-req">{offer.experience}</div>
            </div>
          </div>
        </div>
        <div className="od-part  ">
          <div className="od-part-title">Job details</div>
          <div className="od-part-content">
            <FaMoneyBill className="od-part-icon" />
            <div>
              <div className="od-req-title">Pay</div>
              <div className="od-req">{offer.pay}</div>
            </div>
          </div>
          <div className="od-part-content">
            <MdWork className="od-part-icon" />
            <div>
              <div className="od-req-title">Job type</div>
              <div className="od-req">{offer.job_type}</div>
            </div>
          </div>
          <div className="od-part-content">
            <MdOutlineSchedule className="od-part-icon" />
            <div>
              <div className="od-req-title">Workdays</div>
              <div className="od-req">{offer.workdays}</div>
            </div>
          </div>
        </div>

        <div className="od-description d-flex flex-column">
          <div className="od-part-title">Description</div>
          <div
            className="od-desc"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default OfferDetails;
