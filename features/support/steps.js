const assert = require('assert');
const fs = require('fs');
const {
  Given, Then, When, setDefaultTimeout, After,
} = require('cucumber');
const HelperScripts = require('../../automation-scripts/helpers');
const logger = require('../../utils/logger');
const Utils = require('../../automation-scripts/utils');
const { pageObjectsParser, testRunner } = require('../../cli/run');

setDefaultTimeout(200000);

/** ****************************************
 * Misc steps
 ***************************************** */

Given('I go to the following page {string}', async (string) => {
  await driver.get(string);
  await driver.manage().window().maximize();
});

Given('I press the key {string}', async (keyToPress) => {
  await HelperScripts.pressKey(keyToPress);
});

Given('Wait {string} milliseconds', async (waitTime) => {
  await driver.sleep(waitTime);
});

Then(/^I can see new tab opened with the title "([^"]*)"$/, async (tabTitle) => {
  const wnds = await driver.getAllWindowHandles();
  await driver.switchTo().window(wnds[1]);
  const actualTitle = await driver.getTitle();
  assert.equal(actualTitle.toString().toUpperCase(), tabTitle.toUpperCase(), 'deu');
});

/** ****************************************
 * Check if element is displayed
 ***************************************** */

Then(/^I can see "([^"]*)" on "([^"]*)"(?: displayed|)$/, async (childObject, parent) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can NOT see "([^"]*)" on "([^"]*)"(?: displayed|)$/, async (childObject, parent) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

Then(/^I can see "([^"]*)" (?:label |)that has the text "([^"]*)" displayed on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can NOT see "([^"]*)" (?:label |)that has the text "([^"]*)" displayed on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" displayed$/, async (elementName) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName), true);
});

Then(/^I can NOT see "([^"]*)" displayed$/, async (elementName) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName), false);
});

Then(/^I can see "([^"]*)" that has the text "([^"]*)" displayed$/, async (elementName, elementText) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName)(elementText), true);
});

Then(/^I can NOT see "([^"]*)" that has the text "([^"]*)" displayed$/, async (elementName, elementText) => {
  await HelperScripts.checkElementDisplayed(pageObjectsParser.get1LevelLocator(elementName)(elementText), false);
});

/** ****************************************
 * Check if element is present
 ***************************************** */

Then(/^I can see "([^"]*)" (?:label |)that has the text "([^"]*)" present on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can NOT see "([^"]*)" (?:label |)that has the text "([^"]*)" present on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:label |)present on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can NOT see "([^"]*)" (?:label |)present on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.checkElementPresent(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

/** ****************************************
 * Check if element is selected
 ***************************************** */

Then(/^I can see "([^"]*)" selected on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can see "([^"]*)" selected on "([^"]*)" that has the text "([^"]*)"$/, async (childObject, parent, elementText) => {
  await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" (?:label |)selected that has the text "([^"]*)" on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" unselected on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

Then(/^I can see "([^"]*)" unselected on "([^"]*)" that has the text "([^"]*)"$/, async (childObject, parent, elementText) => {
  await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:label |)unselected that has the text "([^"]*)" on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementSelected(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

/** ****************************************
 * Check if element is enabled
 ***************************************** */

Then(/^I can see "([^"]*)" enabled on "([^"]*)" that has the text "([^"]*)"$/, async (childObject, parent, elementText) => {
  await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" (?:button |)enabled that has the text "([^"]*)" on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), true);
});

Then(/^I can see "([^"]*)" disabled on "([^"]*)" that has the text "([^"]*)"$/, async (childObject, parent, elementText) => {
  await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:button |)disabled that has the text "([^"]*)" on "([^"]*)"$/, async (childObject, elementText, parent) => {
  await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject)(elementText), false);
});

Then(/^I can see "([^"]*)" (?:button |)enabled on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject), true);
});

Then(/^I can see "([^"]*)" (?:button |)disabled on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.checkElementEnabled(pageObjectsParser.get2LevelsLocator(parent, childObject), false);
});

/** ****************************************
 * Click on an element
 ***************************************** */

Given(/^I double click on "([^"]*)"(?:button|link|)$/, async (elementName) => {
  await HelperScripts.doubleClickOnElement(pageObjectsParser.get1LevelLocator(elementName));
});

Given(/^I click on "([^"]*)"(?:button|link|)$/, async (elementName) => {
  await HelperScripts.clickOnElement(pageObjectsParser.get1LevelLocator(elementName));
});

Given(/^I click on "([^"]*)" (?:button|link|)that has the text "([^"]*)"$/, async (elementName, textParameter) => {
  await HelperScripts.clickOnElement(pageObjectsParser.get1LevelLocator(elementName)(textParameter));
});

Given(/^I click on "([^"]*)" (?:button |link |)on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I click on "([^"]*)" (?:button |link |)on "([^"]*)" if it is displayed$/, async (childObject, parent) => {
  await HelperScripts.clickOnElementIfDisplayed(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I click on "([^"]*)" (?:button |link |)on "([^"]*)" that has the text "([^"]*)"$/, async (childObject, parent, textParameter) => {
  await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

Given(/^I click on "([^"]*)" (?:button |link |)that has the text "([^"]*)" on "([^"]*)"$/, async (childObject, textParameter, parent) => {
  await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

/** ****************************************
 * Mouse hover on an element
 ***************************************** */
Given(/^I mouse hover on "([^"]*)"(?:button|link|)$/, async (elementName) => {
  await HelperScripts.mouseHover(pageObjectsParser.get1LevelLocator(elementName));
});

Given(/^I mouse hover on "([^"]*)" (?:button |link |)on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.mouseHover(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I mouse hover on "([^"]*)" (?:button |link |)that has the text "([^"]*)" on "([^"]*)"$/, async (childObject, textParameter, parent) => {
  await HelperScripts.mouseHover(pageObjectsParser.get2LevelsLocator(parent, childObject)(textParameter));
});

/** ****************************************
 * Dropdown actions
 ***************************************** */

When(/^I select the value "([^"]*)" on "([^"]*)" dropdown on "([^"]*)"$/, async (value, dropDownName, pageName) => {
  await HelperScripts.selectValueOnDropDown(pageObjectsParser.get2LevelsLocator(pageName, dropDownName), value);
});

/** ****************************************
 * write/append/clear text on an element
 ***************************************** */

Then(/^I fill in "([^"]*)" (?:input |field |)on "([^"]*)" with the value "([^"]*)"$/, async (childObject, parent, textToFill) => {
  await HelperScripts.writeText(pageObjectsParser.get2LevelsLocator(parent, childObject), textToFill);
});

Then(/^I append text in "([^"]*)" (?:input |field |)on "([^"]*)" with the value "([^"]*)"$/, async (childObject, parent, textToAdd) => {
  await HelperScripts.appendText(pageObjectsParser.get2LevelsLocator(parent, childObject), textToAdd);
});

Given(/^I clear "([^"]*)" (?:input |)on "([^"]*)"$/, async (childObject, parent) => {
  await HelperScripts.clearInputElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

/** ****************************************
 * Check element text
 ***************************************** */

Then(/^I can see "([^"]*)" (?:label |)on "([^"]*)" with the text "([^"]*)"$/, async (childObject, parent, expectedText) => {
  await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" (?:label |)with the text "([^"]*)" on "([^"]*)"$/, async (childObject, expectedText, parent) => {
  await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" on "([^"]*)" containing the text "([^"]*)"$/, async (childObject, parent, expectedText) => {
  await HelperScripts.checkElementTextContains(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

Then(/^I can see "([^"]*)" (?:label |)containing the text "([^"]*)" on "([^"]*)"$/, async (childObject, expectedText, parent) => {
  await HelperScripts.checkElementTextContains(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});

After(async (scenario) => {
  if (scenario.result.status === 'failed') {
    if (!fs.existsSync(testRunner.getErrorScreenshotsPath())) {
      fs.mkdirSync(testRunner.getErrorScreenshotsPath(), { recursive: true }, (err) => {
        logger.error(
          `Error trying to create folder ${testRunner.getErrorScreenshotsPath()} error description: ${err}`,
        );
      });
    }
    await Utils.takeScreenshot(`${testRunner.getErrorScreenshotsPath()}/errorOnLine${scenario.sourceLocation.line}`);
  }
});
