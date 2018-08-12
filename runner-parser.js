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
       this.runnerFileObj.pageObjects.forEach(mapPath => {
           mapPath = path.resolve(mapPath);
           let stats = fs.statSync(mapPath);
           if(stats.isFile()) {
               if(fs.existsSync(mapPath)) {
                   pageObjectsObj.push(require(path.resolve(mapPath)).default)
               } else {
                   throw new Error(mapPath + ' is not a valid file');
               }
           } else if (stats.isDirectory()) {
               fs.readdirSync(mapPath).forEach(file => {
                   pageObjectsObj.push(require(path.resolve(mapPath, file)).default)
               })
           }
       });
       return pageObjectsObj;
    }

    async getCucumberArgs() {
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

        await this.runnerFileObj.stepDefinitions.forEach(stepsPath => {
            stepsPath = path.resolve(process.cwd(), stepsPath);
            console.log(stepsPath);
             argv.push('--require', stepsPath);
        });

        argv.push('--require', path.resolve(__dirname, 'features/support/'));


        argv.push('--format', 'progress');

        const cucumberCli = new Cli({
            argv: argv,
            cwd : path.resolve(__dirname, 'node_modules/cucumber/bin/cucumber-js'),
            stdout: process.stdout
        });
        console.log(cucumberCli.argv);
        await cucumberCli.run();
    }
}