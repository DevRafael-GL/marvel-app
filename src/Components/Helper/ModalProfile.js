import React from "react";
import "./ModalProfile.css";

export const ModalProfile = ({ modalProfile, setModalProfile }) => {
  const body = document.querySelector("body");
  if (modalProfile) {
    body.style = "overflow: hidden";
  } else {
    body.style = "";
  }

  function outsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalProfile(null);
    }
  }

  return (
    <>
      {modalProfile && (
        <div className="containerProfile" onClick={outsideClick}>
          <div className="profile">
            <span className="close" onClick={() => setModalProfile(null)}>
              X
            </span>
            <div className="contentProfile">
              <img
                className="imgProfile"
                src={`${modalProfile.data.results[0].thumbnail.path}.${modalProfile.data.results[0].thumbnail.extension}`}
                alt={modalProfile.data.results[0].name}
              />

              <div className="description">
                <h1>
                  {modalProfile.data.results[0].name ||
                    modalProfile.data.results[0].title}
                </h1>
                <p>
                  {modalProfile.data.results[0].description
                    ? modalProfile.data.results[0].description
                    : "No description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
