import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

// Common step definitions yang bisa digunakan di semua feature files
Given("user is logged in as admin", () => {
  cy.fixture("users").then((users) => {
    loginPage.visit();
    loginPage.login(users.validUser.username, users.validUser.password);
    dashboardPage.verifyDashboardLoaded();
  });
});

Given("user navigates to Admin page", () => {
  dashboardPage.navigateToAdmin();
  // Import AdminPage di sini untuk menghindari circular dependency
  cy.url().should("include", "/admin/viewSystemUsers");
  cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should(
    "contain.text",
    "Admin"
  );
  cy.get(".oxd-button.oxd-button--medium.oxd-button--secondary")
    .contains("Add")
    .should("be.visible");
});

Given("user navigates to PIM page", () => {
  dashboardPage.navigateToPIM();
  // Verify PIM page loaded
  cy.url().should("include", "/pim/viewEmployeeList");
  cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should(
    "contain.text",
    "PIM"
  );
  cy.get(".oxd-button.oxd-button--medium.oxd-button--secondary")
    .contains("Add")
    .should("be.visible");
});
