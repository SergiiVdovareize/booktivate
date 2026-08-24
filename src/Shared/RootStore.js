import { BooksRepository } from "../Books/Books.repository.js";
import BooksStore from "../Books/BooksStore";
import ApiGateway from "./ApiGateway";
import UIStore from "./UIStore";
import UserStore from "./UserStore";

export class RootStore {
  constructor(booksRepository) {
    this.userStore = new UserStore(this);
    this.uiStore = new UIStore(this);

    const repository =
      booksRepository ||
      new BooksRepository(new ApiGateway(() => this.userStore.apiBase));

    this.booksStore = new BooksStore(this, repository);
  }
}

const rootStore = new RootStore();
export default rootStore;
