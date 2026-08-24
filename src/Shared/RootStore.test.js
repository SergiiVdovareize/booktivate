import { RootStore } from "./RootStore.js";

describe("RootStore Pattern", () => {
  let rootStore;
  let mockBooksRepository;

  const mockAllBooks = [{ id: 1, name: "Dune", author: "Frank Herbert" }];
  const mockPrivateBooks = [{ id: 1, name: "Dune", author: "Frank Herbert" }];

  beforeEach(() => {
    mockBooksRepository = {
      getBooks: jest.fn().mockResolvedValue(mockAllBooks),
      getPrivateBooks: jest.fn().mockResolvedValue(mockPrivateBooks),
      addBook: jest.fn().mockResolvedValue(true)
    };
    rootStore = new RootStore(mockBooksRepository);
  });

  test("instantiates child stores (userStore, uiStore, booksStore)", () => {
    expect(rootStore.userStore).toBeDefined();
    expect(rootStore.uiStore).toBeDefined();
    expect(rootStore.booksStore).toBeDefined();
    expect(rootStore.userStore.username).toBe("svdovareize");
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
      author: "William Gibson"
    });
    expect(rootStore.uiStore.isAddModalOpen).toBe(false);
  });
});
