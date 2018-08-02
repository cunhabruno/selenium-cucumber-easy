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
        await driver.findElement(elementToClick).click();
    }

    static async checkElementExists (elementLocator, blnExists) {
        return await driver.findElement(elementLocator).isDisplayed();
    }
}