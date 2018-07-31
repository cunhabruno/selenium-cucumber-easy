import {Given, Then, When, setDefaultTimeout} from 'cucumber';
import HelperScripts from '../../automation-scripts/helpers';
import PageObjectsParser from '../../page-objects-parse';

const pageObjectsParser = new PageObjectsParser(pageObjects);

setDefaultTimeout(15000);

Given(/^I go to the following page "([^"]*)"$/, async (string) => {
    await browser.get(string);
});

When(/^I select the value "([^"]*)" on "([^"]*)" dropdown on "([^"]*)"$/, async (value, dropDownName, pageName) => {
   await HelperScripts.selectValueOnDropDown(pageObjectsParser.get2LevelsLocator(pageName, dropDownName), value);
});
