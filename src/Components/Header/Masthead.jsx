import React from "react";
import { Header } from "./Header";
import "./Masthead.css";

export const Masthead = () => {
  const pathname = window.location.pathname.replace("/", "");

  const title = `Marvel ${
    pathname.length > 0
      ? pathname.replace(pathname.charAt(0), pathname[0].toUpperCase())
      : ""
  }`;

  return (
    <>
      <Header />
      <div className="mainTitle">
        <div className="photoCharacters"></div>
        <h1>{title}</h1>
      </div>
    </>
  );
};
