import React from "react";
import { useParams } from "react-router-dom";
import "./Masthead.css";

export const Masthead = () => {
  const pathname = window.location.pathname.replace("/", "");

  const title = `Marvel ${pathname.replace(
    pathname.charAt(0),
    pathname[0].toUpperCase()
  )}`;

  return (
    <div className="mainTitle">
      <div className="photoCharacters"></div>
      <h1>{title}</h1>
    </div>
  );
};
