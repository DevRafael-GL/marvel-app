import React from "react";
import "./Search.css";

export const Search = ({ setSearch, search }) => {
  const [value, setValue] = React.useState("");

  function inputSearch(e) {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
      // e.target.value = "";
    }
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          onChange={({ target }) => setValue(target.value)}
          onKeyDown={(e) => inputSearch(e)}
          value={value}
          placeholder="Search"
        />
      </div>
    </>
  );
};
