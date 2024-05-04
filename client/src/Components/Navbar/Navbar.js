import React, { useEffect } from "react";
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
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pomodoro from "../Pomodoro/Pomodoro";
import { fetchNotifications } from "../../State/NotificationsState";
import { fetchEmployees } from "../../State/EmployeesState";
import rh from "./download.jpg";
import LoadingShape from "../LoadingShape.js/LoadingShape";

function Navbar() {
  const [isChecked, setIsChecked] = useState(false);
  const employees = useSelector((state) => state.employees.employees);
  const employeesStatus = useSelector((state) => state.employees.status);
  const messages = useSelector((state) => state.messages.messages);
  const sidebar = useSelector((state) => state.sidebar.sidebar);
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const status = useSelector((state) => state.notifications.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotifications());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (employeesStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employeesStatus]);

  useEffect(() => {
    if (employeesStatus === "succeeded") {
      console.log(employees);
    }
  }, [employeesStatus]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      dispatch(showSidebar());
    } else {
      dispatch(hideSidebar());
    }
  };

  function getDateDifferenceString(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - date;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "Yesterday";
    } else {
      return `${differenceInDays} days ago`;
    }
  }

  return (
    <>
      <div className="n-container container-fluid bg-primary ">
        <div className="n-row row d-flex justify-content-between align-items center">
          <div className=" d-flex align-items-center col-6 col-sm ">
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
              }}
            />
            <Link to="/dashboard" className="n-title">
              RHitm
            </Link>
          </div>
          <div className="col d-none d-lg-block">
            <Pomodoro />
          </div>

          <div className="n-functionalities d-flex justify-content-end align-items-center col-6 col-md-5 col-lg-4 col-xl-3">
            <Dropdown autoClose="outside">
              <Dropdown.Toggle
                as="div"
                className=" unselectable"
                id="dropdown-basic"
              >
                <div className="n-notif ">
                  <IoIosNotificationsOutline className="n-notification-icon" />
                  <FaCircle className="n-active" />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="notifications ">
                <Dropdown.Header>
                  <div className="notif-header">Notifications</div>
                </Dropdown.Header>
                {status === "succeeded" && employeesStatus === "succeeded"
                  ? notifications.map((item, index) => (
                      <Dropdown.Item
                        className="notification "
                        onClick={() => {
                          window.location.href = item.link;
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "10px" }}
                          >
                            <img
                              className="notif-sender"
                              src={
                                item.sender === null
                                  ? rh
                                  : employees?.find(
                                      (employee) =>
                                        employee.user_id === item.sender
                                    ).photo
                              }
                            />
                            <div
                              className={`notif-content ${
                                item.seen ? "text-muted" : ""
                              }`}
                            >
                              {item.content}
                            </div>
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ width: "20px" }}
                          >
                            <FaCircle
                              className={`notif-unseen ${
                                item.seen ? "d-none" : ""
                              }`}
                            />
                          </div>
                        </div>

                        <div
                          className={`notif-date align-self-end ${
                            item.seen ? "notif-seen-date text-muted" : ""
                          }`}
                        >
                          {getDateDifferenceString(item.date)}
                        </div>
                      </Dropdown.Item>
                    ))
                  : Array.from({ length: 5 }, (_, index) => (
                      <Dropdown.Item key={index} className="mt-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: "20px" }}
                        >
                          <LoadingShape
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <LoadingShape
                            width="200px"
                            height="15px"
                            borderRadius="7px"
                          />
                        </div>
                      </Dropdown.Item>
                    ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle
                as="div"
                className="n-infos d-flex justify-content-around align-items-center unselectable"
                id="dropdown-basic"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="n-profilepic"
                />
                <div className="n-userinfos n-name d-none d-sm-block">
                  Firas Trabelsi
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="n-dropdown-menu px-2">
                <Dropdown.Item
                  className="n-dropdown-menu-item"
                  href="#/action-2"
                >
                  <Link
                    to={`employeeInfos/3`}
                    className="n-link text-decoration-none"
                  >
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  className="n-dropdown-menu-item"
                  href="#/action-1"
                >
                  <Link to="/logout" className="n-link text-decoration-none">
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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
