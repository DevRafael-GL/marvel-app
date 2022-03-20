import React from "react";
import { HEROES_GET } from "../../Api/api";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import "./Heroes.css";
import { useFetch } from "../../Hooks/useFetch";
import { Search } from "../Search/Search";

export const Heroes = () => {
  const { data, loading, error, request } = useFetch();

  console.log(data);

  const [offset, setOffset] = React.useState(0);

  const [activeContainer, setActiveContainer] = React.useState(false);
  const [search, setSearch] = React.useState(null);

  const LIMIT = 35;
  const TOTAL = data?.data.total;
  const COUNT = data?.data.count;
  const nameStartsWith = `nameStartsWith=${search}&`;

  React.useEffect(() => {
    const { url, options } = HEROES_GET(
      `${search ? nameStartsWith : ""}limit=${LIMIT}&offset=${offset}&`
    );
    request(url, options);
  }, [request, offset, nameStartsWith, search]);

  const characters = data?.data.results;

  if (loading) return <Loading />;
  if (data)
    return (
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <h2 className="subTitle">MARVEL CHARACTERS</h2>
        <Search setSearch={setSearch} search={search} />

        {COUNT === 0 && (
          <h1 style={{ color: "var(--primary-grey)" }}>
            Personagem não encontrado!
          </h1>
        )}
        <ul className={`container ${activeContainer ? "active" : ""}`}>
          {characters.map((character) => (
            <li className="card" key={character.id}>
              <p>{character.name}</p>
              <img
                className="img"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
            </li>
          ))}
          {COUNT >= LIMIT && (
            <Pagination
              limit={LIMIT}
              total={TOTAL}
              offset={offset}
              setOffset={setOffset}
            />
          )}

          {COUNT > 10 && !activeContainer && (
            <button
              onClick={() => setActiveContainer(true)}
              className="loadingMore"
            >
              Carregar Mais
            </button>
          )}
        </ul>
      </div>
    );
  else return null;
};
