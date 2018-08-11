import {By} from 'selenium-webdriver';
export default class Helpers {
    static async selectValueOnDropDown (dropDownLocator, valueToSelect) {
        valueToSelect = typeof valueToSelect === 'string' ?
            By.xpath('//*[.="' + valueToSelect + '"]') :
            valueToSelect;

        await driver.findElement(dropDownLocator).click();
        return await driver.findElement(valueToSelect).click();
    }

    static async clickOnElement(elementToClick) {
        await this.waitElementToBeClickable(elementToClick, 9000);
        await driver.findElement(elementToClick).click();
    }

    static async writeText(elementLocator, textToAdd) {
        await this.waitVisibilityOfElement(elementLocator, 9000);
        await driver.findElement(elementToClick).sendKeys(textToAdd);
    }

    static async checkElementExists (elementLocator, blnExists) {
        return await driver.findElement(elementLocator).isDisplayed();
    }

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
}