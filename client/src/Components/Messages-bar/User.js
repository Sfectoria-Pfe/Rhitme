import React from "react";
import { FaCircle } from "react-icons/fa";
import "./Messages.css";
import { useDispatch } from "react-redux";
import { showChat } from "../../State/chatState";

function User({ profileImage, name, online }) {
  const dispatch = useDispatch();
  return (
    <div
      className="m-infos"
      onClick={() => {
        dispatch(showChat());
      }}
    >
      <FaCircle className={`m-statusicon ${!online ? "m-non-active" : ""}`} />
      <img src={profileImage} alt="Profile" className="n-profilepic" />
      <div className="m-userinfos">
        <div className="m-name">{name}</div>
        <div className="m-status">{online ? "Online" : "Offline"}</div>
      </div>
    </div>
  );
}

export default User;
