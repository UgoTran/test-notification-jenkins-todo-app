# POC for AI automation testing

### Instructions video


### Prequisites

- Nodejs v22.12.0

### How to run and debug

UI mode

```
yarn test:ui
```

Headless mode

```
yarn test
```

Generate and view report

```
yarn report:playwright
```

### Prompt template to generate BDD scenarios

```
Generate BDD scenarios for the following user story:

{manual test scripts}

Format output as a single gherkin file.
Include user story text in the file.
Use Background for common steps.
Use "And" keyword for repeated "Given" / "When" / "Then".

Please think step by step
And strictly use only the following step definitions:

{steps list from bddgen export}
```

### Prompt to generate single scenario from procedure and expected output

```
You are an expert in Playwright BDD testing. Write the gherkin scenario which described as below

Condition: {procedure}
Expected: {expected}

Please think it carefully and step by step
```

### Prompt to fix failed test case

```
You are an expert in Playwright BDD testing.
Fix the error in the BDD scenario.

- Provide response as a diff highlighted code snippet.
- First, try to fix the test by adjusting Gherkin steps parameters.
- If the test is not fixable by Gherkin, try to modify the code snippet.
- Strictly rely on the ARIA snapshot of the page.
- Avoid adding any new code.
- Avoid adding comments to the code.
- Avoid changing the test logic.
- Use only role-based locators: getByRole, getByLabel, etc.
- Add a concise note about applied changes.
- If the test may be correct and there is a bug in the page, note it.

Failing gherkin scenario:

Scenario: {scenarioName}
{steps}

Error details:
{error}

{snippet}

ARIA snapshot of the page:

{ariaSnapshot}

```
