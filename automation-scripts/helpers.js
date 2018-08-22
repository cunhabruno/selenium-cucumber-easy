const {By, Key} = require('selenium-webdriver');
const assert = require('assert');
class Helpers {

    /***********Action Functions************** */

    static async selectValueOnDropDown (dropDownLocator, valueToSelect) {
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
        if(typeof Key[keyToPress] !== 'undefined') {
            await driver.actions({bridge: true}).sendKeys(Key[keyToPress]).perform();
        } else {
            throw new Error('Invalid key to press');
        }
    }

        /***********Verifier Functions************** */

    static async checkElementExists (elementLocator, blnExists) {
        return await driver.findElement(elementLocator).isDisplayed();
    }

    static async checkElementText (elementLocator, blnMeets, textToValidate) {
        if(typeof elementLocator === 'function') {
            elementLocator = elementLocator(textToValidate);
        }
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        const textFound = await driver.findElement(elementLocator).getText();
        blnMeets ?
            assert.equal(textFound, textToValidate, 'Element text should be equals') :
            assert.notEqual(textFound, textToValidate, 'Element text should NOT be equals');
        return (textFound === textToValidate) === blnMeets;
    }

    static async checkElementTextContains (elementLocator, blnMeets, textToValidate) {
        await this.waitVisibilityOfElement(elementLocator, DEFAULT_WAIT_TIME_OUT);
        const textFound = await driver.findElement(elementLocator).getText();
        const containsResult = textFound.includes(textToValidate);
        blnMeets ?
            assert(containsResult, 'Element text should contains "' + textToValidate + '"') :
            assert(!containsResult, 'Element text should NOT contains "' + textToValidate + '"');
        return containsResult === blnMeets;
    }

    static isElementDisplayed(elementLocator) {
        return driver.findElements(elementLocator).then(elms => {
            if(elms.length > 0) {
                return elms[0].isDisplayed().then(displayed => displayed);
            } else {
                return false;
            }
        }, (err) => {
            return false;
        });
    }

    static isElementEnabled(elementLocator) {
        return this.isElementDisplayed(elementLocator).then((displayed) => {
            if(displayed) {
                return driver.findElement(elementLocator).isEnabled().then(enabled => enabled);
            }

            return displayed;
        });
    }

        /***********Wait Functions************** */

    static async waitVisibilityOfElement(elementLocator, timeOut) {
        return driver.wait(() => {
            return this.isElementDisplayed(elementLocator)
        }, timeOut, 'The Element with the locator ' + elementLocator.toString() + ' is not visible');
    }

    static async waitElementToBeClickable(elementLocator, timeOut) {
        return driver.wait(() => {
            return this.isElementEnabled(elementLocator)
        }, timeOut, 'The Element with the locator ' + elementLocator.toString() + ' is not clickable');
    }
}

module.exports = Helpers;