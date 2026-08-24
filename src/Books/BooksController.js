import { makeAutoObservable, runInAction } from "mobx";
import defaultBooksRepository from "./Books.repository.js";

export class BooksController {
  allBooks = [];
  privateBooks = [];
  isLoading = false;
  errorMessage = null;

  constructor(booksRepository = defaultBooksRepository) {
    this.booksRepository = booksRepository;
    makeAutoObservable(this, {
      booksRepository: false
    });
  }

  loadBooks = async () => {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const [allBooks, privateBooks] = await Promise.all([
        this.booksRepository.getBooks(),
        this.booksRepository.getPrivateBooks()
      ]);

      runInAction(() => {
        this.allBooks = allBooks || [];
        this.privateBooks = privateBooks || [];
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error.message || "Failed to load books";
        this.isLoading = false;
      });
    }
  };
}

const booksController = new BooksController();
export default booksController;
