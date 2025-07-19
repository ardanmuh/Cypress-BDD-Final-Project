class PIMPage {
  // Selectors
  get pageTitle() {
    return cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  }

  get employeeListTitle() {
    return cy.get(".oxd-text.oxd-text--h5.oxd-table-filter-title");
  }

  get addButton() {
    return cy
      .get(".oxd-button.oxd-button--medium.oxd-button--secondary")
      .contains("Add");
  }

  get firstNameInput() {
    return cy.get('[name="firstName"]');
  }

  get middleNameInput() {
    return cy.get('[name="middleName"]');
  }

  get lastNameInput() {
    return cy.get('[name="lastName"]');
  }

  get employeeIdInput() {
    return cy.get(".oxd-input").eq(4); // Employee ID field
  }

  get saveButton() {
    return cy.get('[type="submit"]').contains("Save");
  }

  get successMessage() {
    return cy.get(".oxd-text.oxd-text--p.oxd-text--toast-message");
  }

  get toastContainer() {
    return cy.get(".oxd-toast-container");
  }

  get searchEmployeeNameInput() {
    return cy.get('[placeholder="Type for hints..."]').first();
  }

  get searchEmployeeIdInput() {
    return cy.get(".oxd-input").eq(1); // Employee ID search field
  }

  get searchButton() {
    return cy.get('[type="submit"]').contains("Search");
  }

  get resetButton() {
    return cy.get(".oxd-button--ghost").contains("Reset");
  }

  get employeeTable() {
    return cy.get(".oxd-table-body");
  }

  get deleteButton() {
    return cy.get(".oxd-icon.bi-trash");
  }

  get confirmDeleteButton() {
    return cy.get(".oxd-button.oxd-button--medium.oxd-button--label-danger");
  }

  get errorMessage() {
    return cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message");
  }

  get createLoginDetailsToggle() {
    return cy.get('.oxd-switch-input[type="checkbox"]');
  }

  // Actions
  verifyPIMPageLoaded() {
    cy.url().should("include", "/pim/viewEmployeeList");
    this.pageTitle.should("contain.text", "PIM");
    this.addButton.should("be.visible");
  }

  clickAddButton() {
    this.addButton.click();
    cy.url().should("include", "/pim/addEmployee");
  }

  fillEmployeeDetails(firstName, lastName, middleName = "", employeeId = "") {
    // Clear and fill first name
    this.firstNameInput.should("be.visible").clear().type(firstName);

    // Clear and fill last name
    this.lastNameInput.should("be.visible").clear().type(lastName);

    // Fill middle name if provided
    if (middleName) {
      this.middleNameInput.clear().type(middleName);
    }

    // Fill employee ID if provided, otherwise use auto-generated
    if (employeeId) {
      this.employeeIdInput.clear().type(employeeId);
    }
  }

  fillEmployeeDetailsWithExistingId(firstName, lastName, employeeId) {
    this.firstNameInput.should("be.visible").clear().type(firstName);
    this.lastNameInput.should("be.visible").clear().type(lastName);
    this.employeeIdInput.clear().type(employeeId);
  }

  clickSave() {
    this.saveButton.click();
    cy.wait(2000); // Wait for save process
  }

  verifySuccessMessage(messageType = "Successfully Saved") {
    this.toastContainer.should("be.visible", { timeout: 10000 }).within(() => {
      cy.get(".oxd-text--toast-message")
        .should("be.visible")
        .and("contain.text", messageType);
    });
  }

  verifyDeleteSuccessMessage() {
    this.verifySuccessMessage("Successfully Deleted");
  }

  verifyEmployeeIdExistsError() {
    this.errorMessage
      .should("be.visible")
      .and("contain.text", "Employee Id already exists");
  }
  
  searchEmployeeByName(employeeName) {
    // Type in the employee name search field and wait for autocomplete
    this.searchEmployeeNameInput
      .should("be.visible")
      .clear()
      .type(employeeName.split(" ")[0]); // Type first name

    cy.wait(1000);

    // Wait for autocomplete dropdown and select the employee
    cy.get(".oxd-autocomplete-dropdown", { timeout: 8000 })
      .should("be.visible")
      .within(() => {
        cy.contains(employeeName).click();
      });

    this.clickSearch();
  }

  // New simple search method - untuk scenario delete dan verification sederhana
  searchEmployeeByNameSimple(employeeName) {
    // Just type the full name and click search - no autocomplete interaction
    this.searchEmployeeNameInput
      .should("be.visible")
      .clear()
      .type(employeeName);

    this.clickSearch();
  }

  searchEmployeeById(employeeId) {
    this.searchEmployeeIdInput.should("be.visible").clear().type(employeeId);

    this.clickSearch();
  }

  clickSearch() {
    this.searchButton.click();
    cy.wait(2000); // Wait for search results
  }

  clickReset() {
    this.resetButton.click();
    cy.wait(1000);
  }

  verifyEmployeeInTable(employeeName) {
    this.employeeTable
      .should("be.visible", { timeout: 10000 })
      .should("contain.text", employeeName);
  }

  verifyEmployeeNotInTable(employeeName) {
    cy.get("body").then(($body) => {
      if ($body.find(".oxd-table-body").length > 0) {
        this.employeeTable
          .should("be.visible")
          .should("not.contain.text", employeeName);
      } else {
        // No table means no employees found
        cy.get(".oxd-text").should("contain.text", "No Records Found");
      }
    });
  }

  verifyEmployeeDetails(employeeName) {
    // Verify the employee appears in search results with correct details
    this.verifyEmployeeInTable(employeeName);

    // Additional verification can be added here for specific details
    cy.get(".oxd-table-row")
      .contains(employeeName)
      .parent()
      .within(() => {
        // Verify row contains expected employee data
        cy.get("td").should("have.length.greaterThan", 0);
      });
  }

  // Updated delete method menggunakan simple search
  deleteEmployee(employeeName) {
    this.searchEmployeeByNameSimple(employeeName);
    cy.wait(2000);

    // Click delete button for the first (and should be only) result
    this.deleteButton.first().click();

    // Confirm deletion
    this.confirmDeleteButton.click();
    cy.wait(1000);
  }

  // Method untuk verify employee sudah terhapus - menggunakan simple search
  verifyEmployeeDeleted(employeeName) {
    this.searchEmployeeByNameSimple(employeeName);
    this.verifyEmployeeNotInTable(employeeName);
  }

  addNewEmployee(firstName, lastName, middleName = "") {
    this.clickAddButton();
    this.fillEmployeeDetails(firstName, lastName, middleName);
    this.clickSave();
  }

  addNewEmployeeWithExistingId(firstName, lastName, employeeId) {
    this.clickAddButton();
    this.fillEmployeeDetailsWithExistingId(firstName, lastName, employeeId);
    this.clickSave();
  }

  addNewEmployeeWithSuccess(firstName, lastName, middleName = "") {
    this.addNewEmployee(firstName, lastName, middleName);
    this.verifySuccessMessage();
    // Navigate back to employee list
    cy.get(".oxd-main-menu-item").contains("PIM").click();
    this.verifyPIMPageLoaded();
  }

  // Method ini tetap menggunakan autocomplete karena untuk check existence perlu lebih akurat
  checkEmployeeExists(employeeName) {
    this.clickReset();
    this.searchEmployeeByName(employeeName);

    return cy.get("body").then(($body) => {
      const hasNoRecords = $body.text().includes("No Records Found");
      return !hasNoRecords;
    });
  }

  ensureEmployeeExists(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;

    return this.checkEmployeeExists(fullName).then((exists) => {
      if (!exists) {
        cy.log(`Creating employee ${fullName} as it doesn't exist`);
        this.addNewEmployeeWithSuccess(firstName, lastName);
        this.clickReset();
        return cy.wrap(true);
      } else {
        cy.log(`Employee ${fullName} already exists`);
        return cy.wrap(true);
      }
    });
  }

  ensureEmployeeWithIdExists(employeeId) {
    this.clickReset();
    this.searchEmployeeById(employeeId);

    return cy.get("body").then(($body) => {
      const hasNoRecords = $body.text().includes("No Records Found");
      if (hasNoRecords) {
        // Create employee with specific ID
        cy.log(`Creating employee with ID ${employeeId}`);
        this.clickAddButton();
        this.fillEmployeeDetails("Test", "Employee", "", employeeId);
        this.clickSave();
        this.verifySuccessMessage();
        cy.get(".oxd-main-menu-item").contains("PIM").click();
        this.verifyPIMPageLoaded();
      }
      return cy.wrap(true);
    });
  }
}

export default PIMPage;
