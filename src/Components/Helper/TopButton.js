import React, { useState } from "react";
import ArrowTop from "../../Assets/arrow-top.svg";

export const TopButton = () => {
  const [backToTop, setBackToTop] = useState(false);

  const debounce = function (func, wait, immediate) {
    let timeout;
    return function (...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.pageYOffset > 350) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    }, 150)
  );

  function goToTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  if (backToTop)
    return (
      <button
        onClick={goToTop}
        style={{
          position: "fixed",
          bottom: 15,
          right: 15,
          width: "50px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "transparent",
          transition: "0.5s",
        }}
      >
        <img style={{ width: "100%" }} src={ArrowTop} alt="arrow top" />
      </button>
    );
  return null;
};
