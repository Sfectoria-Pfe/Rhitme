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
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ReplyWindow;
