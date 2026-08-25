import { makeAutoObservable } from "mobx";
import { DRAFT_USER_NAME } from "./config";

const STORAGE_KEY = "booktivate_username";

const getStoredUsername = () => {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored && stored.trim()) {
        return stored.trim();
      }
    }
  } catch (_) {}
  return DRAFT_USER_NAME;
};

const setStoredUsername = (name) => {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(STORAGE_KEY, name);
    }
  } catch (_) {}
};

export class UserStore {
  username = DRAFT_USER_NAME;
  draftUsername = DRAFT_USER_NAME;
  isEditingUsername = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    const initialUser = getStoredUsername();
    this.username = initialUser;
    this.draftUsername = initialUser;

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
    this.draftUsername = trimmed;
    this.isEditingUsername = false;
    setStoredUsername(trimmed);

    if (hasChanged && this.rootStore?.booksStore) {
      this.rootStore.booksStore.loadBooks();
    }
  };

  get apiBase() {
    return `https://tdd.demo.reaktivate.com/v1/books/${this.username}`;
  }
}

export default UserStore;
