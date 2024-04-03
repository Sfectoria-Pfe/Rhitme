import React, { useEffect, useState } from "react";
import "./Recruitment.css";
import { useParams } from "react-router-dom";
import { fetchOfferById } from "../../State/OffersSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import EmployeeChange from "../EmployeeInfos/EmployeeInfosPages/EmployeeChange";
import { fetchCandidates } from "../../State/CandidateState";
import { all } from "axios";

function Candidates() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer.offer);
  const [editableOffer, setEditableOffer] = useState(null);
  const status = useSelector((state) => state.offer.offerStatus);
  const candidates = useSelector((state) => state.candidate.candidates);
  const candidateStatus = useSelector((state) => state.candidate.status);
  const [addSkill, setAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [sortBy, setSortBy] = useState("accuracy");
  const [sortedCandidates, setSortedCandidates] = useState([]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    if (status === "idle" || offer?.id != id) {
      dispatch(fetchOfferById(id));
    }
  }, [status, dispatch, id]);

  useEffect(() => {
    if (candidateStatus === "idle" || offer?.id != id) {
      dispatch(fetchCandidates(id));
    }
  }, [offer, candidateStatus, dispatch, id]);

  useEffect(() => {
    if (status === "succeeded") {
      setEditableOffer(offer);
    }
  }, [status, offer]);

  const handleDeleteSkill = (index) => {
    const newSkills = editableOffer.skills.filter((_, i) => i !== index);
    setEditableOffer((prevOffer) => ({
      ...prevOffer,
      skills: newSkills,
    }));
    setSave(true);
  };

  const [save, setSave] = useState(false);

  const onCancel = () => {
    setSave(false);
    setEditableOffer(offer);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditableOffer((prevOffer) => ({
      ...prevOffer,
      [field]: value,
    }));
    setSave(true);
  };

  useEffect(() => {
    if (candidateStatus === "succeeded") {
      const sortedCandidates = [...candidates].sort((a, b) => {
        if (sortBy === "accuracy") {
          return b.accuracy - a.accuracy;
        } else if (sortBy === "date") {
          return new Date(a.posted_at) - new Date(b.posted_at);
        }
        return 0;
      });
      setSortedCandidates(sortedCandidates);
    }
  }, [candidateStatus, candidates, sortBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return `${date.toLocaleDateString("en-US", options)} `;
  };

  return (
    <div className="r-container d-flex flex-column mt-4 align-items-center mb-4 pb-5 justify-content-center">
      <EmployeeChange save={save} onCancel={onCancel} />
      {status === "loading" || candidateStatus === "loading" ? (
        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner">
              <div className="spinner">
                <div className="spinner">
                  <div className="spinner">
                    <div className="spinner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="c-offer-part d-flex flex-column">
            <div className="c-off-title">{editableOffer?.title}</div>
            <div className="c-off-content container d-flex flex-column">
              <div className="row d-flex justify-content-around">
                <div className="c-off-section d-flex flex-column col-xl-5 col-7 p-3">
                  <div className="c-off-section-title">Profile needed</div>
                  <div className="c-off-section-content d-flex flex-column">
                    <div className="c-off-subsection d-flex flex-column">
                      <div className="c-off-subsection-title">Skills</div>
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="row d-flex j-skills ">
                          {editableOffer?.skills.map((item, index) => (
                            <div
                              key={index}
                              className="j-skill col-3 d-flex  align-items-center unselectable"
                              readOnly
                            >
                              {item}
                              <div>
                                <IoClose
                                  className="j-remove-skill"
                                  onClick={() => handleDeleteSkill(index)}
                                />
                              </div>
                            </div>
                          ))}
                          <div className="j-add-skill  d-flex align-items-center">
                            <IoIosAdd
                              className={`icon ${addSkill ? "j-x" : ""}`}
                              onClick={() =>
                                addSkill
                                  ? setAddSkill(false)
                                  : setAddSkill(true)
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
                                  setEditableOffer((prevOffer) => ({
                                    ...prevOffer,
                                    skills: [...prevOffer.skills, newSkill],
                                  }));
                                  setNewSkill("");
                                }}
                              >
                                Add skill
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-off-subsection d-flex flex-column">
                      <div className="c-off-subsection-title">
                        Required experience
                      </div>
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="d-flex">
                          <input
                            type="number"
                            value={editableOffer?.experience || ""}
                            onChange={(e) => handleChange(e, "experience")}
                            style={{ width: "50px" }}
                          />
                          <span className="ms-2">years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c-off-section d-flex flex-column col-xl-5 col-7 p-3">
                  <div className="c-off-section-title">Job details</div>
                  <div className="c-off-section-content d-flex flex-column">
                    <div className="c-off-subsection d-flex flex-column">
                      <div className="c-off-subsection-title">Pay</div>
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="d-flex">
                          <input
                            value={editableOffer?.pay || ""}
                            onChange={(e) => handleChange(e, "pay")}
                            style={{ width: "100px" }}
                          />
                          <span className="ms-2">DT</span>
                        </div>
                      </div>
                    </div>
                    <div className="c-off-subsection d-flex flex-column">
                      <div className="c-off-subsection-title">Job type</div>
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="d-flex">
                          <input
                            value={editableOffer?.job_type || ""}
                            onChange={(e) => handleChange(e, "job_type")}
                            style={{ width: "100px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="c-off-subsection d-flex flex-column">
                      <div className="c-off-subsection-title">Workdays</div>
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="d-flex">
                          <input
                            value={editableOffer?.workdays || ""}
                            onChange={(e) => handleChange(e, "workdays")}
                            style={{ width: "200px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c-off-section d-flex flex-column col-7 p-3">
                  <div className="c-off-section-title">Description</div>
                  <div className="c-off-section-content d-flex flex-column">
                    <div className="c-off-subsection d-flex flex-column">
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="d-flex">
                          <textarea
                            value={editableOffer?.description}
                            onChange={(e) => handleChange(e, "description")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="c-candidate-part d-flex flex-column ">
            <div className="c-candidate-part-title">Applications</div>
            <div className="c-candidate-part-content d-flex flex-column">
              <div className="e-sorting d-flex align-items-center align-self-end ">
                <label hmtlfor="sort">SORT BY : </label>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                  <option value="accuracy">Accuracy</option>
                  <option value="date">Date</option>
                </select>
              </div>
              {sortedCandidates?.map((item, index) => (
                <div className="container c-candidate " key={index}>
                  <div className="row d-flex align-items-center justify-content-center justify-content-xl-between ">
                    <div
                      className="col-2 d-flex align-items-center justify-content-center my-xl-0 my-1"
                      style={{ height: "100px", width: "100px" }}
                    >
                      <CircularProgressbar
                        value={item.accuracy}
                        text={`${item.accuracy}%`}
                        strokeWidth="10"
                        styles={{
                          text: {
                            fontWeight: "500",
                          },
                        }}
                      />
                    </div>
                    <div className="col-12 my-xl-2 my-1 col-xl-2 text-center c-candidate-info ">
                      {item.firstname + " " + item.lastname}
                    </div>
                    <div className="col my-xl-4 my-1 col-xl-2 text-center c-candidate-info ">
                      {item.email}
                    </div>
                    <div className="col-12 my-xl-2 my-1 col-xl-2 text-end c-candidate-info ">
                      {item.phonenumber}
                    </div>
                    <div className="col-12 my-xl-1 my-1 col-xl-2 c-candidate-date text-center ">
                      {formatDate(item.posted_at)}
                    </div>
                    <div className="col-12 col-xl-1  text-center">
                      <button className="cta">
                        <a
                          href={item.cv}
                          target="_blank"
                          className="c-candidate-cv"
                        >
                          Open CV
                        </a>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Candidates;
