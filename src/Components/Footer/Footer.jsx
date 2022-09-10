import React from "react";
import "./Footer.css";

export const Footer = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();

  return (
    <div className="footer">
      <p>&copy;{year} Marvel </p>
      <p>Developed by Rafael G. Lima</p>
    </div>
  );
};
