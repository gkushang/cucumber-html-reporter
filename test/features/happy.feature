Feature: Happy HTML reporting

  In order to review cucumber reports
  Fred, a cucumber user
  Wants to have cucumber reports in HTML

  Background:
    When this feature runs with background

  @testPassing
  Scenario: Fred wants to see passing scenarios in the HTML report
    Given Fred runs a passing cucumber scenario
    When he has the JSON cucumber formatted file at the end of run
    Then cucumber-html-reporter should create HTML report

  @testScenarioOutline
  Scenario Outline: Fred runs scenario outline for <name> and print on HTML report
    Given Fred runs a passing cucumber scenario on behalf of "<name>"
    When he has the JSON cucumber formatted file at the end of run
    Then cucumber-html-reporter should create HTML report

    Examples:
      | name |
      | John |
      | Bob  |

  @testAttachDebugData
  Scenario: Fred wants to print test data in the HTML reports for debugging purpose
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he has the JSON cucumber formatted file at the end of run
    Then cucumber-html-reporter should create HTML report with test-data


  @testDataTable
  Scenario: Fred wants to use data table and print on HTML report
    Given Fred runs a passing scenario for the following data set
      | id | name   | id | name   | id | name   | id | name   | id | name   | id | name   | id | name   |
      | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A |
      | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B |
      | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A |
      | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B |
      | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A |
      | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B |
      | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A |
      | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B |
      | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A | 1  | data-A |
      | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B | 2  | data-B |

    When he has the JSON cucumber formatted file at the end of run
    Then cucumber-html-reporter should create HTML report with data-table
