const Helpers = require('./automation-scripts/helpers');

class Locator {
  constructor(byObject) {
    this.byObject = byObject;
  }

  click(timeout) {
    return Helpers.clickOnElement(this.byObject, timeout);
  }

  doubleClick(timeout) {
    return Helpers.doubleClickOnElement(this.byObject, timeout);
  }

  write(text, timeout) {
    return Helpers.writeText(this.byObject, text, timeout);
  }

  append(text, timeout) {
    return Helpers.appendText(this.byObject, text, timeout);
  }

  clear(timeout) {
    return Helpers.clearInputElement(this.byObject, timeout);
  }
}
const locator = byObj => new Locator(byObj);

module.exports = locator;
