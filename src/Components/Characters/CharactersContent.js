import React from "react";
import { CHARACTERS_GET } from "../../Api/api";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import "./Characters.css";
import { useFetch } from "../../Hooks/useFetch";
import { Search } from "../Search/Search";
import Marvel from "../../Assets/Marvel.svg";

export const CharactersContent = () => {
  const { data, loading, error, request } = useFetch();

  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState(null);
  const [characterProfile, setCharacterProfile] = React.useState(null);

  const LIMIT = 35;
  const TOTAL = data?.data.total;
  const COUNT = data?.data.count;
  const nameStartsWith = `nameStartsWith=${search}&`;

  React.useEffect(() => {
    const { url, options } = CHARACTERS_GET(
      `${search ? nameStartsWith : ""}limit=${LIMIT}&offset=${offset}&`
    );
    request(url, options);
  }, [request, offset, nameStartsWith, search]);

  // MODAL PROFILE

  function handleClickProfile(event) {
    const ts = "1647634571";
    const hash = process.env.REACT_APP_API_HASH;
    const apikey = process.env.REACT_APP_API_KEY;
    const key = `?ts=${ts}&apikey=${apikey}&hash=${hash}`;
    const idCharacter = event.currentTarget.id;
    const urlComic = `http://gateway.marvel.com/v1/public/characters/${
      idCharacter && idCharacter
    }`;
    if (!characterProfile) {
      fetch(`${urlComic}${key}`)
        .then((response) => response.json())
        .then((json) => setCharacterProfile(json));
    }
  }

  const body = document.querySelector("body");
  if (characterProfile) {
    body.style = "overflow: hidden";
  } else {
    body.style = "";
  }

  function outsideClick(event) {
    if (event.target === event.currentTarget) {
      setCharacterProfile(null);
    }
  }

  // END MODAL PROFILE

  const characters = data?.data.results;
  console.log(characterProfile);

  if (loading) return <Loading />;
  if (data)
    return (
      <div id="main" style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <h2 className="subTitle" id="characters">
          MARVEL CHARACTERS
        </h2>
        <Search setSearch={setSearch} search={search} setOffset={setOffset} />

        <p className="results">{`${data?.data.total} Results`}</p>

        {COUNT === 0 && (
          <h1 style={{ color: "var(--primary-grey)" }}>
            Personagem não encontrado!
          </h1>
        )}
        <ul className={`container`}>
          {characters.map((character) => (
            <li
              id={character.id}
              onClick={handleClickProfile}
              className="card"
              key={character.id}
            >
              <div>
                <p>{character.name}</p>
                <img
                  className="imgCharacters"
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
              </div>
            </li>
          ))}

          {characterProfile && (
            <div className="containerProfile" onClick={outsideClick}>
              <div className="profile">
                <span
                  className="close"
                  onClick={() => setCharacterProfile(null)}
                >
                  X
                </span>
                <div className="contentProfile">
                  <img
                    className="imgProfile"
                    src={`${characterProfile.data.results[0].thumbnail.path}.${characterProfile.data.results[0].thumbnail.extension}`}
                    alt={characterProfile.data.results[0].name}
                  />

                  <div className="description">
                    <h1>{characterProfile.data.results[0].name}</h1>
                    <p>
                      {characterProfile.data.results[0].description
                        ? characterProfile.data.results[0].description
                        : "No description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* {COUNT > 10 && !activeContainer && (
            <button
              onClick={() => setActiveContainer(true)}
              className="loadingMore"
            >
              Carregar Mais
            </button>
          )} */}
        </ul>
        {
          <Pagination
            limit={LIMIT}
            total={TOTAL}
            offset={offset}
            setOffset={setOffset}
            count={COUNT}
          />
        }
      </div>
    );
  else return null;
};
