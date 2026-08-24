import { DRAFT_USER_NAME } from "./config.js";
import { RootStore } from "./RootStore.js";

describe("RootStore Pattern", () => {
  let rootStore;
  let mockBooksRepository;

  const mockAllBooks = [{ id: 1, title: "Dune", author: "Frank Herbert" }];
  const mockPrivateBooks = [{ id: 1, title: "Dune", author: "Frank Herbert" }];

  beforeEach(() => {
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

  test("uiStore filter controls booksStore filteredBooks derivation", async () => {
    await rootStore.booksStore.loadBooks();

    rootStore.uiStore.setFilter("all");
    expect(rootStore.booksStore.filteredBooks).toEqual(mockAllBooks);

    rootStore.uiStore.setFilter("private");
    expect(rootStore.booksStore.filteredBooks).toEqual(mockPrivateBooks);
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
