import React from "react";
import { useSelector } from "react-redux";
import User from "./User";
import { CiSearch } from "react-icons/ci";
import "./Messages.css";
import profileImage from "./photo.png";

function Messages() {
  const messages = useSelector((state) => state.messages.messages);
  const components = [];
  for (let i = 0; i < 20; i++) {
    components.push(
      <User profileImage={profileImage} name="Firas" online={true} key={i} />
    );
  }
  return (
    <div className={`m-container ${messages ? " m-active" : ""} pt-2`}>
      <div className="m-title-container">
        <div className="m-title">Discussions</div>
      </div>
      <div className="m-search">
        <input type="text" className="m-search-input" placeholder="Search" />
        <CiSearch className="m-search-icon" />
      </div>
      <div className="m-chats">{components}</div>
    </div>
  );
}

export default Messages;
