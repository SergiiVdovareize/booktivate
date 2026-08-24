import { makeAutoObservable, runInAction } from "mobx";
import defaultBooksRepository from "./Books.repository.js";

export class BooksStore {
  allBooks = [];
  privateBooks = [];
  isLoading = false;

  constructor(rootStore, booksRepository = defaultBooksRepository) {
    this.rootStore = rootStore;
    this.booksRepository = booksRepository;
    makeAutoObservable(this, {
      rootStore: false,
      booksRepository: false
    });
  }

  get filteredBooks() {
    const filter = this.rootStore?.uiStore?.filter || "all";
    return filter === "private" ? this.privateBooks : this.allBooks;
  }

  get privateBooksCount() {
    return this.privateBooks.length;
  }

  loadBooks = async () => {
    this.isLoading = true;
    if (this.rootStore?.uiStore) {
      this.rootStore.uiStore.setErrorMessage(null);
    }

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
        if (this.rootStore?.uiStore) {
          this.rootStore.uiStore.setErrorMessage(error.message || "Failed to load books");
        }
        this.isLoading = false;
      });
    }
  };

  addBook = async () => {
    const uiStore = this.rootStore?.uiStore;
    const title = uiStore?.newBookName?.trim() || "";
    const author = uiStore?.newBookAuthor?.trim() || "";

    if (!title || !author) {
      if (uiStore) {
        uiStore.setErrorMessage("Both book title and author are required.");
      }
      return;
    }

    if (uiStore) {
      uiStore.setIsSubmitting(true);
      uiStore.setErrorMessage(null);
    }

    try {
      const success = await this.booksRepository.addBook({ name: title, author });

      if (success) {
        await this.loadBooks();
        runInAction(() => {
          if (uiStore) {
            uiStore.closeAddModal();
            uiStore.setIsSubmitting(false);
          }
        });
      } else {
        runInAction(() => {
          if (uiStore) {
            uiStore.setErrorMessage("Failed to add book.");
            uiStore.setIsSubmitting(false);
          }
        });
      }
    } catch (error) {
      runInAction(() => {
        if (uiStore) {
          uiStore.setErrorMessage(error.message || "Error occurred while adding book.");
          uiStore.setIsSubmitting(false);
        }
      });
    }
  };
}

export default BooksStore;
