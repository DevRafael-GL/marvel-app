import React from "react";
import { useParams } from "react-router-dom";
import { CHARACTER_PROFILE_GET } from "../../Api/api";
import { useFetch } from "../../Hooks/useFetch";
import { Header } from "../Header/Header";
import "./CharacterProfile.css";

export const CharacterProfile = () => {
  const ts = "1647634571";
  const hash = process.env.REACT_APP_API_HASH;
  const apikey = process.env.REACT_APP_API_KEY;
  const key = `?ts=${ts}&apikey=${apikey}&hash=${hash}`;

  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  const [comicData, setComicData] = React.useState([]);

  React.useEffect(() => {
    const { url } = CHARACTER_PROFILE_GET(id);
    request(url);
  }, [request, id]);

  const character = data?.data.results[0];
  const urlComic = `http://gateway.marvel.com/v1/public/characters/${id}/stories`;

  React.useEffect(() => {
    fetch(`${urlComic}${key}`)
      .then((response) => response.json())
      .then((json) => setComicData(json));
  }, [character, key, urlComic]);

  console.log(comicData);

  if (data)
    return (
      <>
        <section>
          <Header />
          <div className="profile">
            <div className="contentProfile">
              <img
                className="imgProfile"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />

              <div className="description">
                <h1>{character.name}</h1>
                <p>
                  {character.description
                    ? character.description
                    : "No description"}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2>Stories</h2>
          <ul></ul>
        </section>
      </>
    );
  else return null;
};
