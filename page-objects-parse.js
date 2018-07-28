export default class PageObjectsParse {
    constructor(pageObjectsObj) {
        this.pageObjectsObj = pageObjectsObj;
    }

    get2LevelsLocator(parent, child1) {
        this.pageObjectsObj.forEach(mapperObj => {
            if(mapperObj[parent] !== 'undefined'){
                console.log(mapperObj[parent][child1]);
            }

        })
    }
}