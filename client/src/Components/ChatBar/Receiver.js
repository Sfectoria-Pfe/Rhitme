import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBar.css";
import pic from "./picture1.jpg";
import Dropdown from "react-bootstrap/Dropdown";

function Receiver() {
  return (
    <div>
      <div className="rec-container d-flex align-items-start">
        <img src={pic} className="mes-pic" />
        <div className="rec-message">
          Hi my name is Firas Hi my name is Firas Hi my name is Firas Hi my name
          is Firas Hi my name is Firas Hi my name is Firas Hi my name is Firas
          Hi my name is Firas Hi my name is Firas Hi my name is Firas Hi my name
          is Firas{" "}
        </div>
        <div className="align-self-center">
          <Dropdown>
            <Dropdown.Toggle as="div" id="dropdown-basic">
              <div className="message-dots">...</div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <div className="message-edit">Delete for me</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Receiver;
