import React from "react";
import "./LandingPage.css";

function FunctionalityCard({ icon, description }) {
  return (
    <div className="fc-container">
      <div className="fc-icon">{icon}</div>
      <h1>{description}</h1>
    </div>
  );
}

export default FunctionalityCard;
