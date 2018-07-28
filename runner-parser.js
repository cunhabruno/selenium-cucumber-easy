import path from 'path';
import fs from 'fs';
import webdriver from 'selenium-webdriver';
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

    generateSeleniumDriver(){
        if(this.runnerFileObj !== null) {
            let capabilities = {
              'browserName' : this.runnerFileObj.browserName
            };
            return new webdriver.Builder().usingServer(this.runnerFileObj.seleniumAddress).withCapabilities(capabilities).build();
        }
    }

    getPageObjects(){
       let pageObjectsObj = [];
       pageObjectsObj = this.runnerFileObj.pageObjects.map(mapPath => {
           mapPath = path.resolve(mapPath);
           if(fs.existsSync(mapPath)) {
            return require(path.resolve(mapPath)).default;
           } else {
               throw new Error(mapPath + ' is not a valid file');
           }
       });
       console.log(pageObjectsObj[1]['HOMEPAGE']['ULBRALOGO'])
       return pageObjectsObj;
    }
}