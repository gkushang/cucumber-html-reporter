Feature: Happy HTML reporting with cucumber-parallel executions

  In order to review cucumber reports
  Fred, a cucumber user
  Wants to have cucumber reports in HTML

  Background:
    When this feature runs with background

  @testPassing
  Scenario: Fred wants to see passing scenarios in the HTML report
    Given Fred runs a passing cucumber scenario
    When he choose "html" output as one of the formatter
    Then the output should contain test results in HTML format

  @testScenarioOutline
  Scenario Outline: Fred wants to run scenario outline and print on HTML report
    Given Fred runs a passing cucumber scenario on behalf of "<name>"
    When he choose "html" output as one of the formatter
    Then the output should contain test results in HTML format

    Examples:
      | name |
      | John |
      | Bob  |

  @testAttachDebugData
  Scenario: Fred wants to print test data in the HTML reports for debugging purpose
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he choose "html" output as one of the formatter
    Then the output should contain test data attached to the Given step in HTML format


  @testDataTable
  Scenario: Fred wants to use data table and print on HTML report
    Given Fred runs a passing scenario for the following data set
      | id | name   |
      | 1  | data-A |
      | 2  | data-B |
    When he choose "html" output as one of the formatter
    Then the output should contain data table attached in HTML format
