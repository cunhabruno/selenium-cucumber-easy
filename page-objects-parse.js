'use strict';
class PageObjectsParse {
    constructor(pageObjectsObj) {
        this.pageObjectsObj = pageObjectsObj;
    }

    get1LevelLocator(locator) {
        locator = locator.toUpperCase().replace(/ /g, '');
        let locatorFound;
        this.pageObjectsObj.forEach(mapperObj => {
            if(typeof mapperObj[locator] !== 'undefined'){
                locatorFound = mapperObj[locator];
            }
        });
        return locatorFound;
    }

    get2LevelsLocator(parent, child1) {
        parent = parent.toUpperCase().replace(/ /g, '');
        child1 = child1.toUpperCase().replace(/ /g, '');
        let locatorFound;
        this.pageObjectsObj.forEach(mapperObj => {
            if(typeof mapperObj[parent] !== 'undefined'){
                if(typeof mapperObj[parent][child1] !== 'undefined') {
                    locatorFound = mapperObj[parent][child1];
                }
            }
        });
        return locatorFound;
    }
}
module.exports = PageObjectsParse;