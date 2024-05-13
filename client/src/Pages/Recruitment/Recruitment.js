import { useEffect } from "react";
import "./Recruitment.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOffers } from "../../State/OffersSlice";
import LoadingShape from "../../Components/LoadingShape.js/LoadingShape";
import { IoIosAdd } from "react-icons/io";
import AddOffer from "../../Components/AddOffer/AddOffer";
import {
  hideAddOfferWindow,
  showAddOfferWindow,
} from "../../State/WindowsStates";

function Recruitment() {
  const offers = useSelector((state) => state.offer.offers);
  const status = useSelector((state) => state.offer.fetchStatus);
  const addOffer = useSelector((state) => state.windows.addOffer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchOffers());
  }, [status, dispatch]);
  console.log(offers);

  return (
    <>
      <AddOffer />
      <div
        className={`r-container d-flex flex-column my-4 align-items-center pb-5 ${
          addOffer ? "blur unselactable" : ""
        }`}
        onClick={() => {
          if (addOffer) dispatch(hideAddOfferWindow());
        }}
      >
        <div className="r-title align-self-start ">
          <h1>Job Offers</h1>
        </div>
        <button
          className="e-add d-flex align-items-center justify-content-around py-1 "
          onClick={() => {
            dispatch(showAddOfferWindow());
          }}
        >
          <IoIosAdd className="e-add-icon" />
          <div className="e-add-text">Add Offer</div>
        </button>
        <div className="rec-offers container">
          <div className="row d-flex justify-content-center">
            {status === "loading" ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className=" col-5">
                    <LoadingShape
                      height="150px"
                      width="400px"
                      borderRadius="10px"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {offers.map((item, index) => (
                  <Link
                    to={`${item.offer_id}`}
                    key={index}
                    className={`off-container py-3 px-3 d-flex flex-column justify-content-center col-lg-5 col-12 text-decoration-none`}
                  >
                    <div className="off-title">{item.title}</div>
                    <ul>
                      {item.summary.map((summaryItem, summaryIndex) => (
                        <li className="text-muted" key={summaryIndex}>
                          {summaryItem}
                        </li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recruitment;
