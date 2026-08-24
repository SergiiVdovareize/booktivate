import ApiGateway from "./ApiGateway.js";

describe("ApiGateway", () => {
  let gateway;
  const originalFetch = global.fetch;

  beforeEach(() => {
    gateway = new ApiGateway(() => "https://test.api.com");
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("get fetches data from base URL + path", async () => {
    const mockData = [{ id: 1, name: "Book 1" }];
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await gateway.get("/books");

    expect(global.fetch).toHaveBeenCalledWith("https://test.api.com/books");
    expect(result).toEqual(mockData);
  });

  test("get throws Error when HTTP status is not ok", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(gateway.get("/books")).rejects.toThrow(
      "HTTP error! status: 500",
    );
  });

  test("post sends JSON payload to base URL + path", async () => {
    const mockResponse = { status: "ok" };
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const payload = { name: "New Book", author: "Author" };
    const result = await gateway.post("/books", payload);

    expect(global.fetch).toHaveBeenCalledWith("https://test.api.com/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockResponse);
  });

  test("post throws Error when HTTP status is not ok", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
    });

    await expect(gateway.post("/books", {})).rejects.toThrow(
      "HTTP error! status: 400",
    );
  });
});
