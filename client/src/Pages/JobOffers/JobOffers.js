import React from "react";
import Offer from "./Offer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import OfferDetails from "./OfferDetails";
import { useDispatch, useSelector } from "react-redux";
import Apply from "./Apply";
import { hideApplyWindow } from "../../State/OffersSlice";
import { fetchOffers } from "../../State/OffersSlice";

function JobOffers() {
  const offers = useSelector((state) => state.offer.offers);
  const isOpen = useSelector((state) => state.offer.isOpen);
  const applyWindow = useSelector((state) => state.offer.applyWindow);
  const dispatch = useDispatch();

  return (
    <>
      <Apply />
      <div
        className={`jo-container ${applyWindow ? "blur unselactable" : ""}`}
        onClick={() => {
          if (applyWindow) dispatch(hideApplyWindow());
        }}
      >
        <div className="jo-navbar">
          <div>RHitm</div>
          <Link to="/" className="jo-back">
            <IoArrowBack className="jo-back-icon" />
          </Link>
        </div>
        <div className="jo-title">Our Job Offers</div>

        <div className="jo-content d-flex justify-content-between mb-5">
          <div className="jo-offers-field d-flex flex-column align-items-center">
            {offers.map((item) => (
              <Offer
                key={item.id}
                id={item.id}
                title={item.title}
                summary={item.summary}
              />
            ))}
          </div>
          <div className={`jo-details-field ${isOpen ? "d-flex" : ""}`}>
            <OfferDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobOffers;
