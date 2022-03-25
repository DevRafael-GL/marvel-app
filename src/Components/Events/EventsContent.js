import React from "react";
import { useFetch } from "../../Hooks/useFetch";
import { Loading } from "../Loading/Loading";
import { Pagination } from "../Pagination/Pagination";
import { Search } from "../Search/Search";
import { ModalProfile } from "../Helper/ModalProfile";
import { EVENTS_GET } from "../../Api/api";
import "./Events.css";

export const EventContent = () => {
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
    const { url, options } = EVENTS_GET(
      `${search ? titleStartsWith : ""}limit=${LIMIT}&offset=${offset}&`
    );
    request(url, options);
  }, [offset, request, search, titleStartsWith]);

  console.log(data);

  const events = data?.data.results;

  // MODAL PROFILE

  function handleClickProfile(event) {
    const idEvents = event.currentTarget.id;
    const urlEvents = `http://gateway.marvel.com/v1/public/events/${
      idEvents && idEvents
    }`;
    if (!modalProfile) {
      fetch(`${urlEvents}${key}`)
        .then((response) => response.json())
        .then((json) => setModalProfile(json));
    }
    console.log(idEvents);
  }

  if (loading) return <Loading />;
  if (data)
    return (
      <section className="sectionContainer">
        <ModalProfile
          modalProfile={modalProfile}
          setModalProfile={setModalProfile}
        />
        <div id="main" className="mainEventsContent">
          <h2 className="subTitle">Marvel Events</h2>
          <Search setSearch={setSearch} search={search} setOffset={setOffset} />

          <p className="results">{`${data?.data.total} Results`}</p>

          {COUNT === 0 && (
            <h1 style={{ color: "var(--primary-grey)" }}>
              Personagem não encontrado!
            </h1>
          )}

          <ul className="eventsContent">
            {events.map((event) => (
              <li key={event.id} id={event.id} onClick={handleClickProfile}>
                <img
                  src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                  alt={event.title}
                />
                <p>{event.title}</p>
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
