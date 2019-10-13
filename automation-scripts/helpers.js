const { By, Key } = require('selenium-webdriver');
const assert = require('assert');
const Logger = require('../utils/logger');

class Helpers {
  /** *********Action Functions************** */
  /**
     * Click on a dropdown locator and then click in a value inside the dropdown
     * dangerous to use, since the click on the value is made searching for any
     * element that has the selected text on screen
     *
     * _Example:_ Selecting the option pizza on a dropdown
     *
     *     async function example() {
     *       const preferredFoodDropdown = By.id('preferred-food-dropdown');
     *       await selectValueOnDropDown(preferredFoodDropdown, 'pizza', 2000);
     *     }
     *
     * @param {object=} dropDownLocator By locator
     * @param {string=} valueToSelect The value present on dropdown to select
     * @param {number=} timeOut How long to wait the element to be visible before doing the dropdown selection
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return {!Promise<void>} A promise that will be resolved when the click
     *     command has completed.
     */
  static async selectValueOnDropDown(dropDownLocator, valueToSelect, timeOut = DEFAULT_WAIT_TIME_OUT) {
    valueToSelect = typeof valueToSelect === 'string'
      ? By.xpath(`//*[.="${valueToSelect}"]`)
      : valueToSelect;
    await this.waitVisibilityOfElement(valueToSelect, timeOut);
    await driver.findElement(dropDownLocator).click();
    return driver.findElement(valueToSelect).click();
  }

  /**
     * Click on an element on the screen
     *
     * _Example:_ Click on button OrderFood
     *
     *     async function example() {
     *       const orderFoodButton = By.id('order-food');
     *       await clickOnElement(orderFoodButton);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {number=} timeOut How long to wait the element to be visible before doing the click action
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
  static async clickOnElement(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitElementToBeClickable(elementLocator, timeOut);
    await driver.findElement(elementLocator).click();
  }

  /**
     * Double Click on an element on the screen
     *
     * _Example:_ Click on button OrderFood
     *
     *     async function example() {
     *       const orderFoodButton = By.id('order-food');
     *       await doubleClickOnElement(orderFoodButton);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {number=} timeOut How long to wait the element to be visible before doing the double click action
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
  static async doubleClickOnElement(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitElementToBeClickable(elementLocator, timeOut);
    const el = await driver.findElement(elementLocator);
    const actions = driver.actions({ bridge: true });
    await actions.doubleClick().perform();
  }

    /**
     * Click on an element on the screen if it is displayed
     *
     * _Example:_ Click on button BonusWon
     *
     *     async function example() {
     *       const BonusWonButton = By.id('bonus-won');
     *       await clickOnElementIfDisplayed(BonusWonButton);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {number=} timeOut How long to wait the element to be visible before doing the click action
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
    static async clickOnElementIfDisplayed(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
      let displayed = true;
      try {
        await this.waitElementToBeClickable(elementLocator, timeOut);
      } catch (error) {
        displayed = false;
      }
      if (displayed) {
        await driver.findElement(elementLocator).click();
      }
    }

  /**
     * Clear the existing content in an input field
     *
     * _Example:_ Clear comments input
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await clearInputElement(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {number=} timeOut How long to wait the input element to be visible before clearing its content
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
  static async clearInputElement(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    await driver.findElement(elementLocator).clear();
  }

  /**
     * Clear existing text and write a text in an input field
     *
     * _Example:_ Write a text on comments input
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await writeText(commentsInput, 'I love pizza');
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} textToAdd The text to add in the input element
     * @param {number=} timeOut How long to wait the input element to be visible before writing its text
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
  static async writeText(elementLocator, textToAdd, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    await driver.findElement(elementLocator).clear();
    await driver.findElement(elementLocator).sendKeys(textToAdd);
  }

  /**
     * Append a text in an input field
     *
     * _Example:_ Append a text on comments input
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await appendText(commentsInput, ' but sushi is better');
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} textToAdd The text to add in the input element
     * @param {number=} timeOut How long to wait the input element to be visible before writing its text
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
  static async appendText(elementLocator, textToAdd, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    await driver.findElement(elementLocator).sendKeys(textToAdd);
  }

  /**
     * Place the mouse hover an element on screen
     *
     * _Example:_ Mouse hover info icon
     *
     *     async function example() {
     *       const infoIcon = By.id('info-icon');
     *       await mouseHover(elementLocator);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {number=} timeOut How long to wait the input element to be visible mouse hover
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return TODO
     */
  static async mouseHover(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    const el = await driver.findElement(elementLocator);
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: el }).perform();
  }

  /**
     * Simulate a key press see available keys: https://www.w3.org/TR/webdriver/#keyboard-actions
     *
     * _Example:_ Pres the key enter
     *
     *     async function example() {
     *       await pressKey('Enter');
     *     }
     *
     * @param {string=} keyToPress string based on https://www.w3.org/TR/webdriver/#keyboard-actions
     * @return TODO
     * @throws error if an invalid key is set in parameter
     */
  static async pressKey(keyToPress) {
    keyToPress = keyToPress.toUpperCase().replace(/ /g, '');
    if (typeof Key[keyToPress] !== 'undefined') {
      await driver.actions({ bridge: true }).sendKeys(Key[keyToPress]).perform();
    } else {
      throw new Error('Invalid key to press');
    }
  }

  /** *********Verifier Functions************** */

  /**
     * Check if an element is present on the DOM
     *
     * _Example:_ check if comments input is present
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await checkElementPresent(commentsInput, true);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnExists whether you want to check if the element is present or not present
     * @param {number=} timeOut How long to wait until the element is present
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return FIXME blnExists var is useless here need to fix
     */
  static async checkElementPresent(elementLocator, blnExists, timeOut = DEFAULT_WAIT_TIME_OUT) {
    return blnExists
      ? this.waitPresenceOfElement(elementLocator, timeOut)
      : this.waitPresenceOfElement(elementLocator, timeOut);
  }

  /**
     * Check if an element is visible in the screen
     *
     * _Example:_ check if comments input is visible
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await checkElementDisplayed(commentsInput, true);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnExists whether you want to check if the element is visible or invisible
     * @param {number=} timeOut How long to wait until the element is visible or invisible
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if the expected condition meets otherwise false
     */
  static async checkElementDisplayed(elementLocator, blnExists, timeOut = DEFAULT_WAIT_TIME_OUT) {
    return blnExists
      ? this.waitVisibilityOfElement(elementLocator, timeOut)
      : this.waitInvisibilityOfElement(elementLocator, timeOut);
  }

  /**
     * Determines if the referenced element is selected or not.
     * This operation only makes sense on input elements (Checkbox and Radio Button) or on option elements.
     *
     * _Example:_ check if Extra Bacon topping is selected
     *
     *     async function example() {
     *       const toppingInputCheckboxOption = By.xpath('//input[@text()="Extra Bacon"]');
     *       await checkElementSelected(toppingInputCheckboxOption, true);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnSelected whether you want to check if the element is selected or unselected
     * @param {number=} timeOut How long to wait until the element is present before doing the validation
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if the expected condition meets otherwise false
     */
  static async checkElementSelected(elementLocator, blnSelected, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitPresenceOfElement(elementLocator, timeOut);
    const selectedResult = await driver.findElement(elementLocator).isSelected();
    assert.equal(blnSelected, selectedResult, `Element should be ${blnSelected ? 'selected' : 'unselected'}`);
    return blnSelected === selectedResult;
  }

  /**
     * Tests whether an element is enabled, as dictated by the disabled attribute.
     * based on Selenium documentation: This will generally return true for everything
     * but disabled input elements.
     *
     * _Example:_ check if order food button is enabled
     *
     *      async function example() {
     *       const orderFoodButton = By.id('order-food');
     *       await checkElementEnabled(orderFoodButton, true);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnEnabled whether you want to check if the element is enabled or disabled
     * @param {number=} timeOut How long to wait until the element is visible before doing the validation
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if the expected condition meets otherwise false
     */
  static async checkElementEnabled(elementLocator, blnEnabled, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    const enabledResult = await driver.findElement(elementLocator).isEnabled();
    assert.equal(blnEnabled, enabledResult, `Element should be ${blnEnabled ? 'enabled' : 'disabled'}`);
    return blnEnabled === enabledResult;
  }

  /**
     * Tests if an specific HTML attribute has an specific value
     *
     * _Example:_ check if class attribute from a button is equals to "btn-primary ng-enabled"
     *
     *      async function example() {
     *       const orderFoodButton = By.id('order-food');
     *       await checkAttributeValue(orderFoodButton, 'class', 'btn-primary ng-enabled');
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} attribute the name of the attribute to check its content
     * @param {string=} attributeValue the expected content in the selected attribute
     * @param {number=} timeOut How long to wait until the element is visible before doing the validation
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if attribute has the expected value based on attributeValue
     */
  static async checkAttributeValue(elementLocator, attribute, attributeValue, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    const attributeResult = await driver.findElement(elementLocator).getAttribute(attribute);

    assert.equal(attributeValue, attributeResult, 'The Attribute is NOT equals');

    return attributeValue === attributeResult;
  }

  /**
     * Check if the inner text of an element is equals or not to expected text
     *
     * _Example:_ check pizza discount label text
     *
     *     async function example() {
     *       const discountLabel = By.id('discount-label');
     *       await checkElementText(discountLabel, true, 'No discounts available for you!');
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnMeets whether you want to check if the text is equals or not equals
     * @param {string=} textToValidate The text to validate
     * @param {number=} timeOut How long to wait the element to be visible before doing the validation
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if the expected condition meets otherwise false
     */
  static async checkElementText(elementLocator, blnMeets, textToValidate, timeOut = DEFAULT_WAIT_TIME_OUT) {
    if (typeof elementLocator === 'function') {
      elementLocator = elementLocator(textToValidate);
    }
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    const textFound = await driver.findElement(elementLocator).getText();
    blnMeets
      ? assert.equal(textFound, textToValidate, 'Element text should be equals')
      : assert.notEqual(textFound, textToValidate, 'Element text should NOT be equals');
    return (textFound === textToValidate) === blnMeets;
  }

  /**
     * Check if the inner text of an element contains or not an expected text
     *
     * _Example:_ check pizza discount label text contains
     *
     *     async function example() {
     *       const discountLabel = By.id('discount-label');
     *       await checkElementTextContains(discountLabel, true, 'discounts available');
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnMeets whether you want to check if the text contains or not the expected text
     * @param {string=} textToValidate The text to validate
     * @param {number=} timeOut How long to wait the element to be visible before doing the validation
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if the expected condition meets otherwise false
     */
  static async checkElementTextContains(elementLocator, blnMeets, textToValidate, timeOut = DEFAULT_WAIT_TIME_OUT) {
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    const textFound = await driver.findElement(elementLocator).getText();
    const containsResult = textFound.includes(textToValidate);
    const textFoundMsg = `Text found was: ${textFound}`;
    blnMeets
      ? assert(containsResult, `Element text should contains "${textToValidate}" ${textFoundMsg}`)
      : assert(!containsResult, `Element text should NOT contains "${textToValidate}" ${textFoundMsg}`);
    return containsResult === blnMeets;
  }

  /**
     * Check if the inner text of an element is equals or not to expected text
     * case insensitive and ignoring blank spaces
     *
     * _Example:_ check pizza discount label text
     *
     *     async function example() {
     *       const discountLabel = By.id('discount-label');
     *       await checkElementTextIgnoreSpaceCase(discountLabel, true, 'No DiscountsAvailableFor you!');
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnMeets whether you want to check if the text is equals or not equals
     * @param {string=} textToValidate The text to validate
     * @param {number=} timeOut How long to wait the element to be visible before doing the validation
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return true if the expected condition meets otherwise false
     */
  static async checkElementTextIgnoreSpaceCase(elementLocator, blnMeets, textToValidate, timeOut = DEFAULT_WAIT_TIME_OUT) {
    textToValidate = textToValidate.toUpperCase().replace(/ /g, '');
    if (typeof elementLocator === 'function') {
      elementLocator = elementLocator(textToValidate);
    }
    await this.waitVisibilityOfElement(elementLocator, timeOut);
    let textFound = await driver.findElement(elementLocator).getText();
    textFound = textFound.toUpperCase().replace(/ /g, '');
    blnMeets
      ? assert.equal(textFound, textToValidate, 'Element text should be equals')
      : assert.notEqual(textFound, textToValidate, 'Element text should NOT be equals');
    return (textFound === textToValidate) === blnMeets;
  }

  /**
     * Check if an element is present on the DOM
     *
     * _Example:_ check if comments input is present
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       const isPresentResult = await isElementPresent(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @return {!Promise<boolean>} A promise that will resolve to true or false
     */
  static isElementPresent(elementLocator) {
    return driver.findElements(elementLocator).then(elms => elms.length > 0, () => false);
  }

  /**
     * Check if an element is displayed on the screen
     * If it is displayed it will return true
     * otherwise the error message saying why it was not present
     *
     * _Example:_ check if comments input is present
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       const isDisplayedResult = await isElementDisplayed(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @return {!Promise<boolean | string>} A promise that will resolve to true
     * or an string with an error message
     */
  static async isElementDisplayed(elementLocator) {
    let present = false; let
      displayed = false;
    try {
      const elementsArray = await driver.findElements(elementLocator);
      if (elementsArray.length > 0) {
        present = true;
        displayed = await driver.findElement(elementLocator).isDisplayed();
      }
    } catch (e) {
      Logger.error(e);
    }
    if (!present) {
      return `The element with the locator ${elementLocator} is NOT PRESENT on the DOM`;
    } if (!displayed) {
      return `The element with the locator ${elementLocator} is NOT DISPLAYED on the screen`;
    }
    return true;
  }

  /**
     * Check if an element is enabled
     * If it is enabled it will return true
     * otherwise the error message saying why it was not enabled
     *
     * _Example:_ check if comments input is enabled
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       const isEnabledResult = await isElementEnabled(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @return {!Promise<boolean | string>} A promise that will resolve to true
     * or an string with an error message
     */
  static async isElementEnabled(elementLocator) {
    let displayed = false; let
      enabled = false;
    try {
      displayed = await this.isElementDisplayed(elementLocator);
      if (displayed === true) {
        enabled = await driver.findElement(elementLocator).isEnabled();
      }
    } catch (e) {
      Logger.error(e);
    }
    if (displayed !== true) {
      return displayed;
    } if (enabled !== true) {
      return `The element with the locator ${elementLocator} is NOT ENABLED on the screen`;
    }
    return true;
  }

  /** *********Wait Functions************** */

  /**
     * Wait for an element to be present on the dom
     *
     * _Example:_ wait comments input to be present
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await waitPresenceOfElement(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {int=} timeOut Maximum timeout to wait until the conditions meets
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return {!Promise<boolean>} A promise that will resolve to true or false
     */
  static async waitPresenceOfElement(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    return driver.wait(async () => this.isElementPresent(elementLocator), timeOut, `The Element with the locator ${elementLocator.toString()} is not present`);
  }

  /**
     * Wait for an element to be visible on the screen
     *
     * _Example:_ wait comments input to be visible
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await waitVisibilityOfElement(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {int=} timeOut Maximum timeout to wait until the conditions meets
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return {!Promise<boolean>} A promise that will resolve to true or false
     */
  static async waitVisibilityOfElement(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    const condition = async () => this.isElementDisplayed(elementLocator);
    return driver.wait(async () => await condition() === true, timeOut, `The Element with the locator ${elementLocator.toString()} is not visible\n${await condition()}`);
  }

  /**
     * Wait for an element to be invisible on the screen
     *
     * _Example:_ wait comments input to be invisible
     *
     *     async function example() {
     *       const commentsInput = By.id('comments');
     *       await waitInvisibilityOfElement(commentsInput);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {int=} timeOut Maximum timeout to wait until the conditions meets
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return {!Promise<boolean>} A promise that will resolve to true or false
     */
  static async waitInvisibilityOfElement(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    return driver.wait(async () => await this.isElementDisplayed(elementLocator) !== true, timeOut, `The Element with the locator ${elementLocator.toString()} is visible`);
  }

  /**
     * Wait for an element to be clickable
     *
     * _Example:_ wait order food button to be clickable
     *
     *     async function example() {
     *       const orderFoodButton = By.id('order-food');
     *       await waitElementToBeClickable(orderFoodButton);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {int=} timeOut Maximum timeout to wait until the conditions meets
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return {!Promise<boolean>} A promise that will resolve to true or false
     */
  static async waitElementToBeClickable(elementLocator, timeOut = DEFAULT_WAIT_TIME_OUT) {
    const condition = async () => {
      let result = false;
      try {
        result = await Helpers.isElementEnabled(elementLocator);
      } catch (error) {
        result = error.toString();
      }
      return result;
    };
    return driver.wait(async () => await condition() === true, timeOut, `The Element with the locator ${elementLocator.toString()} is not clickable\n${await condition()}`);
  }

  /**
     * Wait for an element to be enabled or disabled
     *
     * _Example:_ wait order food button to be enabled
     *
     *     async function example() {
     *       const orderFoodButton = By.id('order-food');
     *       await waitElementToBeEnabledOrDisabled(orderFoodButton, true);
     *     }
     *
     * @param {object=} elementLocator By locator
     * @param {string=} blnEnabled whether you want to check if the element is enabled or disabled
     * @param {int=} timeOut Maximum timeout to wait until the conditions meets
     * if no parameter is set then defaultWaitTimeout (that one you set on the config file) will be used
     * @return {!Promise<boolean>} A promise that will resolve to true or false
     */
  static async waitElementToBeEnabledOrDisabled(elementLocator, blnEnabled, timeOut = DEFAULT_WAIT_TIME_OUT) {
    return driver.wait(async () => {
      if (blnEnabled === true) {
        return (await this.isElementEnabled(elementLocator) === true);
      }
      return (await this.isElementEnabled(elementLocator) !== true);
    }, timeOut, `The Element with the locator ${elementLocator.toString()} is not enabled`);
  }
}

module.exports = Helpers;
