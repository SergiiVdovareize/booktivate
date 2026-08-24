import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import booksController from "./Books/BooksController";
import BooksView from "./Books/BooksView";

const rootElement = document.getElementById("root");
ReactDOM.render(<BooksView controller={booksController} />, rootElement);
