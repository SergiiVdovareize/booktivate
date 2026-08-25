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
      booksRepository: false,
    });
  }

  get filteredBooks() {
    const filter = this.rootStore?.uiStore?.filter || "all";
    const sortBy = this.rootStore?.uiStore?.sortBy || "default";
    const sortOrder = this.rootStore?.uiStore?.sortOrder || "asc";

    const baseList = filter === "private" ? this.privateBooks : this.allBooks;
    const list = [...baseList];

    if (sortBy === "default") {
      return list;
    }

    return list.sort((a, b) => {
      const valA = (sortBy === "author" ? a.author : a.title || a.name || "")
        .trim()
        .toLowerCase();
      const valB = (sortBy === "author" ? b.author : b.title || b.name || "")
        .trim()
        .toLowerCase();
      const cmp = valA.localeCompare(valB);
      return sortOrder === "desc" ? -cmp : cmp;
    });
  }

  get allBooksCount() {
    return this.allBooks.length;
  }

  get privateBooksCount() {
    return this.privateBooks.length;
  }

  loadBooks = async () => {
    this.isLoading = true;
    if (this.rootStore?.uiStore) {
      this.rootStore.uiStore.setErrorMessage(null);
    }

    const currentUsername = this.rootStore?.userStore?.username || "";

    try {
      const [fetchedAllBooks, fetchedPrivateBooks] = await Promise.all([
        this.booksRepository.getBooks(currentUsername),
        this.booksRepository.getPrivateBooks(currentUsername),
      ]);

      const allBooks = fetchedAllBooks || [];
      const privateBooks = fetchedPrivateBooks || [];

      const getBookKey = (b) => {
        if (b.id && typeof b.id === "number") return `id:${b.id}`;
        const titleKey = (b.title || b.name || "").trim().toLowerCase();
        const authorKey = (b.author || "").trim().toLowerCase();
        return `key:${titleKey}::${authorKey}`;
      };

      const privateKeys = new Set(privateBooks.map(getBookKey));

      for (const book of allBooks) {
        if (
          privateKeys.has(getBookKey(book)) ||
          (book.ownerId &&
            currentUsername &&
            book.ownerId.toLowerCase() === currentUsername.toLowerCase())
        ) {
          book.isPrivate = true;
        }
      }

      runInAction(() => {
        this.allBooks = allBooks;
        this.privateBooks = privateBooks;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        if (this.rootStore?.uiStore) {
          this.rootStore.uiStore.setErrorMessage(
            error.message || "Failed to load books",
          );
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
      const success = await this.booksRepository.addBook({
        name: title,
        author,
      });

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
          uiStore.setErrorMessage(
            error.message || "Error occurred while adding book.",
          );
          uiStore.setIsSubmitting(false);
        }
      });
    }
  };
}

export default BooksStore;
