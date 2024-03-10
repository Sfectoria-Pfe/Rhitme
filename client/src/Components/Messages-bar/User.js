import React from "react";

import { FaCircle } from "react-icons/fa";
import "./Messages.css";

function User({ profileImage, name, online }) {
  return (
    <div>
      <div className="m-infos">
        <FaCircle className={`m-statusicon ${!online ? "m-non-active" : ""}`} />
        <img src={profileImage} alt="Profile" className="n-profilepic" />
        <div className="m-userinfos">
          <div className="m-name">{name}</div>
          <div className="m-status">{online ? "Online" : "Offline"}</div>
        </div>
      </div>
    </div>
  );
}

export default User;
