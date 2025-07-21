# Cypress BDD Final Project

This project is an automated testing framework implementation using Cypress with Behavior Driven Development (BDD) approach and Cucumber for writing test scenarios in Gherkin format.

## 📝 Project Description

This testing automation framework provides:
- **BDD Testing**: Write test scenarios in natural language using Gherkin syntax
- **Page Object Model**: Maintainable and reusable code structure
- **Comprehensive Reporting**: Detailed test execution reports

## 📁 Folder Structure

```
Cypress-BDD-Final-Project/
├── cypress/
│   ├── e2e/                           # Test files
│   │   ├── features/                  # Gherkin feature files (.feature)
│   │   │   ├── login.feature
│   │   │   ├── registration.feature
│   │   │   └── dashboard.feature
│   │   └── step_definitions/          # Step definitions (.js/.ts)
│   │       ├── login_steps.js
│   │       ├── registration_steps.js
│   │       └── common_steps.js
│   ├── fixtures/                      # Test data files
│   │   ├── users.json
│   │   ├── testdata.json
│   │   └── config.json
│   ├── support/                       # Support files
│   │   ├── commands.js                # Custom commands
│   │   ├── e2e.js                     # Global configurations
│   │   ├── page_objects/              # Page Object Model files
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── BasePage.js
│   │   └── utilities/                 # Utility functions
│   │       ├── helpers.js
│   │       └── constants.js
│   └── screenshots/                   # Screenshots from failed tests
├── reports/                           # Test reports
│   ├── html/
│   └── json/
├── cypress.config.js                  # Main Cypress configuration
├── package.json                       # Dependencies and scripts
├── package-lock.json                  # Dependencies lock file
└── README.md                          # Project documentation
```

### Structure Explanation

- **`cypress/e2e/features/`**: Contains `.feature` files written in Gherkin format
- **`cypress/e2e/step_definitions/`**: Step definition implementations for each scenario
- **`cypress/fixtures/`**: Test data in JSON format
- **`cypress/support/page_objects/`**: Page Object Model for maintainable code
- **`cypress/support/commands.js`**: Reusable custom commands
- **`cypress.config.js`**: Global Cypress configuration

## 🛠️ Installation Guide

### Prerequisites

Ensure your system has:
- **Node.js** version 18.x or higher
- **npm** version 8.x or higher
- **Git** for version control

### Installation Steps

#### 1. Clone Repository

```bash
git clone https://github.com/ardanmuh/Cypress-BDD-Final-Project.git
cd Cypress-BDD-Final-Project
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Verify Installation

```bash
npx cypress verify
```

#### 4. Install Additional BDD Dependencies

```bash
npm install --save-dev @badeball/cypress-cucumber-preprocessor
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
```

## 🚀 Running Tests

### 1. Interactive Mode (Test Runner)

Open Cypress Test Runner for interactive testing:

```bash
npm run cypress:open
```

or

```bash
npx cypress open
```

### 2. Headless Mode

Run tests in headless mode (ideal for CI/CD):

```bash
npm run cypress:run
```

or

```bash
npx cypress run
```

### 3. Specific Test Execution

#### Run specific feature file:
```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

## 📊 Reporting

### 1. Built-in Cypress Reports

Cypress automatically generates:
- **Screenshots** of failed tests
- **Videos** of test execution
- **Console logs** and error details

### 2. Mochawesome HTML Reports

#### Install Mochawesome:
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

#### Generate HTML Report:
```bash
npx cypress run --reporter mochawesome --reporter-options "reportDir=reports/mochawesome,overwrite=false,html=false,json=true"
```

#### Merge and Generate Final Report:
```bash
npx mochawesome-merge reports/mochawesome/*.json > reports/mochawesome.json
npx marge reports/mochawesome.json --reportDir reports --inline
```

### 3. Cucumber JSON Reports

#### Generate Cucumber Report:
```bash
npx cypress run --reporter json --reporter-options "output=reports/cucumber-report.json"
```

### 5. Viewing Reports

After test execution:
- **HTML Reports**: Open `reports/index.html` in browser
- **JSON Reports**: Available in `reports/` directory
- **Screenshots**: Located in `cypress/screenshots/`
- **Videos**: Located in `cypress/videos/`

---

**Author**: Arda Muhammadan 
**Repository**: [Cypress-BDD-Final-Project](https://github.com/ardanmuh/Cypress-BDD-Final-Project)
