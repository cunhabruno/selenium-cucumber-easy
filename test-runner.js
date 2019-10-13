const path = require('path');
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const { Cli } = require('cucumber');
const isUrl = require('is-url');
const glob = require('glob');
const logger = require('./utils/logger');

class TestRunner {
  constructor(options) {
    this.options = options;
  }

  generateSeleniumDriver() {
    let capabilities;
    if (this.options.capabilities === '') {
      capabilities = {
        browserName: this.getBrowser(),
      };
    } else {
      ({ capabilities } = this.options);
    }
    return new webdriver.Builder()
      .usingServer(this.options.seleniumAddress)
      .withCapabilities(capabilities).build();
  }

  getDefaultTimeOut() {
    return this.options.defaultWaitTimeout !== ''
      ? this.options.defaultWaitTimeout
      : 10000;
  }

  getBrowser() {
    if (this.options.browserName !== '') {
      return 'chrome';
    }
    const browserName = this.options.browserName.toLowerCase().replace(/[ _]/g, '');
    if (browserName.match(/ie|internetexplorer/g)) {
      return 'internet explorer';
    } if (browserName.match(/microsoftedge|edge/g)) {
      return 'MicrosoftEdge';
    } if (browserName.match(/chrome|firefox|safari/g)) {
      return browserName;
    }
    return 'chrome';
  }

  getErrorScreenshotsPath() {
    return this.options.errorScreenshotsPath;
  }

  getParams() {
    return this.options.params;
  }

  async executeBeforeStart() {
    return typeof this.options.beforeStart === 'function'
      ? this.options.beforeStart()
      : null;
  }

  getPageObjects() {
    const pageObjectsObj = [];
    const pageObjectsFiles = [];
    this.options.pageObjects.forEach((mapPath) => {
      mapPath = path.resolve(mapPath);
      const stats = fs.statSync(mapPath);
      if (stats.isFile()) {
        if (fs.existsSync(mapPath)) {
          pageObjectsFiles.push(mapPath);
        } else {
          throw new Error(`${mapPath} is not a valid file`);
        }
      } else if (stats.isDirectory()) {
        const filesArray = glob.sync(`${mapPath}/**/*.js`);
        filesArray.forEach((file) => {
          file = path.resolve(file);
          pageObjectsFiles.push(file);
        });
      }
    });
    const pageObjectsFilesFiltered = pageObjectsFiles.filter((elem, pos) => pageObjectsFiles.indexOf(elem) === pos);
    let obj;
    pageObjectsFilesFiltered.forEach((file) => {
      obj = require(path.resolve(file)); // eslint-disable-line global-require, import/no-dynamic-require
      if (typeof obj.default !== 'undefined') {
        obj = obj.default;
      }
      pageObjectsObj.push(obj);
    });
    return pageObjectsObj;
  }

  async getCucumberArgs() {
    const argv = [
      'node',
      'cucumber-js',
    ];

    // Add tags to run if set
    if (typeof this.options.tags !== 'undefined' && this.options.tags.length > 0) {
      argv.push('--tags', this.options.tags);
    }

    // Add feature files to run
    this.options.featureFiles.forEach((featurePath) => {
      featurePath = path.resolve(featurePath);
      if (fs.existsSync(featurePath)) {
        argv.push(featurePath);
      } else {
        throw new Error(`${featurePath} is not a valid file`);
      }
    });

    // Add custom step definitions if set
    await this.options.stepDefinitions.forEach((stepsPath) => {
      stepsPath = path.resolve(process.cwd(), stepsPath);
      argv.push('--require', stepsPath);
    });

    // Add cucumber pre set steps
    argv.push('--require', path.resolve(__dirname, 'features/support/'));

    // Add report format if set
    if (this.options.format !== '') {
      argv.push('--format', this.options.format);
    } else {
      argv.push('--format', 'progress');
    }
    argv.push('--format-options', '{"colorsEnabled": true}');

    return argv;
  }

  async runCucumberTests() {
    const cucumberCli = new Cli({
      argv: await this.getCucumberArgs(),
      cwd: path.resolve(__dirname, 'node_modules/cucumber/bin/cucumber-js'),
      stdout: process.stdout,
    });

    logger.info('Starting test...');

    if (isUrl(this.options.baseAppUrl)) {
      await driver.get(this.options.baseAppUrl);
      await driver.manage().window().maximize();
    }
    await this.executeBeforeStart();
    await cucumberCli.run().then(() => {
      driver.close();
    }, (reason) => {
      driver.close();
      logger.error(reason.toString());
    });
  }
}
module.exports = TestRunner;
