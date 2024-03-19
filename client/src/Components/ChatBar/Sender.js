import React from "react";
import pic from "./picture1.jpg";
import "./ChatBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Sender() {
  return (
    <div className="sender-container d-flex align-items-start justify-content-end ">
      <div className="sen-message">Hi my name is Firas</div>
      <img src={pic} className="mes-pic" />
    </div>
  );
}

export default Sender;
