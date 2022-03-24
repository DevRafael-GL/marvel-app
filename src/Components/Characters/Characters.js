import React from "react";
import { Header } from "../Header/Header";
import { Masthead } from "../Header/Masthead";
import { CharactersContent } from "./CharactersContent";

export const Characters = () => {
  return (
    <>
      <Header />
      <Masthead />
      <CharactersContent />
    </>
  );
};
