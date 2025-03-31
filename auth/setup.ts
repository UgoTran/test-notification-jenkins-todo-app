// See: https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
import { test as setup, expect } from "@playwright/test";
// import { AUTH_FILE } from "../playwright.config";

setup("authenticate", async ({ page }) => {
  // TODO: implement authentication
  // await page.context().storageState({ path: AUTH_FILE });
});
