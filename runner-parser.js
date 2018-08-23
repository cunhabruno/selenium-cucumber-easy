const path = require('path');
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const {Cli} = require('cucumber');
class RunnerParser {
    constructor(runnerFilePath) {
        this.runnerFilePath = runnerFilePath;
        this.runnerFileObj = this.setRunnerFileArgs();
    }

    setRunnerFileArgs() {
        if(fs.existsSync(this.runnerFilePath)) {
            this.runnerFileObj = require(this.runnerFilePath);

            return typeof this.runnerFileObj.default === 'undefined' ?
                this.runnerFileObj :
                this.runnerFileObj.default;
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

    getDefaultTimeOut() {
        return typeof this.runnerFileObj.defaultWaitTimeout !== 'undefined'?
            this.runnerFileObj.defaultWaitTimeout :
            10000;
    }

    getBaseAppUrl() {
        return typeof this.runnerFileObj.baseAppUrl !== 'undefined'?
            this.runnerFileObj.baseAppUrl :
            null;
    }

    getPageObjects() {
       let pageObjectsObj = [];
       this.runnerFileObj.pageObjects.forEach(mapPath => {
           mapPath = path.resolve(mapPath);
           let stats = fs.statSync(mapPath);
           let obj;
           if(stats.isFile()) {
               if(fs.existsSync(mapPath)) {
                   obj = require(path.resolve(mapPath));
                   if(typeof obj.default !== 'undefined') {
                       obj = obj.default;
                   }
                   pageObjectsObj.push(obj)
               } else {
                   throw new Error(mapPath + ' is not a valid file');
               }
           } else if (stats.isDirectory()) {
               fs.readdirSync(mapPath).forEach(file => {
                   obj = require(path.resolve(mapPath, file));
                   if(typeof obj.default !== 'undefined') {
                       obj = obj.default;
                   }
                   pageObjectsObj.push(obj)
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

        //Add tags to run if set
        if(typeof this.runnerFileObj.tags !== 'undefined') {
            argv.push('--tags', this.runnerFileObj.tags);
        }

        //Add feature files to run
        this.runnerFileObj.featureFiles.forEach(featurePath => {
            featurePath = path.resolve(featurePath);
            if(fs.existsSync(featurePath)) {
             argv.push(featurePath);
            } else {
                throw new Error(featurePath + ' is not a valid file');
            }
        });

        //Add custom step definitions if set
        await this.runnerFileObj.stepDefinitions.forEach(stepsPath => {
            stepsPath = path.resolve(process.cwd(), stepsPath);
             argv.push('--require', stepsPath);
        });

        //Add cucumber pre set steps
        argv.push('--require', path.resolve(__dirname, 'features/support/'));

        //Add report format if set
        if(typeof this.runnerFileObj.format !== 'undefined') {
            argv.push('--format', this.runnerFileObj.format);
        } else {
            argv.push('--format', 'progress');
        }

        return argv;
    }

    async runCucumberTests() {
        const cucumberCli = new Cli({
            argv: await this.getCucumberArgs(),
            cwd: path.resolve(__dirname, 'node_modules/cucumber/bin/cucumber-js'),
            stdout: process.stdout
        });

        console.log(cucumberCli.argv);

        const baseUrl = this.getBaseAppUrl();
        if(baseUrl !== null) {
            await driver.get(baseUrl);
            await driver.manage().window().maximize();
        }
        await cucumberCli.run().then(result => {
            if(result.success) {
                driver.close();
            }
        });
    }
}
module.exports = RunnerParser;