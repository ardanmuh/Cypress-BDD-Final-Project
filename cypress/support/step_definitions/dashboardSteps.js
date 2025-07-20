import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import DashboardPage from "../../pages/DashboardPage";

const dashboardPage = new DashboardPage();

// Background Steps
Given("user is on the dashboard page", () => {
  dashboardPage.verifyDashboardLoaded();
  dashboardPage.waitForDashboardLoad();
});

// Scenario 1: Verify dashboard main elements are displayed
Then("user should see the dashboard title", () => {
  dashboardPage.dashboardTitle
    .should("be.visible")
    .and("contain.text", "Dashboard");
});

Then("user should see the main navigation menu", () => {
  dashboardPage.verifyNavigationMenu();
});

Then("user should see user profile dropdown", () => {
  dashboardPage.verifyUserProfileDropdown();
});

Then("user should see dashboard widgets", () => {
  dashboardPage.verifyDashboardWidgets();
});

// Scenario 2: Navigate to different modules from dashboard
When("user clicks on {string} menu item", (moduleName) => {
  dashboardPage.navigateToModule(moduleName);
});

Then("user should be redirected to {string} page", (expectedUrl) => {
  cy.url().should("include", expectedUrl);
});

Then("user should see {string} as page title", (expectedTitle) => {
  cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
    .should("be.visible")
    .and("contain.text", expectedTitle);
});

// Scenario 3: User logout functionality from dashboard
When("user clicks on user profile dropdown", () => {
  dashboardPage.clickUserDropdown();
});

When("user clicks on logout option", () => {
  dashboardPage.clickLogout();
});

Then("user should be redirected to login page", () => {
  cy.url().should("include", "/auth/login");
});

Then("user should see login form", () => {
  dashboardPage.verifyLogoutRedirection();
});

// Scenario 4: Verify dashboard responsiveness and layout
When("user changes viewport to mobile size", () => {
  dashboardPage.setMobileViewport();
  cy.wait(1000); // Wait for layout adjustment
});

Then("dashboard should adapt to mobile layout", () => {
  dashboardPage.verifyMobileLayout();
});

Then("navigation menu should be collapsible", () => {
  dashboardPage.verifyResponsiveNavigation();
});
