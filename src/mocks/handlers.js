import { rest } from "msw";

export const mockAllBooksDto = [
  { id: 101, name: "Clean Architecture", author: "Robert C. Martin" },
  { id: 102, name: "Domain-Driven Design", author: "Eric Evans" },
];

export const mockPrivateBooksDto = [
  { id: 102, name: "Domain-Driven Design", author: "Eric Evans" },
];

export const handlers = [
  // GET all books endpoint
  rest.get("*/v1/books/*/", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAllBooksDto));
  }),

  // GET private books endpoint
  rest.get("*/v1/books/*/private", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPrivateBooksDto));
  }),

  // POST add book endpoint
  rest.post("*/v1/books/*/", async (req, res, ctx) => {
    const body = await req.json();
    if (!body || !body.name || !body.author) {
      return res(
        ctx.status(400),
        ctx.json({ status: "error", message: "Invalid payload" }),
      );
    }
    return res(ctx.status(200), ctx.json({ status: "ok" }));
  }),
];

// Error handlers for network fault injection tests
export const errorHandlers = {
  serverError: rest.get("*/v1/books/*/", (_req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
  }),
  networkFailure: rest.get("*/v1/books/*/", (req) => {
    return req.error();
  }),
};
