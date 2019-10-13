# selenium-cucumber-easy

## Setup
Install selenium-cucumber-framework in your project (you can also install globally with -g flag)
```js
npm install selenium-cucumber-easy
```
## Basic usage
Map the objects of your application in this format:
```js
import {By} from 'selenium-cucumber-framework';
export default {
    'UNIDADEDROPDOWN': By.name('superior'),
    'LOGO' : By.id('logo')
}
```
Create a config file to run the tests and set the path of your mapped objects' files on the config file
```js
import {By} from 'selenium-cucumber-framework';
export default {
    seleniumAddress : 'http://localhost:4444/wd/hub',
    pageObjects : ['/path/to/page-objects1', '/path/to/page-objects2']
}
```
Having this set you can start using the framework, you will only need to write feature files with the parameters you mapped.
## Running the test
If the framework was installed locally
```js
node_modules/selenium-cucumber-framework/bin/selenium-cucumber-framework path/to/configfile.js
```

If the framework was installed globally
```js
selenium-cucumber-framework path/to/configfile.js
```
## Available BDD steps:
open a URL in browser:
```gherkin
    Given I go to the following page "http://www.ulbra.br"
```
#### Click on a button:
##### Where:
Button name = the name of element you want to click, must be the same one you mapped on file

Page name = The parent node of button element, based in you mapper

Component Name = If you mapped with a 3 level JSON the child of page name can be the component where the button element is

```gherkin
    And I click on "Button Name" on "Page Name"
    ##OR
    And I click on "Button Name" on "Component Name" on page "Page name"
```
#### Write text in a field:
##### Where:

Text to insert = the text to insert on text box

Text box Element = the name of element you want to insert text, must be the same one you mapped on file

Page name = The parent node of text box element, based in you mapper

Component Name = If you mapped with a 3 level JSON the child of page name can be the component where the text box element is

```gherkin
    And I insert the value "text to insert" on "Text box element" on "Page name"
    ##OR
     And I insert the value "text to insert" on "Component Name" on "Text box element" on "Page name"
```
There will be a lot of steps like: selecting item in a dropdown, verifying an element text, waiting an element to be displayed, checking the presence and visibility of an element, mouse hover an element etc...

#### Automation Helper API
You may also need to build your own BDD steps using cucumber, you can do this with the helper API.

Example
```js
import { Helpers, Given, When, Then } from 'selenium-cucumber-framework';
Given('I click on {string} on home page ', async function(elementName) {
  await Helpers.clickOnElement(elementName);
});
```

## Sample app
This sample app is automated using this framework: https://github.com/cunhabruno/escola-xyz
