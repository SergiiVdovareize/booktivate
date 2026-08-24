import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import booksController from "./Books/BooksController";
import HeaderView from "./Header/HeaderView";
import BooksView from "./Books/BooksView";

function App() {
  return (
    <>
      <HeaderView controller={booksController} />
      <main className="main-content">
        <BooksView controller={booksController} />
      </main>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
