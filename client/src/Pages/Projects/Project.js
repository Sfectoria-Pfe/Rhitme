import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";
import { CircularProgressbar } from "react-circular-progressbar";

function Project({ item, tasks }) {
  const managerApprovalPercentage =
    tasks?.length > 0
      ? (tasks?.filter((task) => task?.manager_approved).length /
          tasks?.length) *
        100
      : 0;

  return (
    <Link
      to={`${item.project_id}`}
      className={`off-container py-3 px-3 d-flex flex-column justify-content-center col-lg-5 col-12 text-decoration-none`}
    >
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div
            className="col-12 col-sm-8 d-flex flex-column"
            style={{ gap: "5px" }}
          >
            <div className="off-title " style={{ width: "100%" }}>
              {item.title}
            </div>
            <div className="proj-desc">{item.description}</div>
          </div>
          <div className="col-5 col-sm-3">
            <CircularProgressbar
              value={managerApprovalPercentage}
              text={`${managerApprovalPercentage} %`}
              strokeWidth="10"
              styles={{
                text: {
                  fontWeight: "500",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Project;
