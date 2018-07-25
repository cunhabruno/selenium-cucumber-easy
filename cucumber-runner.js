import {Cli} from 'cucumber';
import path from 'path'

import webdriver from 'selenium-webdriver';

global.browser = new webdriver.Builder().usingServer('http://192.168.25.18:4444/wd/hub').withCapabilities({'browserName': 'chrome'}).build();

const cucumberCli = new Cli({
    argv: ['node', 'cucumber-js',  path.resolve('features/example.feature'), '--require', path.resolve('.', 'features/step-definitions/')],
    cwd : path.resolve('node_modules/cucumber/bin/cucumber-js'),
    stdout: process.stdout
});

console.log(cucumberCli.argv);
cucumberCli.run().then(res => {console.log('-----' + res);});

//browser.quit();