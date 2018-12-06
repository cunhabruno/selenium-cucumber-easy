const {Given, Then, When, setDefaultTimeout} = require('cucumber');
const HelperScripts = require('../../automation-scripts/helpers');
const {pageObjectsParser} = require('../../main');
const assert = require('assert');

setDefaultTimeout(200000);

/******************************************
 * Misc steps
 ******************************************/

Given('I go to the following page {string}', async function(string) {
    await driver.get(string);
    await driver.manage().window().maximize();
});

Given('I press the key {string}', async function(keyToPress) {
    await HelperScripts.pressKey(keyToPress);
});

Given('Wait {string} milliseconds', async function(waitTime) {
    await driver.sleep(waitTime);
});

Then(/^I can see new tab opened with the title "([^"]*)"$/, async function(tabTitle) {
    const wnds = await driver.getAllWindowHandles();
    await driver.switchTo().window(wnds[1]);
    let actualTitle = await driver.getTitle();
    assert.equal(actualTitle.toString().toUpperCase(), tabTitle.toUpperCase(), 'deu');
});

/******************************************
 * Check if element is displayed
 ******************************************/

Then(/^I can see "([^"]*)" on "([^"]*)"(?: displayed|)$/, async function(childObject, parent) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can NOT see "([^"]*)" on "([^"]*)"(?: displayed|)$/, async function(childObject, parent) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

Then(/^I can see "([^"]*)" (?:label |)that has the text "([^"]*)" displayed on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can NOT see "([^"]*)" (?:label |)that has the text "([^"]*)" displayed on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" displayed$/, async function(elementName) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName), true);
});

Then(/^I can NOT see "([^"]*)" displayed$/, async function(elementName) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName), false);
});

Then(/^I can see "([^"]*)" that has the text "([^"]*)" displayed$/, async function(elementName, elementText) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName)(elementText), true);
});

Then(/^I can NOT see "([^"]*)" that has the text "([^"]*)" displayed$/, async function(elementName, elementText) {
    await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName)(elementText), false);
});

/******************************************
 * Check if element is present
 ******************************************/

Then(/^I can see "([^"]*)" (?:label |)that has the text "([^"]*)" present on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can NOT see "([^"]*)" (?:label |)that has the text "([^"]*)" present on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:label |)present on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can NOT see "([^"]*)" (?:label |)present on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

/******************************************
 * Check if element is selected
 ******************************************/

Then(/^I can see "([^"]*)" selected on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can see "([^"]*)" selected on "([^"]*)" that has the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" (?:label |)selected that has the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" unselected on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

Then(/^I can see "([^"]*)" unselected on "([^"]*)" that has the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:label |)unselected that has the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

/******************************************
 * Check if element is enabled
 ******************************************/

Then(/^I can see "([^"]*)" enabled on "([^"]*)" that has the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" (?:button |)enabled that has the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" disabled on "([^"]*)" that has the text "([^"]*)"$/, async function(childObject, parent, elementText) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:button |)disabled that has the text "([^"]*)" on "([^"]*)"$/, async function(childObject, elementText, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:button |)enabled on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can see "([^"]*)" (?:button |)disabled on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

/******************************************
 * Click on an element
 ******************************************/

Given(/^I click on "([^"]*)"(?:button|link|)$/, async function (elementName) {
    await HelperScripts.clickOnElement(pageObjectsParser.get1LevelLocator(elementName));
});

Given(/^I click on "([^"]*)" (?:button|link|)that has the text "([^"]*)"$/, async function (elementName, textParameter) {
    await HelperScripts.clickOnElement(pageObjectsParser.get1LevelLocator(elementName)(textParameter));
});

Given(/^I click on "([^"]*)" (?:button |link |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I click on "([^"]*)" (?:button |link |)on "([^"]*)" that has the text "([^"]*)"$/, async function (childObject, parent, textParameter) {
    await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

Given(/^I click on "([^"]*)" (?:button |link |)that has the text "([^"]*)" on "([^"]*)"$/, async function (childObject, textParameter, parent) {
    await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

/******************************************
 * Mouse hover on an element
 ******************************************/

Given(/^I mouse hover on "([^"]*)" (?:button |link |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.mouseHover(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I mouse hover on "([^"]*)" (?:button |link |)that has the text "([^"]*)" on "([^"]*)"$/, async function (childObject, textParameter, parent) {
    await HelperScripts.mouseHover(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

/******************************************
 * Dropdown actions
 ******************************************/

When(/^I select the value "([^"]*)" on "([^"]*)" dropdown on "([^"]*)"$/, async function(value, dropDownName, pageName) {
    await HelperScripts.selectValueOnDropDown(pageObjectsParser.get2LevelsLocator(pageName, dropDownName), value);
});

/******************************************
 * write/append/clear text on an element
 ******************************************/

Then(/^I fill in "([^"]*)" (?:input |field |)on "([^"]*)" with the value "([^"]*)"$/, async function(childObject, parent, textToFill) {
    await HelperScripts.writeText(pageObjectsParser.get2LevelsLocator(parent, childObject), textToFill);
});

Then(/^I append text in "([^"]*)" (?:input |field |)on "([^"]*)" with the value "([^"]*)"$/, async function(childObject, parent, textToAdd) {
    await HelperScripts.appendText(pageObjectsParser.get2LevelsLocator(parent, childObject), textToAdd);
});

Given(/^I clear "([^"]*)" (?:input |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.clearInputElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

/******************************************
 * Check element text
 ******************************************/

Then(/^I can see "([^"]*)" (?:label |)on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, expectedText) {
    await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" (?:label |)with the text "([^"]*)" on "([^"]*)"$/, async function(childObject, expectedText, parent) {
    await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" on "([^"]*)" containing the text "([^"]*)"$/, async function(childObject, parent, expectedText) {
    await HelperScripts.checkElementTextContains(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" (?:label |)containing the text "([^"]*)" on "([^"]*)"$/, async function(childObject, expectedText, parent) {
    await HelperScripts.checkElementTextContains(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});