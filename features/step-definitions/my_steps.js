const {defineSupportCode} = require('cucumber');

defineSupportCode(({And, But, Given, Then, When}) => {
    Given(/^I go to the following page "([^"]*)"$/, async (string) => {
       await browser.get(string);
    });
});


/*const {Given, When, Then} = require('cucumber');

Given(/^I go to the following page "([^"]*)"$/, function (string) {
    // Write code here that turns the phrase above into concrete actions
    console.log('oi');
});*/

