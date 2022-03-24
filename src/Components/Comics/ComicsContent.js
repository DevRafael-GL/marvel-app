import React from "react";
import { CHARACTER_COMICS_GET } from "../../Api/api";
import { useFetch } from "../../Hooks/useFetch";
import { Header } from "../Header/Header";
import { Loading } from "../Loading/Loading";
import { Pagination } from "../Pagination/Pagination";
import Video from "../../Assets/video/JUDGMENT DAY Teaser Trailer _ Marvel Comics.mp4";
import "./Comics.css";
import { Masthead } from "../Header/Masthead";
import { Search } from "../Search/Search";

export const ComicsContent = () => {
  const { data, loading, error, request } = useFetch();
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState(null);

  const LIMIT = 35;
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

  if (loading) return <Loading />;
  if (data)
    return (
      <section className="sectionContainer">
        <div id="main" className="mainContent">
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
              <li key={comic.id}>
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
