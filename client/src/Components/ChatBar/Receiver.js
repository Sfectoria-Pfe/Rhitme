import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBar.css";

function Receiver({ message }) {
  return (
    <div>
      <div className="rec-container d-flex align-items-start">
        <img src={message?.sender?.photo} className="mes-pic" />
        <div className="rec-message">{message?.content}</div>
        <div className="align-self-center"></div>
      </div>
    </div>
  );
}

export default Receiver;
