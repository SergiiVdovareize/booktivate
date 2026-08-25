import { errorHandlers, mockAllBooksDto } from "../mocks/handlers";
import { server } from "../mocks/server";
import ApiGateway from "./ApiGateway";

describe("MSW Network Integration & Fault Injection Tests", () => {
  let apiGateway;

  beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    apiGateway = new ApiGateway(
      () => "https://tdd.demo.reaktivate.com/v1/books/demouser",
    );
  });

  test("fetches all books via MSW intercepted HTTP GET request", async () => {
    const data = await apiGateway.get("/");
    expect(data).toEqual(mockAllBooksDto);
  });

  test("handles 500 Internal Server Error gracefully via MSW fault injection", async () => {
    server.use(errorHandlers.serverError);
    await expect(apiGateway.get("/")).rejects.toThrow(
      "HTTP error! status: 500",
    );
  });

  test("handles network connectivity failure gracefully via MSW error injection", async () => {
    server.use(errorHandlers.networkFailure);
    await expect(apiGateway.get("/")).rejects.toThrow("Failed to fetch");
  });

  test("posts new book payload successfully via MSW intercepted POST request", async () => {
    const response = await apiGateway.post("/", {
      name: "Refactoring",
      author: "Martin Fowler",
    });
    expect(response).toEqual({ status: "ok" });
  });
});
