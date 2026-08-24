import ApiGateway from "../Shared/ApiGateway.js";
import Book from "./Book.model.js";

const isValidBook = (book) =>
  Boolean(book && typeof book === "object" && (book.name || book.author));

export class BooksRepository {
  constructor(httpGateway = new ApiGateway()) {
    this.httpGateway = httpGateway;
  }

  getBooks = async (currentUsername = "") => {
    const booksDto = await this.httpGateway.get("/");
    const valid = (Array.isArray(booksDto) ? booksDto : []).filter(isValidBook);
    return valid.map((dto) => new Book(dto, currentUsername));
  };

  getPrivateBooks = async (currentUsername = "") => {
    const privateBooksDto = await this.httpGateway.get("/private");
    const valid = (
      Array.isArray(privateBooksDto) ? privateBooksDto : []
    ).filter(isValidBook);
    return valid.map((dto) => new Book(dto, currentUsername, true));
  };

  addBook = async ({ name, author }) => {
    const bookAddDto = await this.httpGateway.post("/", { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
