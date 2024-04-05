import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lottie from "lottie-react";
import notFoundAnimation from "./Animation - 1710770583973.json";

function NotFound() {
  return (
    <div className="d-flex flex-column nf-container ">
      <Lottie
        animationData={notFoundAnimation}
        loop={true}
        className="nf-animation"
      />
      <div className="nf-message d-flex flex-column align-items-center">
        <div className="nf-head display-6">Page Not Found</div>
        <div className="nf-core">
          Oops! The page you are looking for does not exist or you do not have
          access to it
        </div>
      </div>
      <Link to="/" className="nf-link px-2">
        Back to landing page
      </Link>
    </div>
  );
}

export default NotFound;
