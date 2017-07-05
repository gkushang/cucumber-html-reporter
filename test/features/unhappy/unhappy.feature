@unhappy @reporting
Feature: Unhappy HTML reporting

  @attachScreenshots
  Scenario: Fred wants to see a Screenshot attached to the HTML report
    Given Fred runs a failing cucumber scenario
    When he provides cucumber JSON file to reporter
    And a failing scenario captures a screenshot
    And a failing scenario captures a json payload
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

  @ambiguousStep
  Scenario: Fred wants to see if steps are ambiguous on the HTML report
    Given Fred runs a cucumber scenario
    When he left this step to be ambiguous
    Then cucumber-html-reporter should create HTML report with ambiguous steps
