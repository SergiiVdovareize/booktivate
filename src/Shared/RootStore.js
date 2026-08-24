import UserStore from "./UserStore";
import UIStore from "./UIStore";
import BooksStore from "../Books/BooksStore";
import defaultBooksRepository from "../Books/Books.repository.js";

export class RootStore {
  constructor(booksRepository = defaultBooksRepository) {
    this.userStore = new UserStore(this);
    this.uiStore = new UIStore(this);
    this.booksStore = new BooksStore(this, booksRepository);
  }
}

const rootStore = new RootStore();
export default rootStore;
