import React from "react";
import { CharactersContent } from "../Components/Characters/CharactersMainContent";
import { Masthead } from "../Components/Header/Masthead";
import { LandingPage } from "../Components/LandingPage/LandingPage";

export const Home = () => {
  const width = window.screen.width;
  return (
    <>
      {width <= 600 ? <Masthead /> : <LandingPage />}

      <CharactersContent />
    </>
  );
};
