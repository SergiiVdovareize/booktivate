import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import booksController from "./Books/BooksController";
import { ControllerProvider } from "./Shared/ControllerContext";
import HeaderView from "./Header/HeaderView";
import BooksView from "./Books/BooksView";

ReactDOM.render(
  <React.StrictMode>
    <ControllerProvider controller={booksController}>
      <HeaderView />
      <main className="main-content">
        <BooksView />
      </main>
    </ControllerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
