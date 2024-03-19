import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBar.css";
import pic from "./picture1.jpg";

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
      </div>
    </div>
  );
}

export default Receiver;
