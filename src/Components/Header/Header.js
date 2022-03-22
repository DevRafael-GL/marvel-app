import React from "react";
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
        <h3>CHARACTERS</h3>
        <h3>COMICS</h3>
        <h3>STORIES</h3>
        <h3>EVENTS</h3>
      </div>
    </header>
  );
};
