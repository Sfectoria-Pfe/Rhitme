import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import "./Navbar.css";
import profileImage from "./photo.png";
import { useSelector, useDispatch } from "react-redux";
import { showMessages, hideMessages } from "../../State/messagesState";
import { showSidebar, hideSidebar } from "../../State/sidebarState";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { FaHamburger } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Settings from "./Settings";
import { useState } from "react";

function Navbar({ onStateChange }) {
  const [isChecked, setIsChecked] = useState(false);
  const messages = useSelector((state) => state.messages.messages);
  const sidebar = useSelector((state) => state.sidebar.sidebar);
  const dispatch = useDispatch();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      dispatch(showSidebar());
    } else {
      dispatch(hideSidebar());
    }
  };
  return (
    <>
      <div className="n-container container-fluid bg-primary ">
        <div className="n-row row d-flex justify-content-between align-items center">
          <div className=" d-flex align-items-center col-5 col-sm">
            <label className="hamburger d-lg-block d-none">
              <input
                type="checkbox"
                checked={!isChecked}
                onChange={handleCheckboxChange}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
            <FaHamburger
              className="nav-icon mx-1 mx-sm-3 d-block d-lg-none"
              onClick={() => {
                sidebar ? dispatch(hideSidebar()) : dispatch(showSidebar());
                console.log(sidebar);
              }}
            />
            <div className="n-title">SFECTORIA HR</div>
          </div>
          <div className="n-functionalities d-flex justify-content-around align-items-center col-7 col-md-5 col-lg-4 col-xl-3">
            <div className="n-notif">
              <IoIosNotificationsOutline className="n-notification-icon" />
              <FaCircle className="n-active" />
            </div>
            <button className="n-logout">Logout</button>
            <div className="n-infos d-flex  justify-content-around align-items-center">
              <img src={profileImage} alt="Profile" className="n-profilepic" />
              <div className="n-userinfos n-name d-none d-sm-block">
                Firas Trabelsi
              </div>
            </div>

            <FiMessageCircle
              className="n-messages"
              onClick={() =>
                messages ? dispatch(hideMessages()) : dispatch(showMessages())
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
