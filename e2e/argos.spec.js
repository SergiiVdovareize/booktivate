const { test } = require("@playwright/test");
const { argosScreenshot } = require("@argos-ci/playwright");

test.describe("Argos Visual UI Tests (Deterministic Mocked Data & Operations)", () => {
  let mockAllBooks;
  let mockPrivateBooks;

  test.beforeEach(async ({ page }) => {
    mockAllBooks = [
      { id: 111, name: "Wind in the Willows", author: "Kenneth Graeme", ownerId: "smith" },
      { id: 121, name: "I, Robot", author: "Isaac Asimov", ownerId: "smith" },
      { id: 131, name: "The Hobbit", author: "J.R.R. Tolkien", ownerId: "smith" },
      { id: 141, name: "Clean Architecture", author: "Robert C. Martin", ownerId: "demouser" },
      { id: 151, name: "Domain-Driven Design", author: "Eric Evans", ownerId: "demouser" },
      { id: 161, name: "Neuromancer", author: "William Gibson", ownerId: "smith" },
      { id: 171, name: "Тінь Персея", author: "Клер Гейвуд", ownerId: "demouser" },
      { id: 181, name: "Dune Messiah", author: "Frank Herbert", ownerId: "demouser" }
    ];

    mockPrivateBooks = [
      { id: 141, name: "Clean Architecture", author: "Robert C. Martin", ownerId: "demouser" },
      { id: 151, name: "Domain-Driven Design", author: "Eric Evans", ownerId: "demouser" },
      { id: 171, name: "Тінь Персея", author: "Клер Гейвуд", ownerId: "demouser" },
      { id: 181, name: "Dune Messiah", author: "Frank Herbert", ownerId: "demouser" }
    ];

    // Intercept GET requests for private books
    await page.route("**/v1/books/**/private", (route) =>
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(mockPrivateBooks)
      })
    );

    // Intercept GET and POST requests for main books endpoint
    await page.route("**/v1/books/**/", (route) => {
      if (route.request().method() === "POST") {
        const postData = JSON.parse(route.request().postData() || "{}");
        if (postData.name && postData.author) {
          const newBook = {
            id: Date.now(),
            name: postData.name,
            author: postData.author,
            ownerId: "demouser"
          };
          mockAllBooks.push(newBook);
          mockPrivateBooks.push(newBook);
        }
        return route.fulfill({
          contentType: "application/json",
          body: JSON.stringify({ status: "ok" })
        });
      }

      if (route.request().method() === "GET") {
        return route.fulfill({
          contentType: "application/json",
          body: JSON.stringify(mockAllBooks)
        });
      }

      return route.continue();
    });
  });

  test("main books view screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".books-container");
    await argosScreenshot(page, "books-view-all");
  });

  test("private books filter switch screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".filter-tabs");
    await page.click("button:has-text('Private Books')");
    await argosScreenshot(page, "books-view-private");
  });

  test("add book modal screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("button:has-text('Add Book')");
    await page.click("button:has-text('Add Book')");
    await page.waitForSelector(".modal-content");
    await argosScreenshot(page, "add-book-modal");
  });

  test("add book form submission flow screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("button:has-text('Add Book')");
    await page.click("button:has-text('Add Book')");
    await page.waitForSelector(".modal-content");

    await page.fill("#book-name", "Refactoring");
    await page.fill("#book-author", "Martin Fowler");
    await page.click(".modal-actions button:has-text('Add')");

    // Wait for the modal to close and newly added book card to render in list
    await page.waitForSelector(".book-item:has-text('Refactoring')");
    await argosScreenshot(page, "books-view-after-add");
  });

  test("user edit mode header screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".change-user-btn");
    await page.click(".change-user-btn");
    await page.waitForSelector("#user-input");
    await argosScreenshot(page, "header-user-edit-mode");
  });
});
