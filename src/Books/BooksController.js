import { makeAutoObservable } from "mobx";
import defaultRootStore, { RootStore } from "../Shared/RootStore.js";

export class BooksController {
  constructor(rootStoreOrRepository) {
    if (
      rootStoreOrRepository &&
      rootStoreOrRepository.userStore &&
      rootStoreOrRepository.booksStore
    ) {
      this.rootStore = rootStoreOrRepository;
    } else {
      this.rootStore = new RootStore(rootStoreOrRepository);
    }
    makeAutoObservable(this, { rootStore: false });
  }

  get username() {
    return this.rootStore.userStore.username;
  }

  get draftUsername() {
    return this.rootStore.userStore.draftUsername;
  }

  get isEditingUsername() {
    return this.rootStore.userStore.isEditingUsername;
  }

  startEditingUsername = () => {
    this.rootStore.userStore.startEditingUsername();
  };

  cancelEditingUsername = () => {
    this.rootStore.userStore.cancelEditingUsername();
  };

  setDraftUsername = (name) => {
    this.rootStore.userStore.setDraftUsername(name);
  };

  applyUsername = () => {
    this.rootStore.userStore.applyUsername();
  };

  get allBooks() {
    return this.rootStore.booksStore.allBooks;
  }

  get privateBooks() {
    return this.rootStore.booksStore.privateBooks;
  }

  get isLoading() {
    return this.rootStore.booksStore.isLoading;
  }

  get filter() {
    return this.rootStore.uiStore.filter;
  }

  get isAddModalOpen() {
    return this.rootStore.uiStore.isAddModalOpen;
  }

  get newBookName() {
    return this.rootStore.uiStore.newBookName;
  }

  get newBookAuthor() {
    return this.rootStore.uiStore.newBookAuthor;
  }

  get isSubmitting() {
    return this.rootStore.uiStore.isSubmitting;
  }

  get errorMessage() {
    return this.rootStore.uiStore.errorMessage;
  }

  get filteredBooks() {
    return this.rootStore.booksStore.filteredBooks;
  }

  get privateBooksCount() {
    return this.rootStore.booksStore.privateBooksCount;
  }

  setFilter = (filter) => {
    this.rootStore.uiStore.setFilter(filter);
  };

  openAddModal = () => {
    this.rootStore.uiStore.openAddModal();
  };

  closeAddModal = () => {
    this.rootStore.uiStore.closeAddModal();
  };

  setNewBookName = (name) => {
    this.rootStore.uiStore.setNewBookName(name);
  };

  setNewBookAuthor = (author) => {
    this.rootStore.uiStore.setNewBookAuthor(author);
  };

  loadBooks = () => {
    return this.rootStore.booksStore.loadBooks();
  };

  addBook = () => {
    return this.rootStore.booksStore.addBook();
  };
}

const booksController = new BooksController(defaultRootStore);
export default booksController;
