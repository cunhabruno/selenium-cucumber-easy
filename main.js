import commander from 'commander';
import path from 'path';
import RunnerParser from "./runner-parser";
import PageObjectsParse from "./page-objects-parse";
export let runnerFilePath;
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

global.browser = runnerParser.generateSeleniumDriver();

const mappedObjects = runnerParser.getPageObjects();

global.pageObjects = new PageObjectsParse(mappedObjects);

runnerParser.getCucumberArgs();

//driver.get('http://ulbra.br')

//driver.findElement(pageObjects.get2LevelsLocator('LANDINGPAGE', 'UNIDADEDROPDOWN')).click();