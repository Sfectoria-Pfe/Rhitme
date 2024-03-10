import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Reports.css";
import pic from "./picture1.jpg";

function ReportReplies() {
  return (
    <div>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0" className="rr-accordion">
          <Accordion.Header className="rr-accordion-header ">
            <div className="rr-top d-flex flex-column">
              <div className="rr-infos d-flex align-items-center">
                <img src={pic} className="rr-photo" />
                <div className="rr-sender-infos d-flex flex-column">
                  <div>Firas Trabelsi</div>
                  <div>firas@gmail.com</div>
                </div>
              </div>
              <div className="rd-date mx-3">02/02/2024</div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="rr-accordion-body">
            <div className="rr-report-content mx-3">
              <div className="rr-description">
                I hope this message finds you well. I wanted to discuss a
                concern regarding the team I have been placed in. After careful
                consideration, I feel that I am not fitting in well with the
                dynamics of the team. This is impacting my ability to perform at
                my best and contribute effectively. <br /> <br />I believe that
                finding the right fit is crucial for both the team and myself. I
                am open to discussing potential solutions, such as exploring
                other teams or roles where I can better utilize my skills and
                contribute more effectively
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ReportReplies;
