import React, { createContext, useContext } from "react";
import defaultBooksController from "../Books/BooksController";

const ControllerContext = createContext(defaultBooksController);

export const ControllerProvider = ({ controller = defaultBooksController, children }) => (
  <ControllerContext.Provider value={controller}>
    {children}
  </ControllerContext.Provider>
);

export const useController = () => {
  const controller = useContext(ControllerContext);
  if (!controller) {
    throw new Error("useController must be used within a ControllerProvider");
  }
  return controller;
};

export default ControllerContext;
