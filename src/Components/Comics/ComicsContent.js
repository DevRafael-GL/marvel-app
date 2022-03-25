import React from "react";
import { CHARACTER_COMICS_GET } from "../../Api/api";
import { useFetch } from "../../Hooks/useFetch";
import { Loading } from "../Loading/Loading";
import { Pagination } from "../Pagination/Pagination";
import "./Comics.css";
import { Search } from "../Search/Search";
import { ModalProfile } from "../Helper/ModalProfile";

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

  const LIMIT = 36;
  const TOTAL = data?.data.total;
  const COUNT = data?.data.count;
  const titleStartsWith = `titleStartsWith=${search}&`;

  React.useEffect(() => {
    const { url, options } = CHARACTER_COMICS_GET(
      `${search ? titleStartsWith : ""}limit=${LIMIT}&offset=${offset}&`
    );
    request(url, options);
  }, [offset, request, search, titleStartsWith]);

  console.log(data);

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
    console.log(idComics);
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
          <h2 className="subTitle">Marvel Comics</h2>
          <Search setSearch={setSearch} search={search} setOffset={setOffset} />

          <p className="results">{`${data?.data.total} Results`}</p>

          {COUNT === 0 && (
            <h1 style={{ color: "var(--primary-grey)" }}>
              Personagem não encontrado!
            </h1>
          )}

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
