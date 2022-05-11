import React from "react";
import { CHARACTERS_GET } from "../../Api/api";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import "./Characters.css";
import { useFetch } from "../../Hooks/useFetch";
import { Search } from "../Search/Search";
import { ModalProfile } from "../Helper/ModalProfile";
import { MainHeader } from "../Helper/MainHeader";
import { TopButton } from "../Helper/TopButton";

export const CharactersContent = () => {
  const { data, loading, error, request } = useFetch();

  const API_KEY = {
    ts: "1647634571",
    hash: process.env.REACT_APP_API_HASH,
    apikey: process.env.REACT_APP_API_KEY,
  };
  const key = `?ts=${API_KEY.ts}&apikey=${API_KEY.apikey}&hash=${API_KEY.hash}`;

  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState(null);
  const [modalProfile, setModalProfile] = React.useState(null);

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
    const idCharacter = event.currentTarget.id;
    const urlComic = `http://gateway.marvel.com/v1/public/characters/${
      idCharacter && idCharacter
    }`;
    if (!modalProfile) {
      fetch(`${urlComic}${key}`)
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
        <ModalProfile
          modalProfile={modalProfile}
          setModalProfile={setModalProfile}
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
                <img
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

          <TopButton />
        </div>
      </section>
    );
  else return null;
};
