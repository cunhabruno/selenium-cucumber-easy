Feature: Example feature

  As a user x
  I want to have the example feature
  So I can see cucumber example :)

  Scenario: Open Ulbra main page
    Given I go to the following page "http://www.ulbra.br"
    When I select the value " RS | Gravataí" on "Unidade dropdown" dropdown on "Ulbra main page"
    Then I can see "Main page" on "Ulbra Main Page"
    And I can see "Gravatai Logo" on "Ulbra Main Page"

  Scenario: Log in auto atendimento
    Given I click on "Auto atendimento Button" button on "Ulbra main page"
    Then I can see "Auto atendimento login page" displayed