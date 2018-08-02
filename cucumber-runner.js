import {Cli} from 'cucumber';
import path from 'path'

import webdriver from 'selenium-webdriver';

global.driver = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities({'browserName': 'chrome'}).build();
driver.get('http://www.ulbra.br');
const pageObjFiles = ['page-objects/landing-page.js', 'page-objects/home-page.js'];

const generateMapper = async (pageObjFiles) => {
    let fileArr = [];
    pageObjFiles.forEach((file) => {
        fileArr.push(path.resolve(file));
    });
    console.log(fileArr);

    let hashArr = [];
    fileArr.forEach(async file => {
        hashArr.push(require(file).default);
    });
    console.log(hashArr[1]['HOMEPAGE']['test']);
    driver.findElement(hashArr[1]['HOMEPAGE']['test']).click();
};

generateMapper(pageObjFiles);

/*const cucumberCli = new Cli({
    argv: ['node', 'cucumber-js',  path.resolve('features/example.feature'), '--require', path.resolve('.', 'features/step-definitions/')],
    cwd : path.resolve('node_modules/cucumber/bin/cucumber-js'),
    stdout: process.stdout
});

console.log(cucumberCli.argv);
cucumberCli.run().then(res => {console.log('-----' + res);});*/

driver.quit();