import React from "react";
import pic from "./picture1.jpg";
import "./ChatBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

function Sender() {
  return (
    <div className="sender-container d-flex align-items-start justify-content-end ">
      <div className="align-self-center">
        <Dropdown>
          <Dropdown.Toggle as="div" id="dropdown-basic">
            <div className="message-dots">...</div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <div className="message-edit">Delete</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="message-edit">Delete for me</div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="sen-message">
        Hi my name is Firas Hi my name is Firas Hi my name is Firas Hi my name
        is Firas Hi my name is Firas Hi my name is Firas Hi my name is Firas Hi
        my name is Firas Hi my name is Firas Hi my name is Firas Hi my name is
        Firas Hi my name is Firas Hi my name is Firas Hi my name is Firas Hi my
        name is Firas{" "}
      </div>
      <img src={pic} className="mes-pic" />
    </div>
  );
}

export default Sender;
