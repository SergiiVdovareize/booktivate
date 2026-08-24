import { BooksController } from "./BooksController.js";

describe("BooksController", () => {
  let controller;
  let mockBooksRepository;

  const sampleAllBooks = [
    { id: 1, name: "Wind in the Willows", author: "Kenneth Grahame" },
    { id: 2, name: "I, Robot", author: "Isaac Asimov" }
  ];

  const samplePrivateBooks = [
    { id: 2, name: "I, Robot", author: "Isaac Asimov" }
  ];

  beforeEach(() => {
    mockBooksRepository = {
      getBooks: jest.fn(),
      getPrivateBooks: jest.fn(),
      addBook: jest.fn()
    };
    controller = new BooksController(mockBooksRepository);
  });

  test("initial state has empty books arrays and isLoading false", () => {
    expect(controller.allBooks).toEqual([]);
    expect(controller.privateBooks).toEqual([]);
    expect(controller.isLoading).toBe(false);
    expect(controller.errorMessage).toBeNull();
  });

  test("loadBooks action fetches all & private books and updates MobX observables", async () => {
    mockBooksRepository.getBooks.mockResolvedValue(sampleAllBooks);
    mockBooksRepository.getPrivateBooks.mockResolvedValue(samplePrivateBooks);

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
});
