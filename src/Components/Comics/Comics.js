import React from "react";
import { Header } from "../Header/Header";
import { Masthead } from "../Header/Masthead";
import { ComicsContent } from "./ComicsContent";

export const Comics = () => {
  return (
    <>
      <Header />
      <Masthead />
      <ComicsContent />
    </>
  );
};
