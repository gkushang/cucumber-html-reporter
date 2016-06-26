Feature: Unhappy HTML reporting

  In order to review cucumber reports
  Fred, a cucumber user
  Wants to have cucumber reports in HTML


  @attachScreenshot
  Scenario: Fred wants to see a Screenshot attached to the HTML report
    Given Fred runs a failing cucumber scenario
    When he choose "html" output as one of the formatter
    And a failing scenario captures a screenshot
    Then the output should contain test results with screenshot in HTML format

  @pendingStep
  Scenario: Fred wants to see if steps are pending in the HTML report
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he left one of the step as a pending
    Then the output should contain the pending test in the HTML pie chart

  @undefinedStep
  Scenario: Fred wants to see if steps are undefined on the HTML report
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he left this step as a undefined
    Then the output should contain the undefined steps in the HTML pie chart

  @skippedStep
  Scenario: Fred wants to see if steps are skipped on the HTML report
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he left this step as a pending
    Then the output should contain the skipped steps in the HTML pie chart