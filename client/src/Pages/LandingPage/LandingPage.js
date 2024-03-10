import React from "react";
import mainImage from "./employees.png";
import repImage from "./report.png";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import FunctionalityCard from "./FunctionalityCard";
import { FaUsersCog } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { LuRadar } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineMonitor } from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  const slides = [
    { icon: <FaUsersCog />, description: "Employees Management" },
    { icon: <FaTasks />, description: "Task Management" },
    {
      icon: <IoIosChatbubbles />,
      description: "Integrated Chat Feature",
    },
    {
      icon: <IoStatsChart />,
      description: "Reporting and Analytics",
    },
    {
      icon: <IoPersonAdd />,
      description: "Recruitment and Onboarding",
    },
    {
      icon: <LuRadar />,
      description: "Attendance Tracking",
    },
    {
      icon: <MdManageAccounts />,
      description: "Employee Self-Service",
    },
    {
      icon: <MdOutlineMonitor />,
      description: "User-Friendly Interface",
    },
    {
      icon: <IoTimer />,
      description: "Integrated Pomodoro Timer",
    },
  ];
  var settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    prevArrow: null,
    nextArrow: null,
  };
  return (
    <>
      <div className="lp-container d-flex flex-column justify-content-start min-vh-100 position-relative overflow-x-hidden">
        <div className="lp-moving-shape-5 d-none d-lg-block"></div>
        <div className="lp-background"></div>
        <div className="lp-navbar container mt-4 mb-5">
          <div className="row justify-content-sm-between justify-content-center align-items-center">
            <h1 className="col-sm-6 col-12 fs-sm-6 text-sm-start text-center">
              SFECTORIA HR
            </h1>
            <Link to="/login" className="lp-login-text col-1 ">
              Log In
            </Link>
          </div>
        </div>
        <div className="lp-content container h-100 align-items-center my-5">
          <div className="row justify-content-evenly align-items-center h-100">
            <div className="lp-writen-content col-lg-6 d-flex flex-column ">
              <h1 className="text-center text-lg-start">
                EXCLUSIVE JOB OPPORTUNITIES AWAIT
              </h1>
              <p className="lead ml-1 text-center text-lg-start">
                Discover exciting career prospects tailored to your skills and
                aspirations. Apply seamlessly and embark on your next
                professional journey.
              </p>
              <Link
                className="lp-offers-link  align-self-start"
                to="/joboffers"
              >
                Browse Job Offers
              </Link>
            </div>
            <div className="lp-images col-9 col-lg-5 my-2 my-4 my-lg-2 ">
              <img src={mainImage} alt="first" className="lp-main-img w-100" />
            </div>
          </div>
        </div>
      </div>
      <div className="lp-second-container d-flex flex-column min-vh-100 justify-content-around overflow-x-hidden mt-5 ">
        <div className="lp-glorification d-flex flex-column align-items-center mt-4">
          <h1 className="fs-2">Unlock the Power of Modern HR Management</h1>
          <p>
            Revolutionize the way you manage your workforce, empower your HR
            team and elevate your organization with our advanced HR management
            system.
          </p>
        </div>
        <div className="lp-sliding-container">
          <Slider {...settings} className="lp-slider ">
            {slides.map((item, index) => (
              <FunctionalityCard
                key={index}
                icon={item.icon}
                description={item.description}
                className="lp-card"
              />
            ))}
          </Slider>
        </div>
        <Link className="lp-login-link mt-4 " to="/login">
          Log In
        </Link>
        <div className="lp-moving-shape d-none d-lg-block"></div>
        <div className="lp-moving-shape-2 d-none d-lg-block"></div>
        <div className="lp-moving-shape-3 d-none d-lg-block"></div>
        <div className="lp-moving-shape-6 d-none d-lg-block"></div>
      </div>
      <div className="lp-moving-shape-4 d-none d-lg-block"></div>
    </>
  );
}

export default LandingPage;
