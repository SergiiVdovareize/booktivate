const { test } = require("@playwright/test");
const { argosScreenshot } = require("@argos-ci/playwright");

test.describe("Argos Visual UI Tests", () => {
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

  test("user edit mode header screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".change-user-btn");
    await page.click(".change-user-btn");
    await page.waitForSelector("#user-input");
    await argosScreenshot(page, "header-user-edit-mode");
  });
});
