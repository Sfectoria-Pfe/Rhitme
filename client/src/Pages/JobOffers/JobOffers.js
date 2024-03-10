import React from "react";
import Offer from "./Offer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function JobOffers() {
  const offers = [
    {
      title: "Web developer",
      description:
        "s a Senior Fullstack Javascript | Typescript Developer you will work on new technologies and find ways to meet our customers’ needs and make it easy for them to do business with us. You will be a part of a team to resolve a diverse range of complex problems and regularly lead multiple, technically complex, large-scale projects.",
      requirements: ["javascript", "node js", "react js"],
    },
    {
      title: "Web developer",
      description:
        "s a Senior Fullstack Javascript | Typescript Developer you will work on new technologies and find ways to meet our customers’ needs and make it easy for them to do business with us. You will be a part of a team to resolve a diverse range of complex problems and regularly lead multiple, technically complex, large-scale projects.",
      requirements: ["javascript", "node js", "react js"],
    },
    {
      title: "Web developer",
      description:
        "s a Senior Fullstack Javascript | Typescript Developer you will work on new technologies and find ways to meet our customers’ needs and make it easy for them to do business with us. You will be a part of a team to resolve a diverse range of complex problems and regularly lead multiple, technically complex, large-scale projects.",
      requirements: ["python", "javascript", "node js", "react js"],
    },
    {
      title: "Web developer",
      description:
        "s a Senior Fullstack Javascript | Typescript Developer you will work on new technologies and find ways to meet our customers’ needs and make it easy for them to do business with us. You will be a part of a team to resolve a diverse range of complex problems and regularly lead multiple, technically complex, large-scale projects.",
      requirements: ["javascript", "node js", "react js"],
    },
  ];
  return (
    <div className="jo-container">
      <div className="jo-navbar">
        <h1>SFECTORIA HR</h1>
        <Link to="/" className="jo-back">
          <IoArrowBack className="jo-back-icon" />
        </Link>
      </div>
      <div className="jo-content">
        <h1 className="jo-title">Our Job Offers</h1>
        <div className="jo-offers-field">
          {offers.map((item, index) => (
            <Offer
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              requirements={item.requirements}
              className="jo-offer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobOffers;
