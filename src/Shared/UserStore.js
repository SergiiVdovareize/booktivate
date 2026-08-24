import { makeAutoObservable } from "mobx";
import { DRAFT_USER_NAME } from "./config";

export class UserStore {
  username = DRAFT_USER_NAME;
  draftUsername = DRAFT_USER_NAME;
  isEditingUsername = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  startEditingUsername = () => {
    this.draftUsername = this.username;
    this.isEditingUsername = true;
  };

  cancelEditingUsername = () => {
    this.draftUsername = this.username;
    this.isEditingUsername = false;
  };

  setDraftUsername = (name) => {
    this.draftUsername = name;
  };

  applyUsername = () => {
    const trimmed = this.draftUsername ? this.draftUsername.trim() : "";
    if (!trimmed) return;

    const hasChanged = trimmed !== this.username;
    this.username = trimmed;
    this.isEditingUsername = false;

    if (hasChanged && this.rootStore?.booksStore) {
      this.rootStore.booksStore.loadBooks();
    }
  };

  get apiBase() {
    return `https://tdd.demo.reaktivate.com/v1/books/${this.username}`;
  }
}

export default UserStore;
