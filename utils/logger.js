const logger = require('log4js').getLogger();
let chalk = require('chalk');

chalk = new chalk.constructor({ level: 1 });
logger.level = 'debug';
class Logger {
  static trace(message) {
    logger.trace(chalk.blue(message));
  }

  static debug(message) {
    logger.debug(chalk.cyan(message));
  }

  static info(message) {
    logger.info(chalk.green(message));
  }

  static warn(message) {
    logger.warn(chalk.yellow(message));
  }

  static error(message) {
    logger.error(chalk.red.bold(message));
  }

  static fatal(message) {
    logger.fatal(chalk.magenta(message));
  }
}

module.exports = Logger;
