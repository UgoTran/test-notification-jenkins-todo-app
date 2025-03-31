import { Given, When, Then } from "./common.fixtures";
import { expect } from "@playwright/test";

Given("the Todo application is loaded in browser", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

When(
  "I enter {string} in the {string} input field",
  async ({ page }, text: string, placeholder: string) => {
    await page.fill(`input[placeholder="${placeholder}"]`, text);
  }
);

When("I press Enter key", async ({ page }) => {
  await page.keyboard.press("Enter");
});

Then(
  "a new todo item with text {string} appears in the todo list",
  async ({ page }, text: string) => {
    const todoItem = await page.locator(`.todo-list li:has-text("${text}")`);
    expect(await todoItem.count()).toBe(1);
  }
);

When("I click the circle checkbox before the todo item", async ({ page }) => {
  await page.click(".todo-list li .toggle");
});

Then("the todo item should be marked as completed", async ({ page }) => {
  const completedItem = await page.locator(".todo-list li.completed");
  expect(await completedItem.count()).toBeGreaterThan(0);
});

Then("the text should be crossed out", async ({ page }) => {
  const crossedOutText = await page.locator(".todo-list li.completed label");
  expect(
    await crossedOutText.evaluate(
      (node) => window.getComputedStyle(node).textDecoration
    )
  ).toContain("line-through");
});

When("I click the checkbox of a completed todo item", async ({ page }) => {
  await page.click(".todo-list li.completed .toggle");
});

Then("the todo item should return to active state", async ({ page }) => {
  const activeItem = await page.locator(".todo-list li:not(.completed)");
  expect(await activeItem.count()).toBeGreaterThan(0);
});

When(
  "I click on the {string} filter link at the bottom of the list",
  async ({ page }, filter: string) => {
    await page.click(`.filters a:has-text("${filter}")`);
  }
);

Then("only active todo items should be displayed", async ({ page }) => {
  const activeItems = await page.locator(".todo-list li:not(.completed)");
  expect(await activeItems.count()).toBeGreaterThan(0);
});

Then("only completed todo items should be displayed", async ({ page }) => {
  const completedItems = await page.locator(".todo-list li.completed");
  expect(await completedItems.count()).toBeGreaterThan(0);
});

When("I hover mouse over a todo item", async ({ page }) => {
  await page.hover(".todo-list li");
});

When(
  'I click the "×" button that appears on the right side of the item',
  async ({ page }) => {
    await page.click(".todo-list li .destroy");
  }
);

Then("the todo item should be removed from the list", async ({ page }) => {
  const todoItems = await page.locator(".todo-list li");
  expect(await todoItems.count()).toBe(0);
});

When(
  'I click the "Clear completed" button at the bottom of the list',
  async ({ page }) => {
    await page.click(".clear-completed");
  }
);
Then("all completed todo items should be removed", async ({ page }) => {
  const completedItems = await page.locator(".todo-list li.completed");
  expect(await completedItems.count()).toBe(0);
});

Then("active items remain", async ({ page }) => {
  const activeItems = await page.locator(".todo-list li:not(.completed)");
  expect(await activeItems.count()).toBeGreaterThan(0);
});

When("I add several todo items", async ({ page }) => {
  await page.fill(".new-todo", "Task 1");
  await page.keyboard.press("Enter");
  await page.fill(".new-todo", "Task 2");
  await page.keyboard.press("Enter");
  await page.fill(".new-todo", "Task 3");
  await page.keyboard.press("Enter");
});

When("I mark some as completed", async ({ page }) => {
  await page.click(".todo-list li:nth-child(1) .toggle");
});

Then(
  "the counter should display the exact number of active todo items",
  async ({ page }) => {
    const counter = await page.locator(".todo-count strong");
    expect(await counter.textContent()).toBe("2");
  }
);

When("I double-click on an existing todo item text", async ({ page }) => {
  await page.dblclick(".todo-list li label");
});

When("I edit the text to {string}", async ({ page }, text: string) => {
  await page.fill(".todo-list li.editing .edit", text);
});

Then(
  "the todo item text should be updated to {string}",
  async ({ page }, text: string) => {
    const updatedItem = await page.locator(`.todo-list li:has-text("${text}")`);
    expect(await updatedItem.count()).toBe(1);
  }
);

When("I enter only spaces in the input field", async ({ page }) => {
  await page.fill(".new-todo", "   ");
});

Then("no new todo item should be created", async ({ page }) => {
  const todoItems = await page.locator(".todo-list li");
  expect(await todoItems.count()).toBe(0);
});

When(
  "I click the down arrow toggle button on the left of the input field",
  async ({ page }) => {
    await page.click("#toggle-all");
  }
);

Then("all todo items should be marked as completed", async ({ page }) => {
  const completedItems = await page.locator(".todo-list li.completed");
  expect(await completedItems.count()).toBeGreaterThan(0);
});

When("I refresh the browser page", async ({ page }) => {
  await page.reload();
});

Then(
  "all todo items and their states should remain unchanged after the page refresh",
  async ({ page }) => {
    const todoItems = await page.locator(".todo-list li");
    expect(await todoItems.count()).toBeGreaterThan(0);
  }
);

When(
  "I enter very long text {string} as a todo item",
  async ({ page }, text: string) => {
    await page.fill(".new-todo", text);
    await page.keyboard.press("Enter");
  }
);

Then(
  "the todo item should be created and display the full text properly",
  async ({ page }) => {
    const longTextItem = await page.locator(".todo-list li");
    expect(await longTextItem.count()).toBe(1);
  }
);

When("I double-click a todo item to enter edit mode", async ({ page }) => {
  await page.dblclick(".todo-list li label");
});

When("I modify the text", async ({ page }) => {
  await page.fill(".todo-list li.editing .edit", "Modified text");
});

When("I press Escape key", async ({ page }) => {
  await page.keyboard.press("Escape");
});

Then(
  "edit mode should exit and the todo item should revert to its original text",
  async ({ page }) => {
    const originalTextItem = await page.locator(
      '.todo-list li:has-text("sample")'
    );
    expect(await originalTextItem.count()).toBe(1);
  }
);

When(
  "I enter {string} in the input field and press Enter",
  async ({ page }, text: string) => {
    await page.fill(".new-todo", text);
    await page.keyboard.press("Enter");
  }
);

Then(
  "three separate todo items appear in the list in the same order they were entered",
  async ({ page }) => {
    const todoItems = await page.locator(".todo-list li");
    expect(await todoItems.nth(0).textContent()).toContain("Task 1");
    expect(await todoItems.nth(1).textContent()).toContain("Task 2");
    expect(await todoItems.nth(2).textContent()).toContain("Task 3");
  }
);

Given(
  "the Todo application is loaded with at least one todo item",
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.fill(".new-todo", "Sample task");
    await page.keyboard.press("Enter");
  }
);

Then(
  "the todo item should be marked as completed \\(checkbox checked)",
  async ({ page }) => {
    const completedItem = await page.locator(".todo-list li.completed");
    expect(await completedItem.count()).toBeGreaterThan(0);
  }
);

Then(
  "the text should be crossed out \\(with line-through style)",
  async ({ page }) => {
    const crossedOutText = await page.locator(".todo-list li.completed label");
    expect(
      await crossedOutText.evaluate(
        (node) => window.getComputedStyle(node).textDecoration
      )
    ).toContain("line-through");
  }
);

Given(
  "the Todo application has at least one completed todo item",
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.fill(".new-todo", "Sample task");
    await page.keyboard.press("Enter");
    await page.click(".todo-list li .toggle");
  }
);

Then(
  "the todo item should return to active state \\(checkbox unchecked, text not crossed out)",
  async ({ page }) => {
    const activeItem = await page.locator(".todo-list li:not(.completed)");
    expect(await activeItem.count()).toBeGreaterThan(0);
  }
);

Given(
  "the Todo application has a mix of completed and active todo items",
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.fill(".new-todo", "Active task");
    await page.keyboard.press("Enter");
    await page.fill(".new-todo", "Completed task");
    await page.keyboard.press("Enter");
    await page.click(".todo-list li:nth-child(2) .toggle");
  }
);

Then(
  "only active \\(uncompleted) todo items should be displayed",
  async ({ page }) => {
    const activeItems = await page.locator(".todo-list li:not(.completed)");
    expect(await activeItems.count()).toBe(1);
  }
);

Given("the Todo application has at least one todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  await page.fill(".new-todo", "Sample task");
  await page.keyboard.press("Enter");
});

Given(
  "the Todo application has multiple completed todo items",
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.fill(".new-todo", "Completed task 1");
    await page.keyboard.press("Enter");
    await page.fill(".new-todo", "Completed task 2");
    await page.keyboard.press("Enter");
    await page.click(".todo-list li:nth-child(1) .toggle");
    await page.click(".todo-list li:nth-child(2) .toggle");
  }
);

Then(
  "the counter should display the exact number of active \\(uncompleted) todo items",
  async ({ page }) => {
    const counter = await page.locator(".todo-count strong");
    expect(await counter.textContent()).toBe("2");
  }
);

Given(
  "the Todo application has multiple active todo items",
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.fill(".new-todo", "Active task 1");
    await page.keyboard.press("Enter");
    await page.fill(".new-todo", "Active task 2");
    await page.keyboard.press("Enter");
  }
);

Given(
  "the Todo application has several todo items in various states",
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.fill(".new-todo", "Active task");
    await page.keyboard.press("Enter");
    await page.fill(".new-todo", "Completed task");
    await page.keyboard.press("Enter");
    await page.click(".todo-list li:nth-child(2) .toggle");
  }
);

When(
  "I enter very long text \\({int}+ characters) as a todo item",
  async ({ page }, length: number) => {
    const longText = "a".repeat(length);
    await page.fill(".new-todo", longText);
    await page.keyboard.press("Enter");
  }
);

Then(
  "the todo item should be created and display the full text properly \\(possibly with wrapping)",
  async ({ page }) => {
    const longTextItem = await page.locator(".todo-list li");
    expect(await longTextItem.count()).toBe(1);
    expect(await longTextItem.textContent()).toHaveLength(200);
  }
);
