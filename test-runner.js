export default {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    browserName: 'chrome',

    pageObjects: [
        '/home/cunha/selenium-cucumber-easy/page-objects/landing-page.js',
        '/home/cunha/selenium-cucumber-easy/page-objects/home-page.js'
    ],

    featureFiles : []
}