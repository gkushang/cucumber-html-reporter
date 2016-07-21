Feature: Unhappy HTML reporting

  @attachScreenshot
  Scenario: Fred wants to see a Screenshot attached to the HTML report
    Given Fred runs a failing cucumber scenario
    When he has the JSON cucumber formatted file at the end of run
    And a failing scenario captures a screenshot
    Then cucumber-html-reporter should create HTML report with Screenshot

  @pendingStep
  Scenario: Fred wants to see if steps are pending in the HTML report
    Given Fred runs a cucumber scenario
    When he left this step as a pending
    Then cucumber-html-reporter should report pending step with code-snippets in HTML report

  @undefinedStep
  Scenario: Fred wants to see if steps are undefined on the HTML report
    Given Fred runs a cucumber scenario
    When he left this step as a undefined
    Then cucumber-html-reporter should create undefined step in HTML report

  @skippedStep
  Scenario: Fred wants to see if steps are skipped on the HTML report
    Given Fred runs a cucumber scenario
    When he throws the pending exception from this step
    Then cucumber-html-reporter should create HTML report with skipped and pending steps