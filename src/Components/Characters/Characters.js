import React from "react";
import { CHARACTERS_GET } from "../../Api/api";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import "./Characters.css";
import { useFetch } from "../../Hooks/useFetch";
import { Search } from "../Search/Search";
import Marvel from "../../Assets/Marvel.svg";

export const Characters = () => {
  const { data, loading, error, request } = useFetch();

  // console.log(data);

  const [offset, setOffset] = React.useState(0);

  // const [activeContainer, setActiveContainer] = React.useState(false);
  const [search, setSearch] = React.useState(null);

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

  const characters = data?.data.results;

  if (loading) return <Loading />;
  if (data)
    return (
      <div id="main" style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <img className="marvelLeft" src={Marvel} alt="Marvel logo" />
        <h2 className="subTitle">MARVEL CHARACTERS</h2>
        <Search setSearch={setSearch} search={search} setOffset={setOffset} />

        {COUNT === 0 && (
          <h1 style={{ color: "var(--primary-grey)" }}>
            Personagem não encontrado!
          </h1>
        )}
        <ul className={`container`}>
          {characters.map((character) => (
            <li className="card" key={character.id}>
              <a href={`/character/${character.id}`}>
                <p>{character.name}</p>
                <img
                  className="imgCharacters"
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
              </a>
            </li>
          ))}

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
          />
        }
      </div>
    );
  else return null;
};
