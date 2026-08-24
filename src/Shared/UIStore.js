import { makeAutoObservable } from "mobx";

export class UIStore {
  filter = "all"; // 'all' | 'private'
  isAddModalOpen = false;
  newBookName = "";
  newBookAuthor = "";
  isSubmitting = false;
  errorMessage = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setFilter = (filter) => {
    this.filter = filter;
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

  setIsSubmitting = (val) => {
    this.isSubmitting = val;
  };

  setErrorMessage = (msg) => {
    this.errorMessage = msg;
  };
}

export default UIStore;
