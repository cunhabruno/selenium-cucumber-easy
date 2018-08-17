const commander = require('commander');
const path = require('path');
const RunnerParser = require("./runner-parser");
const PageObjectsParse = require("./page-objects-parse");

let runnerFilePath;
commander
    .version('0.0.1')
    .arguments('<runnerFilePath>')
    .action((filePath) => {
        runnerFilePath = filePath;
    });
commander.parse(process.argv);

if(typeof runnerFilePath === 'undefined') {
    console.error('No command given');
    process.exit(1);
}

const runnerParser = new RunnerParser(path.resolve(runnerFilePath));

global.driver = runnerParser.generateSeleniumDriver();

exports.pageObjectsParser = new PageObjectsParse(runnerParser.getPageObjects());

runnerParser.runCucumberTests();