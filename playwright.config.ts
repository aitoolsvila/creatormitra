import { defineConfig, devices } from "@playwright/test";
const pages = process.env.CREATOR_MITRA_TEST_MODE === "pages";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL: pages ? "http://127.0.0.1:3002" : "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox"],
    },
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: pages
      ? "npm run preview:pages"
      : process.env.CREATOR_MITRA_TEST_MODE === "production"
        ? "npm start"
        : "npm run dev",
    url: pages
      ? "http://127.0.0.1:3002/creatormitra/"
      : "http://127.0.0.1:3000",
    reuseExistingServer: !["production", "pages"].includes(
      process.env.CREATOR_MITRA_TEST_MODE || "",
    ),
    timeout: 120000,
  },
});
