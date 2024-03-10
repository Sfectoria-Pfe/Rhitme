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

function Navbar({ onStateChange }) {
  const messages = useSelector((state) => state.messages.messages);
  const sidebar = useSelector((state) => state.sidebar.sidebar);
  const dispatch = useDispatch();
  return (
    <>
      <div className="n-container container-fluid bg-primary ">
        <div className="n-row row d-flex justify-content-between align-items center">
          <div className=" d-flex align-items-center col-5 col-sm">
            <FaHamburger
              className="nav-icon mx-1 mx-sm-3"
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
