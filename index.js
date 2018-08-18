const Helpers = require('./automation-scripts/helpers');
require('./main');
const {pageObjectsParser} = require('./main');
const {Given, Then, When} = require('cucumber');
const {By} = require ('selenium-webdriver');

module.exports = { Helpers, Given, Then, When, pageObjectsParser, By};
