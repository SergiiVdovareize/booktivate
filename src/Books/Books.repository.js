import ApiGateway from "../Shared/ApiGateway.js";

export class BooksRepository {
  constructor(httpGateway = new ApiGateway()) {
    this.httpGateway = httpGateway;
  }

  getBooks = async () => {
    const booksDto = await this.httpGateway.get("/");
    return booksDto;
  };

  getPrivateBooks = async () => {
    const privateBooksDto = await this.httpGateway.get("/private");
    return privateBooksDto;
  };

  addBook = async ({ name, author }) => {
    const bookAddDto = await this.httpGateway.post("/", { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
