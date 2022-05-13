import React from "react";
import { Footer } from "../Footer/Footer";
import "./ModalProfile.css";

export const ModalProfile = ({
  modalProfile,
  setModalProfile,
  contentProfile,
  setContentProfile,
}) => {
  const [modalComicsProfile, setModalComicsProfile] = React.useState(null);

  const API_KEY = {
    ts: "1647634571",
    hash: process.env.REACT_APP_API_HASH,
    apikey: process.env.REACT_APP_API_KEY,
  };
  const key = `?ts=${API_KEY.ts}&apikey=${API_KEY.apikey}&hash=${API_KEY.hash}`;

  const body = document.querySelector("body");
  if (modalProfile) {
    body.style = "overflow: hidden";
  } else {
    body.style = "";
  }

  function outsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalProfile(null);
      setContentProfile(null);
    }
  }

  function outsideClickComicsModal(event) {
    if (event.target === event.currentTarget) {
      setModalComicsProfile(null);
    }
  }

  function handleProfileComics(event) {
    const idComics = event.currentTarget.id;
    const urlComic = `http://gateway.marvel.com/v1/public/comics/${
      idComics && idComics
    }`;
    if (!modalComicsProfile) {
      fetch(`${urlComic}${key}`)
        .then((response) => response.json())
        .then((json) => setModalComicsProfile(json));
    }
  }

  console.log(modalComicsProfile);
  const comics = contentProfile?.data.results;
  const comicsModal = modalComicsProfile?.data.results;

  return (
    <>
      {modalProfile && (
        <div className="containerProfile" onClick={outsideClick}>
          <div className="profileCharacter">
            <span
              className="close"
              onClick={() => {
                setModalProfile(null);
                setContentProfile(null);
              }}
            >
              X
            </span>
            <div className="contentProfile">
              <div className="imgProfile">
                <img
                  className="imgProfile"
                  src={`${modalProfile.data.results[0].thumbnail.path}.${modalProfile.data.results[0].thumbnail.extension}`}
                  alt={modalProfile.data.results[0].name}
                />
              </div>

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
                <div className="btnsProfile">
                  <button className="profileBtn">Comics</button>
                  <button className="profileBtn">Events</button>
                </div>
              </div>
            </div>
            <div className="mainProfile">
              <ul className="comicsContentProfile">
                
                {
                  comics &&
                  comics.length > 0 ? comics &&
                  comics.map((comic) => (
                    <li
                      className="profileComics"
                      key={comic.id}
                      id={comic.id}
                      onClick={handleProfileComics}
                    >
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                    </li>
                  )) : <p>No comics</p>
                }
              </ul>
            </div>
            <Footer />
          </div>
        

          {modalComicsProfile && <div className="containerComicsProfile" onClick={outsideClickComicsModal}>
            <div className="modalComicsProfile">
            <span
              className="close"
              onClick={() => {
                setModalComicsProfile(null);
              }}
            >
              X
            </span>
              <div className="imgComicsProfile">
                <img
                  className="imgProfile"
                  src={`${comicsModal[0].thumbnail.path}.${comicsModal[0].thumbnail.extension}`}
                  alt={comicsModal[0].name}
                />
              </div>

              <div className="descriptionComics">
                <h1>
                  {comicsModal[0].name ||
                    comicsModal[0].title}
                </h1>
                <p>
                  {comicsModal[0].description
                    ? comicsModal[0].description
                    : "No description"}
                </p>
                </div>
            </div>
          </div>}

          
        </div>
      )}
    </>
  );
};
