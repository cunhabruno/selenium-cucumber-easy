const commander = require('commander');
const path = require('path');
const RunnerParser = require('./runner-parser');
const PageObjectsParse = require('./page-objects-parse');
const { version } = require('./package');

let runnerFilePath;
commander
    .version(version)
    .arguments('<runnerFilePath>')
    .action((filePath) => {
        runnerFilePath = filePath;
    });
commander.parse(process.argv);

if(typeof runnerFilePath === 'undefined') {
    commander.outputHelp();
    process.exit(1);
}

const runnerParser = new RunnerParser(path.resolve(runnerFilePath));

global.DEFAULT_WAIT_TIME_OUT = runnerParser.getDefaultTimeOut();
global.driver = runnerParser.generateSeleniumDriver();
global.params = runnerParser.getParams();

const pageObjectsParser = new PageObjectsParse(runnerParser.getPageObjects());

runnerParser.runCucumberTests();

module.exports = { pageObjectsParser };