import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
function navigate(page: Page, path: string) {
  return page.goto((process.env.CREATOR_MITRA_TEST_BASE_PATH || "") + path);
}
const paths = [
  "/",
  "/for-brands",
  "/for-creators",
  "/creator-discovery",
  "/creator-directory",
  "/creators/aarushi-mehta",
  "/influencer-marketing",
  "/ugc",
  "/instagram-influencer-marketing",
  "/youtube-influencer-marketing",
  "/micro-influencer-marketing",
  "/regional-influencer-marketing",
  "/product-launch-campaigns",
  "/performance-creator-campaigns",
  "/dashboard",
  "/case-studies",
  "/case-studies/everyday-beauty",
  "/blog",
  "/blog/finding-the-right-creators",
  "/about",
  "/contact",
  "/login",
  "/creator-signup",
  "/start-campaign",
  "/live-campaigns",
  "/careers",
  "/privacy",
  "/terms",
];
test("all main routes render with a title and no horizontal overflow", async ({
  page,
}) => {
  for (const path of paths) {
    const response = await navigate(page, path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main h1"), path).toHaveCount(1);
    await expect(page).toHaveTitle(/Creator Mitra/);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
      path,
    ).toBeTruthy();
  }
});
test("creator filters, empty results, and shortlists work and persist", async ({
  page,
}, testInfo) => {
  await navigate(page, "/creator-discovery");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page.getByLabel("Category", { exact: true }).selectOption("Beauty");
  await expect(page.locator(".creator-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Save Aarushi Mehta to shortlist" })
    .click();
  await page.getByRole("button", { name: /Shortlist/ }).click();
  await expect(page.locator(".creator-card")).toHaveCount(1);
  await page.reload();
  await page.getByRole("button", { name: /Shortlist/ }).click();
  await expect(page.locator(".creator-card")).toHaveCount(1);
  await page.getByLabel("Search creators").fill("nothing-match");
  await expect(page.getByText("No creators in this sample yet.")).toBeVisible();
  await page.getByRole("button", { name: "Clear Filters" }).click();
  await expect(page.locator(".creator-card")).toHaveCount(6);
  await page.getByLabel("Search creators").fill("Rohan");
  await expect(page.locator(".creator-card")).toHaveCount(1);
  await page.getByRole("link", { name: "View Profile", exact: true }).click();
  await expect(page.locator("h1")).toContainText("Rohan Sharma");
});
test("campaign wizard validates, saves a local brief, and downloads it", async ({
  page,
}) => {
  await navigate(page, "/start-campaign?creator=aarushi-mehta");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".wizard-card").getByRole("alert")).toHaveText(
    "Choose an option to continue.",
  );
  await page
    .getByRole("button", { name: "Influencer Campaign", exact: true })
    .click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Instagram", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "₹1L–₹5L", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByLabel("Who do you want to reach?")
    .fill("Young adults interested in skincare");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Campaign or product name").fill("Demo Routine");
  await page
    .getByLabel("Your goal and campaign details")
    .fill("Introduce an everyday skincare routine.");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Your name").fill("Test Brand");
  await page.getByLabel("Company").fill("Demo Company");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Phone", { exact: false }).fill("+91 98765 43210");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Get Campaign Plan" }).click();
  await expect(page.getByText("Your campaign brief is ready.")).toBeVisible();
  await expect(page.getByText(/Nothing has been sent/)).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Brief" }).click();
  expect((await download).suggestedFilename()).toBe("campaign-brief.txt");
  await page.getByRole("link", { name: "Explore Workspace" }).click();
  await expect(
    page.getByRole("heading", { name: "Demo Routine" }),
  ).toBeVisible();
  await expect(
    page.getByText("Creator invitation drafted: Aarushi Mehta"),
  ).toBeVisible();
});
test("creator onboarding requires a social profile and saves a demo profile", async ({
  page,
}) => {
  await navigate(page, "/creator-signup");
  await page.getByLabel("Full name").fill("Demo Creator");
  await page.getByLabel("Email address").fill("creator@example.com");
  await page.getByLabel("Phone number").fill("9876543210");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".wizard-card").getByRole("alert")).toHaveText(
    "Add at least one social profile to continue.",
  );
  await page.getByLabel("Instagram profile").fill("@democreator");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Beauty", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Your city").fill("Mumbai");
  await page.getByRole("checkbox", { name: "Hindi", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByLabel("Profile headline")
    .fill("Everyday beauty, thoughtfully made");
  await page
    .getByLabel("A little about you")
    .fill("Sharing simple routines with my community.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Complete Profile" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome to Creator Mitra." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore Workspace" }).click();
  await expect(
    page.getByText("Welcome, Demo Creator. Your local demo profile is saved."),
  ).toBeVisible();
});
test("dashboard approval and CSV export work without implying payments", async ({
  page,
}) => {
  await navigate(page, "/dashboard");
  await page.getByRole("button", { name: "Content", exact: true }).click();
  await expect(page.getByText("Approved in demo")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Approve Demo Content" })
    .first()
    .click();
  await expect(page.getByText("Approved in demo")).toHaveCount(2);
  await page.reload();
  await page.getByRole("button", { name: "Content", exact: true }).click();
  await expect(page.getByText("Approved in demo")).toHaveCount(2);
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export Demo" }).click();
  expect((await download).suggestedFilename()).toBe(
    "creator-mitra-demo-report.csv",
  );
  await page.getByRole("button", { name: "Payments", exact: true }).click();
  await expect(page.getByText("No payment service connected")).toBeVisible();
});
test("contact form confirms a local draft and supports editing", async ({
  page,
}) => {
  await navigate(page, "/contact");
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("hello@example.com");
  await page.getByLabel("Your message").fill("A demo partnership enquiry.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Save Message Draft" }).click();
  await expect(
    page.getByRole("heading", { name: "Your message draft is ready." }),
  ).toBeVisible();
  await expect(page.getByText(/No message has been sent/)).toBeVisible();
  await page.getByRole("button", { name: "Edit message" }).click();
  await expect(page.getByLabel("Your message")).toHaveValue(
    "A demo partnership enquiry.",
  );
});
test("navigation works and mobile menu closes on selection", async ({
  page,
}, testInfo) => {
  await navigate(page, "/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("button", { name: "Close menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "For Creators" })
      .click();
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else {
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "For Creators" })
      .click();
  }
  await expect(page).toHaveURL(/for-creators/);
});
test("homepage meets automated WCAG A and AA checks", async ({ page }) => {
  await navigate(page, "/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
test("unknown page displays the recovery page", async ({ page }) => {
  const response = await navigate(page, "/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Let’s find your way back." }),
  ).toBeVisible();
});

test("core app pages meet automated WCAG A and AA checks", async ({ page }) => {
  for (const path of [
    "/creator-discovery",
    "/start-campaign",
    "/creator-signup",
    "/dashboard",
    "/contact",
    "/creators/aarushi-mehta",
    "/influencer-marketing",
  ]) {
    await navigate(page, path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
});
