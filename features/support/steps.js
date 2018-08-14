import {Given, Then, When, setDefaultTimeout} from 'cucumber';
import HelperScripts from '../../automation-scripts/helpers';
import {pageObjectsParser} from '../../main';
import assert from 'assert';

setDefaultTimeout(25000);

Given('I go to the following page {string}', async function(string) {
    await driver.get(string);
});

When(/^I select the value "([^"]*)" on "([^"]*)" dropdown on "([^"]*)"$/, async function(value, dropDownName, pageName) {
   await HelperScripts.selectValueOnDropDown(pageObjectsParser.get2LevelsLocator(pageName, dropDownName), value);
});

Then(/^I can see "([^"]*)" on "([^"]*)"$/, async function(childObject, parent) {
    await HelperScripts.checkElementExists(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Then(/^I can see "([^"]*)"(?: displayed$|)$/, async function(elementName) {
    await HelperScripts.waitVisibilityOfElement(pageObjectsParser.get1LevelLocator(elementName), 9000);
});

Then(/^I can see new tab opened with the title "([^"]*)"$/, async function(tabTitle) {
    const wnds = await driver.getAllWindowHandles();
    await driver.switchTo().window(wnds[1]);
    let actualTitle = await driver.getTitle();
    assert.equal(actualTitle.toString().toUpperCase(), tabTitle.toUpperCase(), 'deu');
});

Given(/^I click on "([^"]*)" (?:button |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.clickOnElement(pageObjectsParser.get2LevelsLocator(parent, childObject));
});

Given(/^I mouse hover on "([^"]*)" (?:button |)on "([^"]*)"$/, async function (childObject, parent) {
    await HelperScripts.mouseHover(pageObjectsParser.get2LevelsLocator(parent, childObject));
    await driver.sleep(8000);
});

Then(/^I can see "([^"]*)" on "([^"]*)" with the text "([^"]*)"$/, async function(childObject, parent, expectedText) {
    await HelperScripts.checkElementText(pageObjectsParser.get2LevelsLocator(parent, childObject), true, expectedText);
});