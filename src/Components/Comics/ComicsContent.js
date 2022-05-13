import React from "react";
import { CHARACTER_COMICS_GET } from "../../Api/api";
import { useFetch } from "../../Hooks/useFetch";
import { Loading } from "../Loading/Loading";
import { Pagination } from "../Pagination/Pagination";
import "./Comics.css";
import { Search } from "../Search/Search";
import { ModalProfile } from "../ModalProfile/ModalProfile";
import { MainHeader } from "../Helper/MainHeader";
import { TopButton } from "../Helper/TopButton";

export const ComicsContent = () => {
  const { data, loading, error, request } = useFetch();
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState(null);
  const [modalProfile, setModalProfile] = React.useState(null);

  const API_KEY = {
    ts: "1647634571",
    hash: process.env.REACT_APP_API_HASH,
    apikey: process.env.REACT_APP_API_KEY,
  };
  const key = `?ts=${API_KEY.ts}&apikey=${API_KEY.apikey}&hash=${API_KEY.hash}`;

  const LIMIT = 20;
  const TOTAL = data?.data.total;
  const COUNT = data?.data.count;
  const titleStartsWith = `titleStartsWith=${search}&`;

  React.useEffect(() => {
    const { url, options } = CHARACTER_COMICS_GET(
      `${search ? titleStartsWith : ""}limit=${LIMIT}&offset=${offset}&`
    );
    request(url, options);
  }, [offset, request, search, titleStartsWith]);

  const comics = data?.data.results;

  // MODAL PROFILE

  function handleClickProfile(event) {
    const idComics = event.currentTarget.id;
    const urlComic = `http://gateway.marvel.com/v1/public/comics/${
      idComics && idComics
    }`;
    if (!modalProfile) {
      fetch(`${urlComic}${key}`)
        .then((response) => response.json())
        .then((json) => setModalProfile(json));
    }
  }

  if (loading) return <Loading />;
  if (data)
    return (
      <section className="sectionContainer">
        <ModalProfile
          modalProfile={modalProfile}
          setModalProfile={setModalProfile}
        />
        <div id="main" className="mainComicsContent">
          <MainHeader
            search={search}
            setSearch={setSearch}
            data={data}
            setOffset={setOffset}
            count={COUNT}
          />

          <ul className="comicsContent">
            {comics.map((comic) => (
              <li key={comic.id} id={comic.id} onClick={handleClickProfile}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <p>{comic.title}</p>
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
