const options = {
  seleniumAddress: {
    alias: 's',
    description: 'Selenium server address',
    requiresArg: true,
    required: false,
  },
  capabilities: {
    alias: 'c',
    description: 'Selenium driver capabilities',
    requiresArg: true,
    required: false,
  },
  browserName: {
    alias: 'b',
    description: 'Browser name to execute the test',
    requiresArg: true,
    required: false,
  },
  defaultWaitTimeout: {
    alias: 'd',
    description: 'Helper functions and pre-defined steps default wait timeout',
    requiresArg: true,
    required: false,
  },
  pageObjects: {
    alias: 'po',
    description: 'Comma separated path to mapped objects file(s)',
    requiresArg: true,
    required: false,
  },
  featureFiles: {
    alias: 'f',
    description: 'Comma separated path to feature file(s)',
    requiresArg: true,
    required: false,
  },
  tags: {
    alias: 't',
    description: 'BDD tags',
    requiresArg: true,
    required: false,
  },
  params: {
    alias: 'p',
    description: 'Test global params',
    requiresArg: true,
    required: false,
  },
  format: {
    alias: 'fo',
    description: 'BDD report output format',
    requiresArg: true,
    required: false,
  },
  stepDefinitions: {
    alias: 'd',
    description: 'Comma separated path to cucumber step definitions file(s)',
    requiresArg: true,
    required: false,
  },
  errorScreenshotsPath: {
    alias: 'e',
    description: 'Path to save error screenshots files',
    requiresArg: true,
    required: false,
  },
  baseAppUrl: {
    alias: 'bu',
    description: 'If url is set then the first test step will be open this URL',
    requiresArg: true,
    required: false,
  },
};
class ArgvParser {
  constructor(argv) {
    this.argv = argv;
  }

  getRunnerFile() {
    return this.argv._[0];
  }
}
module.exports = {
  options,
  ArgvParser,
};
