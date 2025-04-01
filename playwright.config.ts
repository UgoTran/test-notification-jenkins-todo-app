import { defineConfig } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";

export const AUTH_FILE = "playwright/.auth/user.json";

export default defineConfig({
  workers: 4,
  projects: [
    {
      name: "auth",
      testDir: "auth",
      testMatch: /setup\.ts/,
    },
    {
      name: "chromium",
      testDir: defineBddConfig({
        features: "features/*.feature",
        steps: "features/steps/*.ts",
        aiFix: {
          promptAttachment: true,
        },
        outputDir: ".features-gen/",
      }),
      // use: {
      //   storageState: AUTH_FILE,
      // },
      // dependencies: ["auth"],
    },
  ],
  reporter: [
    cucumberReporter("html", {
      outputFile: "cucumber-report/index.html",
      externalAttachments: true,
      attachmentsBaseURL: "http://127.0.0.1:8080/data",
    }),
    ["html", { open: "never" }],
    ["line"],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ]
    // ['list'],
    // ['monocart-reporter', {
    //   outputFile: 'monocart-html-report/test-results/report.html'
    // }]
  ],
});
