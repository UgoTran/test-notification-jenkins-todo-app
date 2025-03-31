# POC for AI automation testing

### Instructions video

- [Screen Recording 2025-03-11 110448.mp4](https://techvify-my.sharepoint.com/personal/helig_tran_techvify_com_vn/_layouts/15/stream.aspx?id=%2Fpersonal%2Fhelig%5Ftran%5Ftechvify%5Fcom%5Fvn%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FScreen%20Recording%202025%2D03%2D11%20110448%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E093fbd60%2Dbc81%2D49b3%2Daa4d%2D397331c61b18)

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
