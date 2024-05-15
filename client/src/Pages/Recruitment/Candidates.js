import { useEffect, useState } from "react";
import "./Recruitment.css";
import { useParams } from "react-router-dom";
import { fetchOfferById } from "../../State/OffersSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import EmployeeChange from "../EmployeeInfos/EmployeeInfosPages/EmployeeChange";
import { updateOffer } from "../../State/OffersSlice";
import { MdDelete } from "react-icons/md";
import { deleteOffer } from "../../State/OffersSlice";

function Candidates() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer.offer);
  const [editableOffer, setEditableOffer] = useState(null);
  const status = useSelector((state) => state.offer.fetchByIdStatus);
  const [addSkill, setAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [sortBy, setSortBy] = useState("accuracy");
  const [sortedCandidates, setSortedCandidates] = useState([]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    if (status === "idle" || offer?.offer_id != id) {
      dispatch(fetchOfferById(id));
    }
  }, [status, dispatch, id]);

  useEffect(() => {
    if (status === "succeeded") {
      setEditableOffer(offer);
    }
  }, [status, offer]);

  const handleDeleteSkill = (index) => {
    const newSkills = editableOffer.requirements.filter((_, i) => i !== index);
    setEditableOffer((prevOffer) => ({
      ...prevOffer,
      requirements: newSkills,
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
    if (offer?.offer_id == id) {
      const sortedCandidates = [...offer.posts].sort((a, b) => {
        if (sortBy === "accuracy") {
          return b.accuracy - a.accuracy;
        } else if (sortBy === "date") {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        return 0;
      });
      setSortedCandidates(sortedCandidates);
    }
  }, [offer, sortBy]);

  console.log(editableOffer);

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

  const onSave = () => {
    const dto = {
      title: editableOffer.title,
      description: editableOffer.description,
      summary: editableOffer.summary,
      requirements: editableOffer.requirements,
      experience: editableOffer.experience,
      pay: editableOffer.pay,
      job_type: editableOffer.job_type,
      workdays: editableOffer.workdays,
      urgent: editableOffer.urgent,
    };

    dispatch(updateOffer({ offerId: editableOffer.offer_id, offerData: dto }));
    setSave(false);
  };

  console.log(sortedCandidates);
  return (
    <div className="r-container d-flex flex-column mt-4 align-items-center mb-4 pb-5 justify-content-center">
      <EmployeeChange save={save} onCancel={onCancel} onSave={onSave} />
      {status === "loading" ? (
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
          <div className="c-offer-part d-flex flex-column ">
            <div className="c-off-title d-flex justify-content-between">
              {editableOffer?.title}
              <div>
                <button
                  className="del-offer-btn ps-3"
                  style={{
                    width: "115px",
                    fontSize: "70%",
                  }}
                  onClick={() => {
                    dispatch(deleteOffer(editableOffer.offer_id));
                    window.history.back();
                  }}
                >
                  Delete
                  <MdDelete className="icon " />
                </button>
              </div>
            </div>
            <div className="c-off-content container d-flex flex-column ">
              <div className="row d-flex justify-content-around">
                <div className="c-off-section d-flex flex-column col-xl-5 col-7 p-3 ">
                  <div className="c-off-section-title">Profile needed</div>
                  <div className="c-off-section-content d-flex flex-column">
                    <div className="c-off-subsection d-flex flex-column ">
                      <div className="c-off-subsection-title">Skills</div>
                      <div className="c-off-subsection-content container mx-0 ">
                        <div className="row d-flex j-skills ">
                          {editableOffer?.requirements.map((item, index) => (
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
                                    requirements: [
                                      ...prevOffer.requirements,
                                      newSkill,
                                    ],
                                  }));
                                  setNewSkill("");
                                  setSave(true);
                                }}
                              >
                                Add
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
              {sortedCandidates.length === 0 ? (
                <div className="c-no-candidate text-center my-4">
                  No candidates have applied for this position.
                </div>
              ) : (
                sortedCandidates?.map((item, index) => (
                  <div className="container c-candidate " key={index}>
                    <div className="row d-flex align-items-center justify-content-center justify-content-xl-between ">
                      <div
                        className="col-2 d-flex align-items-center justify-content-center my-xl-0 my-1"
                        style={{ height: "100px", width: "100px" }}
                      >
                        <CircularProgressbar
                          value={60}
                          text={`60%`}
                          strokeWidth="10"
                          styles={{
                            text: {
                              fontWeight: "500",
                            },
                          }}
                        />
                      </div>
                      <div className="col-12 my-xl-2 my-1 col-xl-2 text-center c-candidate-info ">
                        {item.candidate.first_name +
                          " " +
                          item.candidate.last_name}
                      </div>
                      <div className="col my-xl-4 my-1 col-xl-2 text-center c-candidate-info ">
                        {item.candidate.email}
                      </div>
                      <div className="col-12 my-xl-2 my-1 col-xl-2 text-xl-end text-center c-candidate-info ">
                        {item.candidate.phone}
                      </div>
                      <div className="col-12 my-xl-1 my-1 col-xl-2 c-candidate-date text-center ">
                        {formatDate(item.created_at)}
                      </div>
                      <div className="col-12 col-xl-1  text-center">
                        <button className="cta">
                          <a
                            href={item.candidate.cv}
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
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Candidates;
