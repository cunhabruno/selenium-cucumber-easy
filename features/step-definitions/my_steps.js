import {Given, Then, When, setDefaultTimeout} from 'cucumber';
import HelperScripts from '../../automation-scripts/helpers';
import PageObjectsParser from '../../page-objects-parse';

const pageObjectsParser = new PageObjectsParser(pageObjects);

setDefaultTimeout(15000);

Given('I go to the following page {string}', async function(string) {
    await driver.get(string);
});

When('I select the value {string} on {string} dropdown on {string}', async function(value, dropDownName, pageName) {
   await HelperScripts.selectValueOnDropDown(pageObjectsParser.get2LevelsLocator(pageName, dropDownName), value);
});

Then('I can see {string} on {string}', async function(childObject, parent) {
    await HelperScripts.checkElementExists(pageObjectsParser.get2LevelsLocator(parent, childObject));
});
