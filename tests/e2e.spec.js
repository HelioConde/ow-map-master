const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("filters 30 maps, opens guide and persists study queue", async ({ page }) => {
  await expect(page.locator("#map-count")).toHaveText("30");
  await expect(page.locator(".map-card")).toHaveCount(30);

  await page.locator("#mode-filter").selectOption("hybrid");
  await expect(page.locator(".map-card")).toHaveCount(8);
  await expect(page.locator("#map-grid")).toContainText("Neon Junction");

  await page.locator("#search").fill("Neon");
  await expect(page.locator(".map-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Abrir guia" }).click();

  await expect(page.locator("#map-dialog")).toBeVisible();
  await expect(page.locator("#dialog-title")).toHaveText("Neon Junction");
  await expect(page.locator("#dialog-goal")).not.toHaveText("");
  await expect(page.locator("#dialog-plan li")).toHaveCount(3);

  await page.locator("#dialog-study").click();
  await expect(page.locator("#study-count")).toHaveText("1");
  await page.locator("#dialog-close").click();

  await page.locator("#clear-filters").click();
  await page.locator("#study-only").click();
  await expect(page.locator(".map-card")).toHaveCount(1);
  await expect(page.locator("#map-grid")).toContainText("Neon Junction");

  await page.reload();
  await expect(page.locator("#study-count")).toHaveText("1");
});

test("style filters, deep links and English stay usable", async ({ page }) => {
  await page.locator("#tag-filter").selectOption("rotation");
  await expect(page.locator(".map-card").first()).toBeVisible();

  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#mode-filter option[value=hybrid]")).toHaveText("Hybrid");

  await page.goto("/?lang=en&mode=flashpoint&map=aatlis");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".map-card")).toHaveCount(3);
  await expect(page.locator("#map-dialog")).toBeVisible();
  await expect(page.locator("#dialog-title")).toHaveText("Aatlis");
  await expect(page.locator("#dialog-goal")).toContainText("Capture 3");
});
