import React from "react";
import { useLocation } from "react-router-dom";
import { Search } from "../Search/Search";

export const MainHeader = ({ search, setSearch, data, setOffset, count }) => {
  const { pathname } = useLocation();
  let pathTitle;

  switch (pathname) {
    case "/comics":
      pathTitle = "Comics";
      break;
    case "/events":
      pathTitle = "Events";
      break;

    default:
      pathTitle = "Characters";
      break;
  }

  return (
    <div className="contentTop">
      <h2 className="subTitle">Marvel {pathTitle}</h2>
      <Search setSearch={setSearch} search={search} setOffset={setOffset} />

      <p className="results">{`${data?.data.total} Results`}</p>

      {count === 0 && (
        <h1 style={{ color: "var(--primary-grey)" }}>
          Personagem não encontrado!
        </h1>
      )}
    </div>
  );
};
