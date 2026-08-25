import { DRAFT_USER_NAME } from "../Shared/config.js";
import { BooksController } from "./BooksController.js";

describe("BooksController", () => {
  let controller;
  let mockBooksRepository;

  const sampleAllBooks = [
    {
      id: 1,
      name: "Wind in the Willows",
      author: "Kenneth Grahame",
      ownerId: "demouser",
    },
  ];

  const samplePrivateBooks = [
    {
      id: 2,
      name: "I, Robot",
      author: "Isaac Asimov",
      ownerId: "demouser",
    },
  ];

  beforeEach(() => {
    mockBooksRepository = {
      getBooks: jest.fn().mockResolvedValue(sampleAllBooks),
      getPrivateBooks: jest.fn().mockResolvedValue(samplePrivateBooks),
      addBook: jest.fn().mockResolvedValue(true),
    };

    controller = new BooksController(mockBooksRepository);
  });

  test("initializes with default state from stores", () => {
    expect(controller.username).toBe(DRAFT_USER_NAME);
    expect(controller.draftUsername).toBe(DRAFT_USER_NAME);
    expect(controller.isEditingUsername).toBe(false);
    expect(controller.allBooks).toEqual([]);
    expect(controller.privateBooks).toEqual([]);
    expect(controller.isLoading).toBe(false);
    expect(controller.filter).toBe("all");
    expect(controller.isAddModalOpen).toBe(false);
    expect(controller.newBookName).toBe("");
    expect(controller.newBookAuthor).toBe("");
    expect(controller.isSubmitting).toBe(false);
    expect(controller.errorMessage).toBeNull();
    expect(controller.filteredBooks).toEqual([]);
    expect(controller.allBooksCount).toBe(0);
    expect(controller.privateBooksCount).toBe(0);
  });

  test("proxies userStore username editing actions", () => {
    controller.startEditingUsername();
    expect(controller.isEditingUsername).toBe(true);

    controller.setDraftUsername("smith");
    expect(controller.draftUsername).toBe("smith");

    controller.cancelEditingUsername();
    expect(controller.isEditingUsername).toBe(false);
    expect(controller.draftUsername).toBe(DRAFT_USER_NAME);

    controller.startEditingUsername();
    controller.setDraftUsername("smith");
    controller.applyUsername();

    expect(controller.isEditingUsername).toBe(false);
    expect(controller.username).toBe("smith");
    expect(mockBooksRepository.getBooks).toHaveBeenCalled();
  });

  test("loadBooks action fetches all & private books and updates MobX observables", async () => {
    const loadPromise = controller.loadBooks();
    expect(controller.isLoading).toBe(true);

    await loadPromise;

    expect(mockBooksRepository.getBooks).toHaveBeenCalled();
    expect(mockBooksRepository.getPrivateBooks).toHaveBeenCalled();
    expect(controller.allBooks).toEqual(sampleAllBooks);
    expect(controller.privateBooks).toEqual(samplePrivateBooks);
    expect(controller.isLoading).toBe(false);
    expect(controller.errorMessage).toBeNull();
  });

  test("loadBooks sets errorMessage on failure", async () => {
    mockBooksRepository.getBooks.mockRejectedValue(new Error("Network Error"));
    mockBooksRepository.getPrivateBooks.mockResolvedValue([]);

    await controller.loadBooks();

    expect(controller.isLoading).toBe(false);
    expect(controller.errorMessage).toBe("Network Error");
    expect(controller.allBooks).toEqual([]);
  });

  describe("Filter Switch & Computed Properties", () => {
    test("filteredBooks returns allBooks when filter is 'all'", async () => {
      await controller.loadBooks();
      controller.setFilter("all");

      expect(controller.filter).toBe("all");
      expect(controller.filteredBooks).toEqual(sampleAllBooks);
    });

    test("filteredBooks returns privateBooks when filter is 'private'", async () => {
      await controller.loadBooks();
      controller.setFilter("private");

      expect(controller.filter).toBe("private");
      expect(controller.filteredBooks).toEqual(samplePrivateBooks);
    });

    test("privateBooksCount returns count of private books when loaded", async () => {
      await controller.loadBooks();
      expect(controller.privateBooksCount).toBe(1);
    });
  });

  describe("Add Book Modal & Actions", () => {
    test("openAddModal opens modal and closeAddModal resets form fields", () => {
      controller.openAddModal();
      expect(controller.isAddModalOpen).toBe(true);

      controller.setNewBookName("Clean Code");
      controller.setNewBookAuthor("Robert C. Martin");

      expect(controller.newBookName).toBe("Clean Code");
      expect(controller.newBookAuthor).toBe("Robert C. Martin");

      controller.closeAddModal();
      expect(controller.isAddModalOpen).toBe(false);
      expect(controller.newBookName).toBe("");
      expect(controller.newBookAuthor).toBe("");
    });

    test("addBook requires non-empty name and author", async () => {
      controller.openAddModal();
      controller.setNewBookName("   ");
      controller.setNewBookAuthor("");

      await controller.addBook();

      expect(mockBooksRepository.addBook).not.toHaveBeenCalled();
      expect(controller.errorMessage).toBe(
        "Both book title and author are required.",
      );
    });

    test("addBook posts new book via repository, reloads books, and closes modal", async () => {
      mockBooksRepository.addBook.mockResolvedValue(true);
      controller.openAddModal();
      controller.setNewBookName("Refactoring");
      controller.setNewBookAuthor("Martin Fowler");

      await controller.addBook();

      expect(mockBooksRepository.addBook).toHaveBeenCalledWith({
        name: "Refactoring",
        author: "Martin Fowler",
      });
      expect(mockBooksRepository.getBooks).toHaveBeenCalled();
      expect(controller.isAddModalOpen).toBe(false);
      expect(controller.newBookName).toBe("");
      expect(controller.newBookAuthor).toBe("");
      expect(controller.isSubmitting).toBe(false);
    });

    test("addBook handles repository returning false", async () => {
      mockBooksRepository.addBook.mockResolvedValue(false);
      controller.openAddModal();
      controller.setNewBookName("Failed Book");
      controller.setNewBookAuthor("Unknown");

      await controller.addBook();

      expect(controller.errorMessage).toBe("Failed to add book.");
      expect(controller.isSubmitting).toBe(false);
    });

    test("addBook handles network or server exception", async () => {
      mockBooksRepository.addBook.mockRejectedValue(new Error("Server Error"));
      controller.openAddModal();
      controller.setNewBookName("Exception Book");
      controller.setNewBookAuthor("Unknown");

      await controller.addBook();

      expect(controller.errorMessage).toBe("Server Error");
      expect(controller.isSubmitting).toBe(false);
    });
  });
});
