import React from "react";
import { useParams } from "react-router-dom";
import { CHARACTER_PROFILE_GET, CHARACTER_STORIES_GET } from "../../Api/api";
import { useFetch } from "../../Hooks/useFetch";
import { Header } from "../Header/Header";
import "./CharacterProfile.css";

export const CharacterProfile = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url } = CHARACTER_PROFILE_GET(id);
    request(url);
  }, [request, id]);

  React.useEffect(() => {
    const { url } = CHARACTER_STORIES_GET(id);
    request(url);
  }, [request, id]);

  const character = data?.data.results[0];
  console.log(character);

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
          <ul>
            {character.stories.items.map((storie) => (
              <li>{storie.name}</li>
            ))}
          </ul>
        </section>
      </>
    );
  else return null;
};
