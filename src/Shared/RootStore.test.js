import { DRAFT_USER_NAME } from "./config.js";
import { RootStore } from "./RootStore.js";

describe("RootStore Pattern", () => {
  let rootStore;
  let mockBooksRepository;

  const mockAllBooks = [{ id: 1, title: "Dune", author: "Frank Herbert" }];
  const mockPrivateBooks = [{ id: 1, title: "Dune", author: "Frank Herbert" }];

  beforeEach(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.clear();
    }
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
    mockBooksRepository = {
      getBooks: jest.fn().mockResolvedValue(mockAllBooks),
      getPrivateBooks: jest.fn().mockResolvedValue(mockPrivateBooks),
      addBook: jest.fn().mockResolvedValue(true),
    };
    rootStore = new RootStore(mockBooksRepository);
  });

  test("instantiates child stores (userStore, uiStore, booksStore)", () => {
    expect(rootStore.userStore).toBeDefined();
    expect(rootStore.uiStore).toBeDefined();
    expect(rootStore.booksStore).toBeDefined();
    expect(rootStore.userStore.username).toBe(DRAFT_USER_NAME);
    expect(rootStore.userStore.isEditingUsername).toBe(false);
  });

  test("userStore supports startEditingUsername, cancelEditingUsername, and applyUsername", () => {
    rootStore.userStore.startEditingUsername();
    expect(rootStore.userStore.isEditingUsername).toBe(true);

    rootStore.userStore.setDraftUsername("smith");
    expect(rootStore.userStore.draftUsername).toBe("smith");
    expect(rootStore.userStore.username).toBe(DRAFT_USER_NAME);

    rootStore.userStore.cancelEditingUsername();
    expect(rootStore.userStore.isEditingUsername).toBe(false);
    expect(rootStore.userStore.draftUsername).toBe(DRAFT_USER_NAME);

    rootStore.userStore.startEditingUsername();
    rootStore.userStore.setDraftUsername("smith");
    rootStore.userStore.applyUsername();

    expect(rootStore.userStore.isEditingUsername).toBe(false);
    expect(rootStore.userStore.username).toBe("smith");
    expect(rootStore.userStore.apiBase).toBe(
      "https://tdd.demo.reaktivate.com/v1/books/smith",
    );
    expect(mockBooksRepository.getBooks).toHaveBeenCalled();
  });

  test("userStore persists username to sessionStorage and reuses it on store initialization", () => {
    rootStore.userStore.startEditingUsername();
    rootStore.userStore.setDraftUsername("svdovareize");
    rootStore.userStore.applyUsername();

    expect(sessionStorage.getItem("booktivate_username")).toBe("svdovareize");

    // Simulate new session / page refresh
    const refreshedRootStore = new RootStore(mockBooksRepository);
    expect(refreshedRootStore.userStore.username).toBe("svdovareize");
  });

  test("uiStore supports theme state toggling and localStorage persistence", () => {
    expect(rootStore.uiStore.theme).toBe("light");

    rootStore.uiStore.toggleTheme();
    expect(rootStore.uiStore.theme).toBe("dark");
    expect(localStorage.getItem("booktivate_theme")).toBe("dark");

    rootStore.uiStore.toggleTheme();
    expect(rootStore.uiStore.theme).toBe("light");
    expect(localStorage.getItem("booktivate_theme")).toBe("light");
  });

  test("uiStore filter controls booksStore filteredBooks derivation", async () => {
    await rootStore.booksStore.loadBooks();

    rootStore.uiStore.setFilter("all");
    expect(rootStore.booksStore.filteredBooks).toEqual(mockAllBooks);

    rootStore.uiStore.setFilter("private");
    expect(rootStore.booksStore.filteredBooks).toEqual(mockPrivateBooks);
  });

  test("supports sorting books by title or author with ascending and descending order", async () => {
    const unsortedBooks = [
      { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
      { id: 2, title: "Clean Code", author: "Robert C. Martin" },
      { id: 3, title: "I, Robot", author: "Isaac Asimov" },
    ];
    mockBooksRepository.getBooks.mockResolvedValue(unsortedBooks);

    await rootStore.booksStore.loadBooks();

    // Default order
    rootStore.uiStore.setSortBy("default");
    expect(rootStore.booksStore.filteredBooks.map((b) => b.title)).toEqual([
      "The Hobbit",
      "Clean Code",
      "I, Robot",
    ]);

    // Sort by title ASC
    rootStore.uiStore.setSortBy("title");
    rootStore.uiStore.setSortOrder("asc");
    expect(rootStore.booksStore.filteredBooks.map((b) => b.title)).toEqual([
      "Clean Code",
      "I, Robot",
      "The Hobbit",
    ]);

    // Sort by title DESC
    rootStore.uiStore.toggleSortOrder();
    expect(rootStore.booksStore.filteredBooks.map((b) => b.title)).toEqual([
      "The Hobbit",
      "I, Robot",
      "Clean Code",
    ]);

    // Sort by author ASC
    rootStore.uiStore.setSortBy("author");
    rootStore.uiStore.setSortOrder("asc");
    expect(rootStore.booksStore.filteredBooks.map((b) => b.author)).toEqual([
      "Isaac Asimov",
      "J.R.R. Tolkien",
      "Robert C. Martin",
    ]);
  });

  test("booksStore.addBook uses uiStore form observables and triggers loadBooks", async () => {
    await rootStore.booksStore.loadBooks();

    rootStore.uiStore.openAddModal();
    rootStore.uiStore.setNewBookName("Neuromancer");
    rootStore.uiStore.setNewBookAuthor("William Gibson");

    await rootStore.booksStore.addBook();

    expect(mockBooksRepository.addBook).toHaveBeenCalledWith({
      name: "Neuromancer",
      author: "William Gibson",
    });
    expect(rootStore.uiStore.isAddModalOpen).toBe(false);
  });
});
