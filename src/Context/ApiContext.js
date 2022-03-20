import React, { createContext } from "react";

export const GlobalContext = createContext();

const ApiContext = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default ApiContext;
