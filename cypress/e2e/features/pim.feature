Feature: PIM Employee Management

  Background:
    Given user is logged in as admin
    And user navigates to PIM page

  Scenario Outline: Add new employee successfully
    When user adds a new employee with first name "<firstName>" and last name "<lastName>"
    And user should see employee creation success message
    Then the employee "<firstName> <lastName>" should appear in the employee list

    Examples:
      | firstName | lastName  |
      | Arda      | Arifin    |
      | Daniel    | Putra     |

  Scenario: Add employee with existing employee ID (Negative Test)
    Given an employee with ID "0001" already exists in the system
    When user tries to add a new employee with existing employee ID "0001"
    Then user should see employee ID already exists error message

  Scenario: Search for existing employee
    Given an employee "Arda Arifin" exists in the system
    When user searches for employee "Arda Arifin"
    Then user should see "Arda Arifin" in employee search results


  Scenario: Delete employee record
    Given an employee "Daniel Putra" exists in the system
    When user deletes employee "Daniel Putra"
    Then user should see employee deletion success message
    And "Daniel Putra" should not appear in employee list