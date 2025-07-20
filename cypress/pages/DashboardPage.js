class DashboardPage {
  // Selectors for Dashboard Elements
  get dashboardTitle() {
    return cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  }

  get mainNavigationMenu() {
    return cy.get(".oxd-main-menu");
  }

  get adminMenu() {
    return cy.get(".oxd-main-menu-item").contains("Admin");
  }

  get pimMenu() {
    return cy.get(".oxd-main-menu-item").contains("PIM");
  }

  get leaveMenu() {
    return cy.get(".oxd-main-menu-item").contains("Leave");
  }

  get timeMenu() {
    return cy.get(".oxd-main-menu-item").contains("Time");
  }

  get recruitmentMenu() {
    return cy.get(".oxd-main-menu-item").contains("Recruitment");
  }

  get myInfoMenu() {
    return cy.get(".oxd-main-menu-item").contains("My Info");
  }

  get performanceMenu() {
    return cy.get(".oxd-main-menu-item").contains("Performance");
  }

  get dashboardMenu() {
    return cy.get(".oxd-main-menu-item").contains("Dashboard");
  }

  get directoryMenu() {
    return cy.get(".oxd-main-menu-item").contains("Directory");
  }

  get maintenanceMenu() {
    return cy.get(".oxd-main-menu-item").contains("Maintenance");
  }

  get claimMenu() {
    return cy.get(".oxd-main-menu-item").contains("Claim");
  }

  get buzzMenu() {
    return cy.get(".oxd-main-menu-item").contains("Buzz");
  }

  // User Profile and Logout Elements
  get userDropdown() {
    return cy.get(".oxd-userdropdown-tab");
  }

  get userProfileName() {
    return cy.get(".oxd-userdropdown-name");
  }

  get logoutButton() {
    return cy.get('[role="menuitem"]').contains("Logout");
  }

  get aboutButton() {
    return cy.get('[role="menuitem"]').contains("About");
  }

  get supportButton() {
    return cy.get('[role="menuitem"]').contains("Support");
  }

  get changePasswordButton() {
    return cy.get('[role="menuitem"]').contains("Change Password");
  }

  // Dashboard Widgets and Content
  get dashboardWidgets() {
    return cy.get(".orangehrm-dashboard-widget");
  }

  get timeAtWorkWidget() {
    return cy.get(".oxd-dashboard-widget").contains("Time at Work");
  }

  get myActionsWidget() {
    return cy.get(".oxd-dashboard-widget").contains("My Actions");
  }

  get quickLaunchWidget() {
    return cy.get(".oxd-dashboard-widget").contains("Quick Launch");
  }

  get buzzLatestPostsWidget() {
    return cy.get(".oxd-dashboard-widget").contains("Buzz Latest Posts");
  }

  get employeesOnLeaveWidget() {
    return cy.get(".oxd-dashboard-widget").contains("Employees on Leave Today");
  }

  get employeeDistributionWidget() {
    return cy
      .get(".oxd-dashboard-widget")
      .contains("Employee Distribution by Sub Unit");
  }

  get pendingLeaveRequestsWidget() {
    return cy.get(".oxd-dashboard-widget").contains("Pending Leave Requests");
  }

  // Layout and Responsive Elements
  get sideMenu() {
    return cy.get(".oxd-main-menu");
  }

  get topbar() {
    return cy.get(".oxd-topbar");
  }

  get mainContent() {
    return cy.get(".oxd-layout-container");
  }

  get mobileMenuToggle() {
    return cy.get(".oxd-topbar-header-hamburger");
  }

  // Actions and Methods
  verifyDashboardLoaded() {
    cy.url().should("include", "/dashboard/index");
    this.dashboardTitle.should("be.visible").and("contain.text", "Dashboard");
    this.mainNavigationMenu.should("be.visible");
  }

  navigateToAdmin() {
    this.adminMenu.click();
    cy.url().should("include", "/admin/viewSystemUsers");
  }

  navigateToPIM() {
    this.pimMenu.click();
    cy.url().should("include", "/pim/viewEmployeeList");
  }

  verifyDashboardElements() {
    // Verify title
    this.dashboardTitle.should("be.visible").and("contain.text", "Dashboard");

    // Verify main navigation menu
    this.mainNavigationMenu.should("be.visible");

    // Verify user dropdown
    this.userDropdown.should("be.visible");

    // Verify at least one dashboard widget is present
    this.dashboardWidgets.should("have.length.greaterThan", 0);
  }

  verifyNavigationMenu() {
    this.mainNavigationMenu.should("be.visible");

    // Verify common menu items are present
    this.dashboardMenu.should("be.visible");
    this.adminMenu.should("be.visible");
    this.pimMenu.should("be.visible");
  }

  verifyUserProfileDropdown() {
    this.userDropdown.should("be.visible");
    this.userProfileName.should("be.visible");
  }

  verifyDashboardWidgets() {
    // Check that dashboard widgets are loaded
    this.dashboardWidgets.should("have.length.greaterThan", 0);

    // Verify specific widgets are present (optional - depends on user permissions)
    cy.get("body").then(($body) => {
      if (
        $body.find('.orangehrm-dashboard-widget:contains("Time at Work")')
          .length
      ) {
        cy.log("Time at Work widget is present");
      }
      if (
        $body.find('.orangehrm-dashboard-widget:contains("My Actions")').length
      ) {
        cy.log("My Actions widget is present");
      }
      if (
        $body.find('.orangehrm-dashboard-widget:contains("Quick Launch")')
          .length
      ) {
        cy.log("Quick Launch widget is present");
      }
    });
  }

  navigateToModule(moduleName) {
    switch (moduleName.toLowerCase()) {
      case "admin":
        this.adminMenu.click();
        break;
      case "pim":
        this.pimMenu.click();
        break;
      case "leave":
        this.leaveMenu.click();
        break;
      case "time":
        this.timeMenu.click();
        break;
      case "recruitment":
        this.recruitmentMenu.click();
        break;
      case "my info":
        this.myInfoMenu.click();
        break;
      case "performance":
        this.performanceMenu.click();
        break;
      case "directory":
        this.directoryMenu.click();
        break;
      case "maintenance":
        this.maintenanceMenu.click();
        break;
      case "claim":
        this.claimMenu.click();
        break;
      case "buzz":
        this.buzzMenu.click();
        break;
      default:
        throw new Error(`Module ${moduleName} not found`);
    }
    cy.wait(2000); // Wait for navigation
  }

  verifyPageRedirection(expectedUrl, expectedTitle) {
    cy.url().should("include", expectedUrl);
    cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
      .should("be.visible")
      .and("contain.text", expectedTitle);
  }

  clickUserDropdown() {
    this.userDropdown.should("be.visible").click();
  }

  clickLogout() {
    this.logoutButton.should("be.visible").click();
    cy.wait(2000); // Wait for logout process
  }

  logout() {
    this.clickUserDropdown();
    this.clickLogout();
  }

  verifyLogoutRedirection() {
    cy.url().should("include", "/auth/login");
    cy.get('[name="username"]').should("be.visible");
    cy.get('[name="password"]').should("be.visible");
    cy.get('[type="submit"]').should("be.visible");
  }

  // Responsive Design Methods
  setMobileViewport() {
    cy.viewport(375, 667); // iPhone SE dimensions
  }

  setDesktopViewport() {
    cy.viewport(1280, 720); // Default desktop dimensions
  }

  verifyMobileLayout() {
    // In mobile view, navigation might be collapsed or hidden
    this.setMobileViewport();
    cy.wait(1000);

    // Check if mobile menu toggle exists and works
    cy.get("body").then(($body) => {
      if ($body.find(".oxd-main-menu-button").length) {
        this.mobileMenuToggle.should("be.visible");
      }
    });
  }

  verifyResponsiveNavigation() {
    this.setMobileViewport();

    // Check if navigation adapts to mobile
    cy.get("body").then(($body) => {
      // Mobile menu should be collapsible or toggle-able
      if ($body.find(".oxd-main-menu-button").length) {
        this.mobileMenuToggle.click();
        this.mainNavigationMenu.should("be.visible");
      } else {
        // If no toggle button, menu should still be accessible
        this.mainNavigationMenu.should("be.visible");
      }
    });

    // Restore desktop view
    this.setDesktopViewport();
  }

  verifyEssentialElementsAccessible() {
    // Ensure critical elements remain accessible in mobile view
    this.setMobileViewport();

    this.userDropdown.should("be.visible");
    this.dashboardTitle.should("be.visible");

    // Check if at least main navigation is accessible
    cy.get("body").then(($body) => {
      const hasMenuButton = $body.find(".oxd-main-menu-button").length > 0;
      const hasVisibleMenu = $body.find(".oxd-main-menu:visible").length > 0;

      if (hasMenuButton) {
        this.mobileMenuToggle.should("be.visible");
      } else if (hasVisibleMenu) {
        this.mainNavigationMenu.should("be.visible");
      }
    });

    // Restore desktop view
    this.setDesktopViewport();
  }

  // Helper method to wait for dashboard to fully load
  waitForDashboardLoad() {
    // Wait for main elements to be visible
    this.dashboardTitle.should("be.visible");
    this.mainNavigationMenu.should("be.visible");
    this.userDropdown.should("be.visible");

    // Wait for any loading indicators to disappear
    cy.get(".oxd-loading-spinner", { timeout: 5000 }).should("not.exist");

    // Additional wait for dynamic content
    cy.wait(2000);
  }

  // Method to verify specific dashboard widget content
  verifyWidgetContent(widgetName) {
    cy.get(".oxd-dashboard-widget").contains(widgetName).should("be.visible");
  }

  // Method to interact with quick launch if present
  clickQuickLaunchItem(itemName) {
    this.quickLaunchWidget.within(() => {
      cy.contains(itemName).click();
    });
  }
}

export default DashboardPage;
