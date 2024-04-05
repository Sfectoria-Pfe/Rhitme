import React from "react";
import "./LoadingShape.css";

function LoadingShape({ width, height, borderRadius }) {
  return (
    <div
      className="loading-shape"
      style={{ width: width, height: height, borderRadius: borderRadius }}
    ></div>
  );
}

export default LoadingShape;
