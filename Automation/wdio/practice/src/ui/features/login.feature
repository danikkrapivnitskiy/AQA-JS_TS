Feature: [UI] [Login]

  Scenario: Successfully logged in with valid credentials
    Given I open Sales Portal
    Then I should be on "Sign In" page
    When I enter "aqacourse@gmail.com" in "Email input" on "Sign In" page
    And I enter "password" in "Password input" on "Sign In" page
    And I click on "Login button" on "Sign In" page
    Then I should be on "Home" page
    And I should see "Logged User label" contains text "AQA " on "Home" page
