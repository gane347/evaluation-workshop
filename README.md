# Lunch App Automation Tests
### Simple Playwright tests for the Lunch Menu app.

## Setup
1. Install dependencies:  
```bash
npm install
```


Install Playwright browsers:
```bash
npx playwright install
```
## Run Tests

### Run all tests:
```bash
npx playwright test
```

### Run a specific file:
```bash
npx playwright test adminOrderMenu.test.js
```
## Tests

Admin tests (adminOrderMenu.test.js): add dishes, order soup/main dish, delete items.

User tests (userOrderMenu.test.js): order soup/main dish, check order submission.

Uses Page Object Model (pom/OrderMenu.page.js).
