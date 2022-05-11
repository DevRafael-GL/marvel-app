import React from "react";
import { Search } from "../Search/Search";

export const MainHeader = ({ search, setSearch, data, setOffset, count }) => {
  return (
    <div className="contentTop">
      <h2 className="subTitle">Marvel Comics</h2>
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
