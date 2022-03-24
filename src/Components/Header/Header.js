import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div>
        <a href="/" className="logo">
          MARVEL
        </a>
      </div>
      <div className="links">
        <Link to="/characters">CHARACTERS</Link>
        <Link to="/comics">COMICS</Link>
        <h3>STORIES</h3>
        <h3>EVENTS</h3>
      </div>
    </header>
  );
};
