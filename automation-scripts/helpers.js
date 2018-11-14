const {By, Key} = require('selenium-webdriver');
const assert = require('assert');

class Helpers {

    /***********Action Functions************** */

    static async selectValueOnDropDown(dropDownLocator, valueToSelect, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        valueToSelect = typeof valueToSelect === 'string' ?
            By.xpath('//*[.="' + valueToSelect + '"]') :
            valueToSelect;
        await this.waitVisibilityOfElement(valueToSelect, timeOut);
        await driver.findElement(dropDownLocator).click();
        return await driver.findElement(valueToSelect).click();
    }

    static async clickOnElement(elementLocator, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitElementToBeClickable(elementLocator, timeOut);
        await driver.findElement(elementLocator).click();
    }

    static async doubleClickOnElement(elementLocator, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitElementToBeClickable(elementLocator, timeOut);
        await driver.findElement(elementLocator).doubleClick();
    }

    static async clearInputElement(elementLocator, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitVisibilityOfElement(elementLocator, timeOut);
        await driver.findElement(elementLocator).clear();
    }

    static async writeText(elementLocator, textToAdd, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitVisibilityOfElement(elementLocator, timeOut);
        await driver.findElement(elementLocator).clear();
        await driver.findElement(elementLocator).sendKeys(textToAdd);
    }

    static async appendText(elementLocator, textToAdd, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitVisibilityOfElement(elementLocator, timeOut);
        await driver.findElement(elementLocator).sendKeys(textToAdd);
    }

    static async mouseHover(elementLocator, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitVisibilityOfElement(elementLocator, timeOut);
        const el = await driver.findElement(elementLocator);
        const actions = driver.actions({bridge: true});
        await actions.move({origin: el}).perform();
    }

    static async pressKey(keyToPress) {
        keyToPress = keyToPress.toUpperCase().replace(/ /g, '');
        if (typeof Key[keyToPress] !== 'undefined') {
            await driver.actions({bridge: true}).sendKeys(Key[keyToPress]).perform();
        } else {
            throw new Error('Invalid key to press');
        }
    }

    /***********Verifier Functions************** */

    static async checkElementPresent(elementLocator, blnExists, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        return blnExists ?
            await this.waitPresenceOfElement(elementLocator, timeOut) :
            await this.waitPresenceOfElement(elementLocator, timeOut);
    }

    static async checkElementDisplayed(elementLocator, blnExists, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        return blnExists ?
            await this.waitVisibilityOfElement(elementLocator, timeOut) :
            await this.waitInvisibilityOfElement(elementLocator, timeOut);
    }

    static async checkElementSelected(elementLocator, blnSelected, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitPresenceOfElement(elementLocator, timeOut);
        const selectedResult = await driver.findElement(elementLocator).isSelected();
        blnSelected ?
            assert.equal(blnSelected, selectedResult, 'Element text should be Selected') :
            assert.equal(blnSelected, selectedResult, 'Element text should be Unselected');
        return blnSelected === selectedResult;
    }

    static async checkElementEnabled(elementLocator, blnEnabled, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitPresenceOfElement(elementLocator, timeOut);
        const enabledResult = await driver.findElement(elementLocator).isEnabled();
        blnEnabled ?
            assert.equal(blnEnabled, enabledResult, 'Element text should be Enabled') :
            assert.equal(blnEnabled, enabledResult, 'Element text should be Disabled');
        return blnEnabled === enabledResult;
    }

    static async checkElementText(elementLocator, blnMeets, textToValidate, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        if (typeof elementLocator === 'function') {
            elementLocator = elementLocator(textToValidate);
        }
        await this.waitVisibilityOfElement(elementLocator, timeOut);
        const textFound = await driver.findElement(elementLocator).getText();
        blnMeets ?
            assert.equal(textFound, textToValidate, 'Element text should be equals') :
            assert.notEqual(textFound, textToValidate, 'Element text should NOT be equals');
        return (textFound === textToValidate) === blnMeets;
    }

    static async checkElementTextContains(elementLocator, blnMeets, textToValidate, timeOut) {
        timeOut = typeof timeOut === 'undefined' ? DEFAULT_WAIT_TIME_OUT : timeOut;
        await this.waitVisibilityOfElement(elementLocator, timeOut);
        const textFound = await driver.findElement(elementLocator).getText();
        const containsResult = textFound.includes(textToValidate);
        const textFoundMsg = 'Text found was: ' + textFound;
        blnMeets ?
            assert(containsResult, 'Element text should contains "' + textToValidate + '" ' + textFoundMsg) :
            assert(!containsResult, 'Element text should NOT contains "' + textToValidate + '" ' + textFoundMsg);
        return containsResult === blnMeets;
    }

    static isElementPresent(elementLocator) {
        return driver.findElements(elementLocator).then(elms => {
            return elms.length > 0;
        }, (err) => {
            return false;
        });
    }

    static isElementDisplayed(elementLocator) {
        return driver.findElements(elementLocator).then(elms => {
            if (elms.length > 0) {
                return driver.findElement(elementLocator).isDisplayed().then(displayed => displayed);
            } else {
                return false;
            }
        }, (err) => {
            return false;
        });
    }

    static isElementEnabled(elementLocator) {
        return this.isElementDisplayed(elementLocator).then((displayed) => {
            if (displayed) {
                return driver.findElement(elementLocator).isEnabled().then(enabled => enabled);
            }

            return displayed;
        });
    }

    /***********Wait Functions************** */

    static async waitPresenceOfElement(elementLocator, timeOut) {
        return driver.wait(async() => {
            return await this.isElementPresent(elementLocator)
        }, timeOut, 'The Element with the locator ' + elementLocator.toString() + ' is not present');
    }

    static async waitVisibilityOfElement(elementLocator, timeOut) {
        return driver.wait(async() => {
            return await this.isElementDisplayed(elementLocator)
        }, timeOut, 'The Element with the locator ' + elementLocator.toString() + ' is not visible');
    }

    static async waitInvisibilityOfElement(elementLocator, timeOut) {
        return driver.wait(async () => {
            return !await this.isElementDisplayed(elementLocator)
        }, timeOut, 'The Element with the locator ' + elementLocator.toString() + ' is visible');
    }

    static async waitElementToBeClickable(elementLocator, timeOut) {
        return driver.wait(() => {
            return this.isElementEnabled(elementLocator)
        }, timeOut, 'The Element with the locator ' + elementLocator.toString() + ' is not clickable');
    }

}

module.exports = Helpers;