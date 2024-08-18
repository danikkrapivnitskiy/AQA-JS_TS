Feature: [UI] [Products]

  Background:
    Given I open Sales Portal
    When I create product via API
    And I log in as Admin

  @run
  @smoke
  @product
  @regression
  Scenario: Edit product
    And I open Products List page on "Home" page
    And I open Edit Product page on "Products List" page
    And I fill product inputs on "Edit Product" page with following values:
      | name   | a1A |
      | amount | 0   |
      | notes  |     |
      | price  | 15  |
    Then I should see updated Product in table on "Products List" page
