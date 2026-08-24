require("dotenv").config();
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "Desktop Edge",
      use: { ...devices["Desktop Edge"] }
    },
    {
      name: "Pixel 5",
      use: { ...devices["Pixel 5"] }
    },
    {
      name: "iPhone 16 Pro Max",
      use: { ...devices["iPhone 16 Pro Max"] }
    }
  ],
  webServer: {
    command: "npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI
  }
});
