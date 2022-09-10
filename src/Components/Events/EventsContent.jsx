import React from "react";
import { useFetch } from "../../Hooks/useFetch";
import { Loading } from "../Loading/Loading";
import { Pagination } from "../Pagination/Pagination";
import { ModalProfile } from "../ModalProfile/ModalProfile";
import { EVENTS_GET } from "../../Api/api";
import { Image } from "../Helper/Image";
import { MainHeader } from "../Helper/MainHeader";
import { key } from "../../Api/apiKey";
import styles from "./Events.module.css";

export const EventContent = () => {
  const { data, loading, request } = useFetch();
  const [offset, setOffset] = React.useState(0);
  const [search, setSearch] = React.useState(null);
  const [modalProfile, setModalProfile] = React.useState(null);

  const LIMIT = 20;
  const TOTAL = data?.data.total;
  const COUNT = data?.data.count;
  const nameStartsWith = `nameStartsWith=${search}&`;

  React.useEffect(() => {
    const { url, options } = EVENTS_GET(
      `${search ? nameStartsWith : ""}limit=${LIMIT}&offset=${offset}&`
    );
    request(url, options);
  }, [offset, request, search, nameStartsWith]);

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
  }

  if (loading) return <Loading />;
  if (data)
    return (
      <section className={styles.sectionContainer}>
        <ModalProfile
          modalProfile={modalProfile}
          setModalProfile={setModalProfile}
        />
        <div id="main" className={styles.mainEventsContent}>
          <MainHeader
            search={search}
            setSearch={setSearch}
            data={data}
            setOffset={setOffset}
            count={COUNT}
          />

          <ul className={styles.eventsContent}>
            {events.map((event) => (
              <li key={event.id} id={event.id} onClick={handleClickProfile}>
                <Image
                  src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                  alt={event.title}
                />
                <div className={styles.eventName}>
                  <div className={styles.divisor}></div>
                  <p>{event.title}</p>
                </div>
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
