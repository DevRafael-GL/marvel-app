import React from "react";
import { CHARACTERS_GET } from "../../Api/api";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import "./Characters.css";
import { Image } from "../Helper/Image";
import { useFetch } from "../../Hooks/useFetch";
import { ModalProfileComics } from "../ModalProfile/ModalProfileComics";
import { MainHeader } from "../Helper/MainHeader";

export const CharactersContent = () => {
  const { data, loading, request } = useFetch();

  const API_KEY = {
    ts: "1647634571",
    hash: process.env.REACT_APP_API_HASH,
    apikey: process.env.REACT_APP_API_KEY,
  };
  const key = `?ts=${API_KEY.ts}&apikey=${API_KEY.apikey}&hash=${API_KEY.hash}`;

  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState(null);
  const [modalProfile, setModalProfile] = React.useState(null);
  const [contentProfile, setContentProfile] = React.useState(null);
  const [idCharacter, setIdCharacter] = React.useState(null);

  const LIMIT = 20;
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
    const idChar = event.currentTarget.id;
    setIdCharacter(idChar);

    const urlCharacter = `http://gateway.marvel.com/v1/public/characters/${
      idChar && idChar
    }`;
    if (!modalProfile) {
      fetch(`${urlCharacter}${key}`)
        .then((response) => response.json())
        .then((json) => setModalProfile(json));
    }
  }

  // END MODAL PROFILE

  const characters = data?.data.results;

  if (loading) return <Loading />;
  if (data)
    return (
      <section className="sectionContainer">
        <ModalProfileComics
          modalProfile={modalProfile}
          setModalProfile={setModalProfile}
          contentProfile={contentProfile}
          setContentProfile={setContentProfile}
          idCharacter={idCharacter}
          setIdCharacter={setIdCharacter}
        />
        <div id="main" className="mainCharactersContent">
          <MainHeader
            search={search}
            setSearch={setSearch}
            data={data}
            setOffset={setOffset}
            count={COUNT}
          />

          <ul className="charactersContent">
            {characters.map((character) => (
              <li
                key={character.id}
                id={character.id}
                onClick={handleClickProfile}
              >
                {/* <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                /> */}
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
                <p>{character.name}</p>
              </li>
            ))}
          </ul>
          {
            <Pagination
              limit={LIMIT}
              total={TOTAL}
              offset={offset}
              setOffset={setOffset}
            />
          }
        </div>
      </section>
    );
  else return null;
};
