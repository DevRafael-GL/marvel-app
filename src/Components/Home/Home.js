import React from "react";
import { CharactersContent } from "../Characters/CharactersContent";
import { Masthead } from "../Header/Masthead";
import { LandingPage } from "../LandingPage/LandingPage";

export const Home = () => {
  const width = window.screen.width;
  return (
    <>
      {width <= 600 ? <Masthead /> : <LandingPage />}

      <CharactersContent />
    </>
  );
};
