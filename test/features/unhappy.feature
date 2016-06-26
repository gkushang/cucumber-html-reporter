Feature: Unhappy HTML reporting

  In order to review cucumber reports
  Fred, a cucumber user
  Wants to have cucumber reports in HTML


  @attachScreenshot
  Scenario: Fred wants to see a Screenshot attached to the HTML report
    Given Fred runs a failing cucumber scenario
    When he has the JSON cucumber formatted file at the end of run
    And a failing scenario captures a screenshot
    Then cucumber-html-reporter should create HTML report with Screenshot

  @pendingStep
  Scenario: Fred wants to see if steps are pending in the HTML report
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he left one of the step as a pending
    Then cucumber-html-reporter should create HTML report with pending step/snippets

  @undefinedStep
  Scenario: Fred wants to see if steps are undefined on the HTML report
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he left this step as a undefined
    Then cucumber-html-reporter should create undefined step in HTML report

  @skippedStep
  Scenario: Fred wants to see if steps are skipped on the HTML report
    Given Fred attaches the "test data to be printed" to the Given step of passing cucumber scenario
    When he left this step as a pending
    Then cucumber-html-reporter should create HTML report with skipped step