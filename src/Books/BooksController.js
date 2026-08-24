import { makeAutoObservable, runInAction } from "mobx";
import defaultBooksRepository from "./Books.repository.js";

export class BooksController {
  allBooks = [];
  privateBooks = [];
  filter = "all"; // 'all' | 'private'
  isLoading = false;
  errorMessage = null;

  // Add Book Modal & Form Observables
  isAddModalOpen = false;
  newBookName = "";
  newBookAuthor = "";
  isSubmitting = false;

  constructor(booksRepository = defaultBooksRepository) {
    this.booksRepository = booksRepository;
    makeAutoObservable(this, {
      booksRepository: false
    });
  }

  get filteredBooks() {
    return this.filter === "private" ? this.privateBooks : this.allBooks;
  }

  get privateBooksCount() {
    return this.privateBooks.length;
  }

  setFilter = (filter) => {
    this.filter = filter;
  };

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

  openAddModal = () => {
    this.isAddModalOpen = true;
    this.errorMessage = null;
  };

  closeAddModal = () => {
    this.isAddModalOpen = false;
    this.newBookName = "";
    this.newBookAuthor = "";
    this.errorMessage = null;
  };

  setNewBookName = (name) => {
    this.newBookName = name;
  };

  setNewBookAuthor = (author) => {
    this.newBookAuthor = author;
  };

  addBook = async () => {
    if (!this.newBookName.trim() || !this.newBookAuthor.trim()) {
      this.errorMessage = "Both book title and author are required.";
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    try {
      const success = await this.booksRepository.addBook({
        name: this.newBookName.trim(),
        author: this.newBookAuthor.trim()
      });

      if (success) {
        await this.loadBooks();
        runInAction(() => {
          this.isAddModalOpen = false;
          this.newBookName = "";
          this.newBookAuthor = "";
          this.isSubmitting = false;
        });
      } else {
        runInAction(() => {
          this.errorMessage = "Failed to add book.";
          this.isSubmitting = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error.message || "Error occurred while adding book.";
        this.isSubmitting = false;
      });
    }
  };
}

const booksController = new BooksController();
export default booksController;
