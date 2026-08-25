import { makeAutoObservable } from "mobx";

const THEME_STORAGE_KEY = "booktivate_theme";

const getInitialTheme = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
    }
  } catch (_) {}
  return "light";
};

const applyThemeToDOM = (theme) => {
  try {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch (_) {}
};

export class UIStore {
  filter = "all"; // 'all' | 'private'
  sortBy = "default"; // 'default' | 'title' | 'author'
  sortOrder = "asc"; // 'asc' | 'desc'
  theme = "light"; // 'light' | 'dark'
  isAddModalOpen = false;
  newBookName = "";
  newBookAuthor = "";
  isSubmitting = false;
  errorMessage = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.theme = getInitialTheme();
    applyThemeToDOM(this.theme);
    makeAutoObservable(this, { rootStore: false });
  }

  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
    applyThemeToDOM(this.theme);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(THEME_STORAGE_KEY, this.theme);
      }
    } catch (_) {}
  };

  setFilter = (filter) => {
    this.filter = filter;
  };

  setSortBy = (sortBy) => {
    this.sortBy = sortBy;
  };

  setSortOrder = (sortOrder) => {
    this.sortOrder = sortOrder;
  };

  toggleSortOrder = () => {
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
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
