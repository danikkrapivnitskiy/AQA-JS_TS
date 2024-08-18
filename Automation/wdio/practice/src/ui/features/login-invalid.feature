Feature: [UI] [Login]

  Scenario Outline: Not logged in with invalid credentials
    Given I open Sales Portal
    Then I should be on "Sign In" page
    When I enter "<username>" in "Email input" on "Sign In" page
    And I enter "<password>" in "Password input" on "Sign In" page
    And I click on "Login button" on "Sign In" page
    Then I should be on "Sign In" page
    And I should see "Notification label" contains text "<message>" on "Sign In" page

    Examples:
      | username            | password  | message               |
      | aaa@aaa.com         | password  | Incorrect credentials |
      | aqacourse@gmail.com | aaaaaaaa! | Incorrect credentials |
