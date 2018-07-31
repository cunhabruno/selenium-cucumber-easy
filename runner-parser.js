import path from 'path';
import fs from 'fs';
import webdriver from 'selenium-webdriver';
import {Cli} from 'cucumber';
export default class RunnerParser {
    constructor(runnerFilePath) {
        this.runnerFilePath = runnerFilePath;
        this.runnerFileObj = this.setRunnerFileArgs().default;
    }

    setRunnerFileArgs() {
        if(fs.existsSync(this.runnerFilePath)) {
            this.runnerFileObj = require(this.runnerFilePath);

            return(this.runnerFileObj);
        } else {
            throw new Error(this.runnerFilePath + ' is not a valid file');
        }
    }

    generateSeleniumDriver() {
        if(this.runnerFileObj !== null) {
            let capabilities = {
              'browserName' : this.runnerFileObj.browserName
            };
            return new webdriver.Builder().usingServer(this.runnerFileObj.seleniumAddress).withCapabilities(capabilities).build();
        }
    }

    getPageObjects() {
       let pageObjectsObj = [];
       pageObjectsObj = this.runnerFileObj.pageObjects.map(mapPath => {
           mapPath = path.resolve(mapPath);
           if(fs.existsSync(mapPath)) {
            return require(path.resolve(mapPath)).default;
           } else {
               throw new Error(mapPath + ' is not a valid file');
           }
       });
       return pageObjectsObj;
    }

    getCucumberArgs() {
        let argv = [
            'node',
            'cucumber-js'
        ];

        this.runnerFileObj.featureFiles.forEach(featurePath => {
            featurePath = path.resolve(featurePath);
            if(fs.existsSync(featurePath)) {
             argv.push(featurePath);
            } else {
                throw new Error(featurePath + ' is not a valid file');
            }
        });

        argv.push('--require', path.resolve('.', 'features/step-definitions/'));

        this.runnerFileObj.stepDefinitions.forEach(stepsPath => {
            stepsPath = path.resolve(stepsPath);
            if(fs.existsSync(stepsPath)) {
             argv.push('--require', stepsPath);
            } else {
                throw new Error(stepsPath + ' is not a valid file');
            }
        });

        const cucumberCli = new Cli({
            argv: argv,
            cwd : path.resolve('node_modules/cucumber/bin/cucumber-js'),
            stdout: process.stdout
        });
        cucumberCli.run().then(res => {});
    }
}