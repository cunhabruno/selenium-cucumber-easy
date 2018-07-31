export default {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    browserName: 'chrome',

    pageObjects: [
        'page-objects/landing-page.js',
        'page-objects/home-page.js'
    ],

    featureFiles : [
        'features/example.feature'
    ],

    stepDefinitions : [
        'features/step-definitions'
    ]
}