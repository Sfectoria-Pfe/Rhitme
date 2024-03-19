import React from "react";
import "./Reports.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { showReportReply, hideReportReply } from "../../State/reportReply";
import { IoMdClose } from "react-icons/io";

function ReplyWindow({ title }) {
  const report = useSelector((state) => state.report.report);
  const dispatch = useDispatch();
  return (
    <div
      className={`rw-container py-3 d-flex flex-column align-items-center ${
        report ? "rw-active" : ""
      }`}
    >
      <div className="rw-title">{`Reply on ${title}`}</div>
      <IoMdClose
        className="rw-close "
        onClick={() => {
          dispatch(hideReportReply());
        }}
      />

      <form className="rw-form d-flex flex-column">
        <textarea className="p-2" placeholder="Type report reply here ..." />
        <button type="submit">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}

export default ReplyWindow;
