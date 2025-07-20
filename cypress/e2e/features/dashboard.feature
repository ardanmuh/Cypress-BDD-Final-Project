Feature: Dashboard Navigation and Display

  Background:
    Given user is logged in as admin
    And user is on the dashboard page

  Scenario: Verify dashboard main elements are displayed
    Then user should see the dashboard title
    And user should see the main navigation menu
    And user should see user profile dropdown
    And user should see dashboard widgets

  Scenario Outline: Navigate to different modules from dashboard
    When user clicks on "<module>" menu item
    Then user should be redirected to "<expectedPage>" page
    And user should see "<pageTitle>" as page title

    Examples:
      | module | expectedPage           | pageTitle |
      | Admin  | admin/viewSystemUsers  | Admin     |
      | PIM    | pim/viewEmployeeList   | PIM       |

  Scenario: User logout functionality from dashboard
    When user clicks on user profile dropdown
    And user clicks on logout option
    Then user should be redirected to login page
    And user should see login form

  Scenario: Verify dashboard responsiveness and layout
    When user changes viewport to mobile size
    Then dashboard should adapt to mobile layout
    And navigation menu should be collapsible