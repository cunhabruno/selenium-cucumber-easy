const {By, Key} = require('selenium-webdriver');
const fs = require('fs');

class Utils {

    /***********Action Functions************** */

    static async takeScreenshot(fileName) {
        const image = await driver.takeScreenshot();
        await fs.writeFileSync(fileName + '.png', image, 'base64');
    }

}

module.exports = Utils;