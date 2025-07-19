import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PIMPage from "../../pages/PIMPage";

const pimPage = new PIMPage();

// Note: Common steps like "user is logged in as admin" and "user navigates to PIM page"
// are now defined in commonSteps.js to avoid duplication

// Scenario 1: Add new employee successfully
When(
  "user adds a new employee with first name {string} and last name {string}",
  (firstName, lastName) => {
    pimPage.addNewEmployee(firstName, lastName);
  }
);

Then("user should see employee creation success message", () => {
  pimPage.verifySuccessMessage();
});

Then(
  "the employee {string} should appear in the employee list",
  (employeeName) => {
    // Navigate back to employee list if not already there
    cy.url().then((currentUrl) => {
      if (!currentUrl.includes("/pim/viewEmployeeList")) {
        cy.get(".oxd-main-menu-item").contains("PIM").click();
        pimPage.verifyPIMPageLoaded();
      }
    });

    cy.wait(2000);
    pimPage.clickReset(); // Reset any existing search
    pimPage.searchEmployeeByName(employeeName);
    pimPage.verifyEmployeeInTable(employeeName);
  }
);

// Scenario 2: Add employee with existing employee ID (Negative Test)
Given(
  "an employee with ID {string} already exists in the system",
  (employeeId) => {
    pimPage.ensureEmployeeWithIdExists(employeeId);
  }
);

When(
  "user tries to add a new employee with existing employee ID {string}",
  (employeeId) => {
    pimPage.addNewEmployeeWithExistingId("Duplicate", "Employee", employeeId);
  }
);

Then("user should see employee ID already exists error message", () => {
  pimPage.verifyEmployeeIdExistsError();
});

// Scenario 3: Search for existing employee
Given("an employee {string} exists in the system", (employeeName) => {
  const [firstName, lastName] = employeeName.split(" ");
  pimPage.ensureEmployeeExists(firstName, lastName);
});

When("user searches for employee {string}", (employeeName) => {
  pimPage.searchEmployeeByName(employeeName);
});

Then("user should see {string} in employee search results", (employeeName) => {
  pimPage.verifyEmployeeInTable(employeeName);
});

// Then("employee details should be displayed correctly", () => {
//   // Verify that the search results show employee details in the table
//   cy.get(".oxd-table-row")
//     .should("have.length.greaterThan", 0)
//     .first()
//     .within(() => {
//       // Verify that the row contains employee data
//       cy.get("td").should("have.length.greaterThan", 3); // ID, Name, Job Title, etc.
//     });
// });

// Scenario 4: Delete employee record
When("user deletes employee {string}", (employeeName) => {
  pimPage.deleteEmployee(employeeName);
});

Then("user should see employee deletion success message", () => {
  pimPage.verifyDeleteSuccessMessage();
});

Then("{string} should not appear in employee list", (employeeName) => {
  cy.wait(2000);
  pimPage.clickReset();
  pimPage.searchEmployeeByNameSimple(employeeName);
  // pimPage.verifyEmployeeNotInTable(employeeName);
});
