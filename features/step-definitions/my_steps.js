import {Given, Then, When, setDefaultTimeout} from 'cucumber';
import HelperScripts from '../../automation-scripts/helpers';
import Objects from '../../page-objects/objects-helper';
import landingPageHash from '../../page-objects/landing-page';

const landingPageObj = new Objects(landingPageHash);
setDefaultTimeout(15000);

Given(/^I go to the following page "([^"]*)"$/, async (string) => {
    await browser.get(string);
});

When(/^I select the value "([^"]*)" on "([^"]*)" dropdown on "([^"]*)"$/, async (value, dropDownName, pageName) => {
   await HelperScripts.selectValueOnDropDown(landingPageObj.getElement(dropDownName), value);
});
