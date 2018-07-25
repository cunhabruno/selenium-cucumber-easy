export default class ObjectsHelper {
    constructor(objectsHash) {
        this.objects = objectsHash;
    }

    getElement(elementName) {
        elementName = elementName.toUpperCase().replace(/ /g, '');
        return this.objects[elementName];
    }
}