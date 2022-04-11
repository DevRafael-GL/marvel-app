import React from "react";
import "./Pagination.css";

export const Pagination = ({ limit, total, offset, setOffset, count }) => {
  const width = window.screen.width;

  let MAX_ITEMS = 7;
  if (width < 600) {
    MAX_ITEMS = 3;
  }
  const MAX_LEFT = (MAX_ITEMS - 1) / 2;

  const current = offset ? offset / limit + 1 : 1;
  const totalPages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);
  const last = Math.max(current + MAX_LEFT, 1);

  function onPageChange(page) {
    const main = document.querySelector("#main").offsetTop - 40;
    console.log(main);
    setOffset((page - 1) * limit);

    window.scroll({
      top: main,
      behavior: "smooth",
    });
  }

  return (
    <div className="paginationContainer">
      <ul className={"pagination"}>
        {width > 600 && (
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
        )}
        {first > 1 && width > 600 && (
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
            <span style={{ color: "var(--primary-silver)" }}>...</span>
          </>
        )}

        {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
          .map((item, index) => index + first)
          .map((page) => (
            <li key={page}>
              {page <= totalPages && (
                <button
                  onClick={() => onPageChange(page)}
                  className={page === current ? "btn active" : null}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

        {current !== totalPages && last < totalPages && width > 600 && (
          <>
            <span style={{ color: "var(--primary-silver)" }}>...</span>
            <li>
              <button
                onClick={() => {
                  onPageChange(totalPages);
                }}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {width > 600 && (
          <li>
            <button
              onClick={() => {
                onPageChange(current + 1);
              }}
              disabled={current === totalPages}
            >
              Next
            </button>
          </li>
        )}
      </ul>

      {/* MOBILE */}

      {width < 600 && (
        <div className="prevNextMobile">
          <>
            <li>
              <button
                onClick={() => {
                  onPageChange(1);
                }}
              >
                First
              </button>
            </li>
          </>
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
          <li>
            <button
              onClick={() => {
                onPageChange(current + 1);
              }}
              disabled={current === totalPages}
            >
              Next
            </button>
          </li>
          <>
            <li>
              <button
                onClick={() => {
                  onPageChange(totalPages);
                }}
              >
                Last
              </button>
            </li>
          </>
        </div>
      )}
    </div>
  );
};
