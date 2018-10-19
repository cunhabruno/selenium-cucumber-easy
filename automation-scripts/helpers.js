const {By, Key} = require('selenium-webdriver');
const assert = require('assert');

class Helpers {

    /***********Action Functions************** */

    static async selectValueOnDropDown(dropDownLocator, valueToSelect) {
        valueToSelect = typeof valueToSelect === 'string' ?
            By.xpath('//*[.="' + valueToSelect + '"]') :
            valueToSelect;

        await driver.findElement(dropDownLocator).click();
        return await driver.findElement(valueToSelect).click();
    }

    static async clickOnElement(elementToClick) {
        await this.waitElementToBeClickable(elementToClick, DEFAULT_WAIT_TIME_OUT);
        await driver.findElement(elementToClick).click();
    }

    static async clearInputElement(elementToClick) {
        await this.waitVisibilityOfElement(elementToClick, DEFAULT_WAIT_TIME_OUT);
        await driver.findElement(elementToClick).clear();
    }

    static async writeText(elementLocator, textToAdd) {
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        await driver.findElement(elementLocator).clear();
        await driver.findElement(elementLocator).sendKeys(textToAdd);
    }

    static async appendText(elementLocator, textToAdd) {
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        await driver.findElement(elementLocator).sendKeys(textToAdd);
    }

    static async mouseHover(elementLocator) {
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
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

    static async checkElementPresent(elementLocator, blnExists) {
        return blnExists ?
            await this.waitPresenceOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT) :
            await this.waitPresenceOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
    }

    static async checkElementDisplayed(elementLocator, blnExists) {
        return blnExists ?
            await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT) :
            await this.waitInvisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
    }

    static async checkElementSelected(elementLocator, blnSelected) {
        await this.waitPresenceOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        const selectedResult = await driver.findElement(elementLocator).isSelected();
        blnSelected ?
            assert.equal(blnSelected, selectedResult, 'Element text should be Selected') :
            assert.equal(blnSelected, selectedResult, 'Element text should be Unselected');
        return blnSelected === selectedResult;
    }

    static async checkElementEnabled(elementLocator, blnEnabled) {
        await this.waitPresenceOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        const enabledResult = await driver.findElement(elementLocator).isEnabled();
        blnEnabled ?
            assert.equal(blnEnabled, enabledResult, 'Element text should be Enabled') :
            assert.equal(blnEnabled, enabledResult, 'Element text should be Disabled');
        return blnEnabled === enabledResult;
    }

    static async checkElementText(elementLocator, blnMeets, textToValidate) {
        if (typeof elementLocator === 'function') {
            elementLocator = elementLocator(textToValidate);
        }
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        const textFound = await driver.findElement(elementLocator).getText();
        blnMeets ?
            assert.equal(textFound, textToValidate, 'Element text should be equals') :
            assert.notEqual(textFound, textToValidate, 'Element text should NOT be equals');
        return (textFound === textToValidate) === blnMeets;
    }

    static async checkElementTextContains(elementLocator, blnMeets, textToValidate) {
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
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