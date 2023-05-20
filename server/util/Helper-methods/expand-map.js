const getMultipleFromMap = (map = new Map(), keys = []) => {
    let found = [];
    keys.forEach((key) => {
        let value = map.get(key);
        if (value)
            found.push(value);
    });
    return found;
}
const boundToArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}
const boundAttributeInObjToArray = (Obj = {}) => {
    let objValuesBoundedToArray = {};
    for (const [attr, value] of Object.entries(Obj)) {
        objValuesBoundedToArray[attr] = boundToArray(value);
    }
    return objValuesBoundedToArray;
}
const boundThenAppend = (map = new Map(), obj = {}) => {
    appendObj(map, boundAttributeInObjToArray(obj));
    return map;
}
const appendObj = (map = new Map(), obj = {}) => {
    for (const [attribute, value] of Object.entries(obj)) {
        let values = map.get(attribute) || [];
        values.push(value);
        map.set(attribute, values);
    }
}
const appendNewAttrsValToObj = (obj, attributes = [], values = []) => {
    attributes = boundToArray(attributes);
    values = boundToArray(values);
    for (const posAttr in attributes) {
        obj[attributes[posAttr]] = values[posAttr];
    }
    return obj;
}

const deepConvertMapToObject = (map = new Map(), resultArray = [], obj = {}) => {

    map.forEach((val, key) => {
        if (Array.isArray(val)) {

            deepConvertMapToObjArr(val, resultArray, obj);

        } else if (Array.isArray(key)) {

            deepConvertMapToObjArr(key, resultArray, obj);

        } else if (key instanceof Map && !(val instanceof Map)) {
            resultArray.push(obj[deepConvertMapToObject(key, resultArray, obj)] = val);

        } else if (val instanceof Map && !(key instanceof Map)) {
            resultArray.push(obj[key] = deepConvertMapToObject(val, resultArray, obj));

        } else if (val instanceof Map && key instanceof Map) {
            resultArray.push(obj[deepConvertMapToObject(key, resultArray, obj)] = deepConvertMapToObject(val, resultArray, obj));
        } else {
            obj[key] = val;
        }
    });
    resultArray.push(obj);
    obj = {};
}

const sliceMap = (map, start, deleteCount) => {
    return new Map(Array.from(map).slice(start, deleteCount));
}

const convertObjectToMap = (obj) => {
    return new Map(Object.entries(obj));
}
const printMap = (map) => {
    for (const [key, value] of map.entries())
        console.log(`${ key }: ${ value }`);
    console.log(`-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - `);
}

const printMaps = (map = new Map()) => {
    printMap(map);
    map.forEach((val, key) => {
        if (val instanceof Map) printMaps(val);
        if (key instanceof Map) printMaps(key);
    });
}
const deepConvertMapToObjArr = (array = [], arrToAppend = []) => {
    array.forEach((val) => {
        if (val instanceof Map) {
            let obj = {};

            convertMapsToObject(val, obj);
            arrToAppend.push(obj);

            deepConvertMapToObjArr(array.slice(arrToAppend.length), arrToAppend);
        } else if (val instanceof Array) {
            deepConvertMapToObjArr(val, arr);
        } else {
            arrToAppend.push(array[0]);
            deepConvertMapToObjArr(array.slice(arrToAppend.length), arrToAppend);
        }
    });
}
const convertMapsToObject = (maps = new Map(), objectResult = {}) => {
    maps.forEach((val, key) => {
        if (val instanceof Map) {
            let obj = {};
            objectResult[key] = obj;
            convertMapsToObject(val, obj);
        } else if (Array.isArray(val)) {
            var arrayVal = [];
            objectResult[key] = arrayVal;
            deepConvertMapToObjArr(val, arrayVal);
        } else {
            objectResult[key] = val;
        }


    });
}
module.exports = {
    getMultipleFromMap,
    boundAttributeInObjToArray,
    boundThenAppend,
    appendObj,
    appendNewAttrsValToObj,
    deepConvertMapToObjArr,
    convertMapsToObject,
    sliceMap,
    convertObjectToMap,
    printMaps
}