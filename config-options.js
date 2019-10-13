const path = require('path');
const fs = require('fs');
const { ArgvParser } = require('./cli/test-options');

class ConfigOptions {
  constructor(argv) {
    this.configFilePath = new ArgvParser(argv).getRunnerFile();
    this.argv = argv;
    this.configFileObj = {};

    this.options = {
      seleniumAddress: '',
      capabilities: '',
      browserName: '',
      defaultWaitTimeout: '',
      pageObjects: [],
      featureFiles: [],
      tags: [],
      params: '',
      format: '',
      stepDefinitions: [],
      errorScreenshotsPath: '',
      baseAppUrl: '',
      beforeStart: '',
    };

    this.setConfigFileObject();
    // Firstly set options based on config file
    this.setOptions(this.configFileObj);
    // Then set option based on argv replacing the ones in config file
    this.setOptions(this.argv);
  }

  setConfigFileObject() {
    if (typeof this.configFilePath !== 'undefined') {
      if (fs.existsSync(this.configFilePath)) {
        this.configFileObj = require(path.resolve(this.configFilePath)); // eslint-disable-line global-require, import/no-dynamic-require

        this.configFileObj = typeof this.configFileObj.default === 'undefined'
          ? this.configFileObj
          : this.configFileObj.default;
      } else {
        throw new Error(`${this.configFilePath} is not a valid file`);
      }
    }
  }

  setOptions(options) {
    for (const [paramKey, paramValue] of Object.entries(options)) {
      for (const [key, value] of Object.entries(this.options)) {
        if (paramKey === key) {
          if (typeof paramValue !== 'undefined') {
            if (typeof paramValue === 'string' && Array.isArray(value)) {
              this.options[paramKey] = paramValue.split(',');
            } else {
              this.options[paramKey] = paramValue;
            }
          }
        }
      }
    }
  }
}

module.exports = ConfigOptions;
