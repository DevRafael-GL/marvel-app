import React from "react";
import "./Pagination.css";

export const Pagination = ({ limit, total, offset, setOffset }) => {
  const MAX_ITEMS = 7;
  const MAX_LEFT = (MAX_ITEMS - 1) / 2;

  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  console.log(pages);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className={"pagination"}>
      <li>
        <button
          onClick={() => {
            onPageChange(current - 1);
          }}
          disabled={current === 1}
        >
          Prev
        </button>
      </li>

      {first > 1 && (
        <>
          <li>
            <button
              onClick={() => {
                onPageChange(1);
              }}
            >
              1
            </button>
          </li>
          <span style={{ margin: "0 1rem" }}>...</span>
        </>
      )}

      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((item, index) => index + first)
        .map((page) => (
          <li key={page}>
            {page <= pages && (
              <button
                onClick={() => onPageChange(page)}
                className={page === current ? "btn active" : null}
              >
                {page}
              </button>
            )}
          </li>
        ))}

      {
        <>
          <li>
            <span style={{ margin: "0 1rem" }}>...</span>
            <button
              onClick={() => {
                onPageChange(pages);
              }}
            >
              {pages}
            </button>
          </li>
        </>
      }

      <li>
        <button
          onClick={() => {
            onPageChange(current + 1);
          }}
          disabled={current === pages}
        >
          Next
        </button>
      </li>
    </ul>
  );
};
