export default class PageObjectsParse {
    constructor(pageObjectsObj) {
        this.pageObjectsObj = pageObjectsObj;
    }

    get2LevelsLocator(parent, child1) {
        parent = parent.toUpperCase().replace(/ /g, '');
        child1 = child1.toUpperCase().replace(/ /g, '');
        let locatorFound = null;
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