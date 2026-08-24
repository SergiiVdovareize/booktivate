import ApiGateway from "../Shared/ApiGateway.js";

const isValidBook = (book) => Boolean(book && typeof book === "object" && (book.name || book.author));

export class BooksRepository {
  constructor(httpGateway = new ApiGateway()) {
    this.httpGateway = httpGateway;
  }

  getBooks = async () => {
    const booksDto = await this.httpGateway.get("/");
    return (Array.isArray(booksDto) ? booksDto : []).filter(isValidBook);
  };

  getPrivateBooks = async () => {
    const privateBooksDto = await this.httpGateway.get("/private");
    return (Array.isArray(privateBooksDto) ? privateBooksDto : []).filter(isValidBook);
  };

  addBook = async ({ name, author }) => {
    const bookAddDto = await this.httpGateway.post("/", { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
