Feature: Example feature

  As a user x
  I want to have the example feature
  So I can see cucumber example :)

  Scenario: Open Ulbra main page
    Given I go to the following page "http://www.ulbra.br"
    When I select the value "Gravatai" on "Select unit dropdown" on "Ulbra main page"
    Then I can see "Ulbra Gravatai Main page"