# selenium-cucumber-easy

## Setup
Install selenium-cucumber-easy in your project (you can also install globally with -g flag)
```js
npm install selenium-cucumber-easy
```
## Basic usage
Map the objects of your application in this format:
```js
import {By} from 'selenium-webdriver';
export default {
    'UNIDADEDROPDOWN': By.name('superior'),
    'LOGO' : By.id('logo')
}
```
Set the path of your mapped objects' files on runner file
```js
import {By} from 'selenium-webdriver';
export default {
    seleniumAddress : 'http://localhost:4444/wd/hub',
    pageObjects : ['/path/to/page-objects1', '/path/to/page-objects2']
}
```
Having this set you can start using the framework, you will only need to write feature files with the parameters you mapped.

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
You may also need to build your own steps, you can also do this with the help of out helper API.

The helper API cover almost all actions and validations a QA may want to do in your app.

## Sample app
This sample app is automated using this framework: https://github.com/cunhabruno/escola-xyz
