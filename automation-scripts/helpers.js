import {By} from 'selenium-webdriver';
export default class Helpers {
    static async selectValueOnDropDown (dropDownLocator, valueToSelect) {
        valueToSelect = typeof valueToSelect === 'string' ?
            By.xpath('//*[.="' + valueToSelect + '"]') :
            valueToSelect;

        await browser.findElement(dropDownLocator).click();
        await browser.findElement(valueToSelect).click();
    }

    static async clickOnElement(elementToClick) {
        await browser.findElement(elementToClick).click();
    }
}