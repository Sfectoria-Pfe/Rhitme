import React from "react";
import pic from "./picture1.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportReplies from "./ReportReplies";
import { MdDelete } from "react-icons/md";
import { CgMailReply } from "react-icons/cg";
import ReplyWindow from "./ReplyWindow";
import { useSelector, useDispatch } from "react-redux";
import { showReportReply, hideReportReply } from "../../State/reportReply";

function ReportDetails() {
  const report = useSelector((state) => state.report.report);
  const dispatch = useDispatch();
  return (
    <>
      <ReplyWindow />
      <div
        className={`rd-container my-5 d-flex flex-column ${
          report ? "blur" : ""
        }`}
        onClick={() => {
          if (report) dispatch(hideReportReply());
        }}
      >
        <div className="rd-main-report d-flex flex-column ">
          <div className="container">
            <div className="row">
              <div className="rd-top d-flex align-items-center col">
                <img src={pic} className="rd-photo" />
                <div className="rd-infos d-flex flex-column">
                  <div>Firas Trabelsi</div>
                  <div>firas@gmail.com</div>
                </div>
              </div>
              <div className="rd-delete col d-flex align-items-center justify-content-end">
                <MdDelete className="rd-delete-icon" />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center ">
            <div className="rd-date mx-3">02/02/2024</div>
            <div className="rd-target mx-4">Targeting Youssef Takali</div>
          </div>

          <div className="rd-report-content mx-3">
            <div className="rd-title">
              I can't fit in with the team I was placed in
            </div>
            <div className="rd-description">
              I hope this message finds you well. I wanted to discuss a concern
              regarding the team I have been placed in. After careful
              consideration, I feel that I am not fitting in well with the
              dynamics of the team. This is impacting my ability to perform at
              my best and contribute effectively. <br /> <br />I believe that
              finding the right fit is crucial for both the team and myself. I
              am open to discussing potential solutions, such as exploring other
              teams or roles where I can better utilize my skills and contribute
              more effectively
            </div>
            <div
              className="align-self-end d-flex align-items-center rd-reply px-2 py-1"
              onClick={() => {
                dispatch(showReportReply());
              }}
            >
              <CgMailReply />
              <div>Reply</div>
            </div>
          </div>
        </div>
        <div className="rd-replies-dec mx-5">Replies</div>
        <div className="mb-5 rd-replies">
          <ReportReplies />
        </div>
      </div>
    </>
  );
}

export default ReportDetails;
