import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import booksController from "./Books/BooksController";
import BooksView from "./Books/BooksView";
import HeaderView from "./Header/HeaderView";
import { ControllerProvider } from "./Shared/ControllerContext";

ReactDOM.render(
  <React.StrictMode>
    <ControllerProvider controller={booksController}>
      <HeaderView />
      <main className="main-content">
        <BooksView />
      </main>
    </ControllerProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
