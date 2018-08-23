const {Given, Then, When, setDefaultTimeout} = require('cucumber');
const HelperScripts = require('../../automation-scripts/helpers');
const {pageObjectsParser} = require('../../main');
const assert = require('assert');

setDefaultTimeout(25000);

Given('I go to the following page {string}', async function(string) {
    await driver.get(string);
    await driver.manage().window().maximize();
});

Given('I press the key {string}', async function(keyToPress) {
    await HelperScripts.pressKey(keyToPress);
});

/**
 * Steps to validate elements state
 */

Then(/^I can see "([^"]*)" on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can NOT see "([^"]*)" displayed on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can NOT see "([^"]*)" (?:label |)displayed with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" selected on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" (?:label |)selected with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" unselected on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:label |)unselected with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});
//Check if element is enabled or disabled
Then(/^I can see "([^"]*)" enabled on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" (?:button |)enabled with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" disabled on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:button |)disabled with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" enabled on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can see "([^"]*)" disabled on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

//Check if element is displayed
Then(/^I can see "([^"]*)"(?: displayed$|)$/, async function(elementName) {
    await HelperScripts.waitVisibilityOfElement(pageObjectsParser.get1LevelLocator(elementName), 9000);
});

Then(/^I can see new tab opened with the title "([^"]*)"$/, async function(tabTitle) {
    const wnds = await driver.getAllWindowHandles();
    await driver.switchTo().window(wnds[1]);
    let actualTitle = await driver.getTitle();
    assert.equal(actualTitle.toString().toUpperCase(), tabTitle.toUpperCase(), 'deu');
});

/****
 * Steps to Make actions on elements
 */

Given(/^I click on "([^"]*)" (?:button |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I click on "([^"]*)" (?:button |)on "([^"]*)" with the text "([^"]*)"$/, async function (childObject, parent, textParameter) {
    await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

Given(/^I mouse hover on "([^"]*)" (?:button |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.mouseHover(pageObjectsParser.get2LevelsLocator(parent, childObject));
    await driver.sleep(8000);
});

When(/^I select the value "([^"]*)" on "([^"]*)" dropdown on "([^"]*)"$/, async function(value, dropDownName, pageName) {
    await HelperScripts.selectValueOnDropDown(pageObjectsParser.get2LevelsLocator(pageName, dropDownName), value);
});

Then(/^I fill in "([^"]*)" (?:input |field |)on "([^"]*)" with the value "([^"]*)"$/, async function(childObject, parent, textToFill) {
    await HelperScripts.writeText(pageObjectsParser.get2LevelsLocator(parent, childObject), textToFill);
});

Then(/^I append text in "([^"]*)" (?:input |field |)on "([^"]*)" with the value "([^"]*)"$/, async function(childObject, parent, textToAdd) {
    await HelperScripts.appendText(pageObjectsParser.get2LevelsLocator(parent, childObject), textToAdd);
});

Given(/^I clear "([^"]*)" (?:input |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.clearInputElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

/*****
 * Steps to verify elements texts
 */

Then(/^I can see "([^"]*)" on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, expectedText) {
    await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" (?:label |)with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, expectedText, parent) {
    await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" on "([^"]*)"containing the text "([^"]*)"$/, async function(childObject, parent, expectedText) {
    await HelperScripts.checkElementTextContains(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" (?:label |)containing the text "([^"]*)" on "([^"]*)"$/, async function(childObject, expectedText, parent) {
    await HelperScripts.checkElementTextContains(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});