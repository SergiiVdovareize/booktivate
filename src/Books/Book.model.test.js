import Book from "./Book.model.js";

describe("Book Model Entity (Programmers Model)", () => {
  test("instantiates Book entity from raw DTO", () => {
    const rawDto = {
      id: 111,
      name: "Wind in the Willows",
      author: "Kenneth Grahame",
      ownerId: "svdovareize",
    };

    const book = new Book(rawDto, "svdovareize");

    expect(book.id).toBe(111);
    expect(book.title).toBe("Wind in the Willows");
    expect(book.author).toBe("Kenneth Grahame");
    expect(book.ownerId).toBe("svdovareize");
    expect(book.isPrivate).toBe(true);
    expect(book.displayTitle).toBe("Kenneth Grahame: Wind in the Willows");
  });

  test("calculates isPrivate as false if ownerId does not match currentUsername", () => {
    const rawDto = {
      id: 121,
      name: "I, Robot",
      author: "Isaac Asimov",
      ownerId: "smith",
    };

    const book = new Book(rawDto, "svdovareize");

    expect(book.isPrivate).toBe(false);
  });
});
