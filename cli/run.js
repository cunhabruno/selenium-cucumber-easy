const yargs = require('yargs');
const { options } = require('./test-options');
const ConfigOptions = require('../config-options');
const TestRunner = require('../test-runner');
const { version } = require('../package');
const PageObjectsParse = require('../page-objects-parse');

const { argv } = yargs
  .usage('\n\nUsage: $0 <configFilePath> [options]')
  .help('help').alias('help', 'h')
  .version('version', version)
  .alias('version', 'v')
  .options(options);

if (process.argv.length <= 2) {
  yargs.showHelp();
  process.exit(1);
}

const configOptions = new ConfigOptions(argv);
const testRunner = new TestRunner(configOptions.options);

global.DEFAULT_WAIT_TIME_OUT = testRunner.getDefaultTimeOut();
global.driver = testRunner.generateSeleniumDriver();
global.params = testRunner.getParams();

const pageObjectsParser = new PageObjectsParse(testRunner.getPageObjects());

testRunner.runCucumberTests();

module.exports = { pageObjectsParser, testRunner };
