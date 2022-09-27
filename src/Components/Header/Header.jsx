import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [menuMobile, setMenuMobile] = React.useState(false);

  const nav = useRef(null);

  window.onscroll = () => navFixed();

  function navFixed() {
    if (window.pageYOffset - 1 > nav.current.offsetTop) {
      nav.current.classList.add("headerFixed");
    } else {
      nav.current.classList.remove("headerFixed");
    }
  }

  return (
    <header ref={nav} className="header">
      <div className="HeaderContainer">
        <div className="logoContent">
          <a href="/" className="logo">
            MARVEL
          </a>
        </div>
        <div className={`menu ${menuMobile ? "active" : ""}`}>
          <button
            onClick={() => setMenuMobile(!menuMobile)}
            className="btnMobile"
          >
            Menu
            <span className="hamburger"></span>
          </button>
          <nav className="nav">
            <Link onClick={() => setMenuMobile(false)} to="/characters">
              CHARACTERS
            </Link>
            <Link onClick={() => setMenuMobile(false)} to="/comics">
              COMICS
            </Link>
            <Link onClick={() => setMenuMobile(false)} to="/events">
              EVENTS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
