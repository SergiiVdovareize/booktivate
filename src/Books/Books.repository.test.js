import Book from "./Book.model.js";
import { BooksRepository } from "./Books.repository.js";

describe("BooksRepository", () => {
  let repository;
  let mockHttpGateway;

  beforeEach(() => {
    mockHttpGateway = {
      get: jest.fn(),
      post: jest.fn(),
    };
    repository = new BooksRepository(mockHttpGateway);
  });

  test("getBooks fetches all books from root path '/' and maps to Book entities", async () => {
    const mockBooks = [
      {
        id: 1,
        name: "Wind in the Willows",
        author: "Kenneth Grahame",
        ownerId: "svdovareize",
      },
    ];
    mockHttpGateway.get.mockResolvedValue(mockBooks);

    const result = await repository.getBooks("svdovareize");

    expect(mockHttpGateway.get).toHaveBeenCalledWith("/");
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Book);
    expect(result[0].title).toBe("Wind in the Willows");
    expect(result[0].author).toBe("Kenneth Grahame");
    expect(result[0].isPrivate).toBe(true);
  });

  test("filters out empty or malformed book objects", async () => {
    const rawBooks = [
      { id: 111, name: "Wind in the Willows", author: "Kenneth Grahame" },
      {},
      null,
      { id: 121, name: "I, Robot", author: "Isaac Asimov" },
    ];
    mockHttpGateway.get.mockResolvedValue(rawBooks);

    const result = await repository.getBooks();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Wind in the Willows");
    expect(result[1].title).toBe("I, Robot");
  });

  test("getPrivateBooks fetches private books from '/private' and maps to Book entities", async () => {
    const mockPrivateBooks = [
      {
        id: 2,
        name: "Private Book",
        author: "Secret Author",
        ownerId: "svdovareize",
      },
    ];
    mockHttpGateway.get.mockResolvedValue(mockPrivateBooks);

    const result = await repository.getPrivateBooks("svdovareize");

    expect(mockHttpGateway.get).toHaveBeenCalledWith("/private");
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Book);
    expect(result[0].title).toBe("Private Book");
    expect(result[0].isPrivate).toBe(true);
  });

  test("addBook posts book payload to '/' and returns true on ok status", async () => {
    mockHttpGateway.post.mockResolvedValue({ status: "ok" });

    const newBook = { name: "Clean Code", author: "Robert C. Martin" };
    const result = await repository.addBook(newBook);

    expect(mockHttpGateway.post).toHaveBeenCalledWith("/", newBook);
    expect(result).toBe(true);
  });

  test("addBook returns false when status is not ok", async () => {
    mockHttpGateway.post.mockResolvedValue({ status: "error" });

    const result = await repository.addBook({
      name: "Fail Book",
      author: "Unknown",
    });

    expect(result).toBe(false);
  });
});
