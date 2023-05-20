/*
╔════╗╔╗╔╗╔═══╗╔══╗╔╗╔╗╔╗───╔═══╗╔═══╗╔═══╗╔══╗
╚═╗╔═╝║║║║║╔═╗║║╔╗║║║║║║║───║╔══╝║╔═╗║║╔═╗║║╔╗║
──║║──║╚╝║║╚═╝║║║║║║║║║║║───║╚══╗║╚═╝║║╚═╝║║║║║
──║║──║╔╗║║╔╗╔╝║║║║║║║║║║───║╔══╝║╔╗╔╝║╔╗╔╝║║║║
──║║──║║║║║║║║─║╚╝║║╚╝╚╝║───║╚══╗║║║║─║║║║─║╚╝║
──╚╝──╚╝╚╝╚╝╚╝─╚══╝╚═╝╚═╝───╚═══╝╚╝╚╝─╚╝╚╝─╚══╝
   all of these function throw Error(s):
     -> -> -> -> -> -> -> -> -> -> -> 
         swapElements

         deleteAndSetToNewArray

         appendUniqueElements

         equivalentArraysLength
        
   
*/

const areAllValuesNumerical = (values, alterIndexesToNumberType = false) => {
    if (!values) return true;
    if (Array.isArray(values)) {

        return values.every((val) => !(isNaN(val)));
    } else {
        return !(isNaN(values));
    }


}

const getAllValuesToNumberType = (values = []) => {

    if (Array.isArray(values)) {
        return values.map((val) => {
            if (!(isNaN(val)))
                Number(val);
        });
    } else {
        return +(values);
    }

}

const appendUniqueElements = (from, to = []) => {
    if (!Array.isArray(to)) throw new Error("Error: 2th arg. must be array and FYI-> 1th agr. is optional to be primitive(single value) or array");
    let fromValue = from;
    let indexesOfNewElements = [];
    let indexesOfRepeatedElements = [];
    if (Array.isArray(fromValue)) {


        fromValue.forEach(valueInFrom => {
            let index = to.indexOf(valueInFrom);
            if (index < 0) {
                indexesOfNewElements.push(to.length);
                to.push(valueInFrom);
            } else {
                indexesOfRepeatedElements.push(index);
            };
        })
    } else {
        let index = to.indexOf(from);
        if (index < 0) {
            indexesOfNewElements.push(to.length);
            to.push(from);
        } else {
            indexesOfRepeatedElements.push(index);
        }
    }
    return [indexesOfNewElements, indexesOfRepeatedElements];
}

const checkValidIndex = (array, index) => {
    if (!isAliveArray(array)) return false;
    if (index < 0 || index >= array.length) {
        return false;
    }
    return true;
}
const checkValidIndexes = (array, indexes) => {
    if (!(areAllAliveArrays([array, indexes]))) return false;

    return (indexes.every((index) => checkValidIndex(array, index)));

}
const swapElements = (array, index, indexToSwapWith) => {
    if (!areValidIndexesToDealWith(array, [index, indexToSwapWith], true))
        throw new Error("invalid indexes");

    [array[index], array[indexToSwapWith]] = [array[indexToSwapWith], array[index]];
}
const isAliveArray = (array) => {
    return (!array || !Array.isArray(array) || !array.length) ? false : true;
}
const deleteAndSetToNewArray = (arrayToBeNewSet, newArray) => {
    if (areAllArrays([arrayToBeNewSet, newArray]))
        arrayToBeNewSet = newArray;
    else
        throw new Error("two Args must be arrays as intentionally purpose");
}
const areValidIndexesToDealWith = (array, indexes, alterIndexesToNumberType = false) => {
        if (!isAliveArray(array))
            return false;

        if (Array.isArray(indexes) && !indexes.length)
            return true;

        if (!(areAllValuesNumerical(indexes)))
            return false;

        let cloneIndexes = null;

        if (alterIndexesToNumberType) {
            cloneIndexes = [...indexes];
            indexes = getAllValuesToNumberType(indexes);
        }
        const valid = checkValidIndexes(array, indexes);
        if (!valid) indexes = cloneIndexes;
        return valid;
    }
    // call by []
const areAllArrays = (arrays) => {
        if (!isAliveArray(arrays)) return false;

        for (const array of arrays) {
            if (!(Array.isArray(array)))
                return false;
        }
        return true;
    }
    // []
const areAllAliveArrays = (arrays) => {
        if (!arrays) return false;
        for (const array of arrays)
            if (!isAliveArray(array)) return false;
        return true;
    }
    // []
const equivalentArraysLength = (arrays) => {
    if (!areAllAliveArrays(arrays)) throw new Error("all of args must be exist and array entry");

    if (arrays.length < 2) return true;

    const len = arrays[0].length;
    for (const array of arrays) {

        if (!(array.length === len)) return false;
        return true;
    }
}
const sortMultiple = (compareFunToApplySorting, ...arrays) => {
    if (!arrays || !compareFunToApplySorting) return new Error("undefined args");
    for (const arr of arrays) {
        arr.sort(compareFunToApplySorting);
    }
}
const equalArray = (array, anotherArray) => {
    if (!areAllAliveArrays([array, anotherArray])) return false;
    if (!equivalentArraysLength([array, anotherArray])) return false;

    sortMultiple((v1, v2) => v1 - v2, array, anotherArray);
    for (const i in array)
        if (array[i] !== anotherArray[i]) return false;

    return true;
}
const equivalentArrays = (...arrays) => {
    if (equivalentArraysLength(arrays)) {
        for (const i in arrays) {
            if (!equalArray(arrays[i], arrays[i + 1])) return false;
        }
        return true;

    } else {
        return false;
    }

}

// [] []
const mapValuesToIndexes = (inArray, valuesArray) => {
    if (!areAllAliveArrays([inArray, valuesArray])) return null;
    let indexes = [],
        missed = [];
    for (const value of valuesArray) {
        let index = inArray.indexOf(value);
        if (index < 0) {
            missed.push(index);
            continue;
        }
        indexes.push(index);
    }
    return [indexes, missed];
}
const mapIndexesToValues = (array, indexes = []) => {
    if (!areAllAliveArrays([array, indexes])) return null;
    // if (!areValidIndexesToDealWith(array, indexes, true)) return null;
    indexes.sort((v1, v2) => v1 - v2);
    let arrayValues = [];
    for (const index of indexes)
        arrayValues.push(array[index]);
    return arrayValues;
}
const translateArraysToArray = (arrays) => {
    let array = [];
    for (const arr of arrays) {
        array.push(...arr);
    }
    return array;
}

const boundToArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}
const sumAll = array => {
        if (!isAliveArray(array)) return null;
        return array.reduce((pv, cv) => pv + cv, 0);
    }
    //const eliminateWholeValue = (array,value,index){}
    // whichElementNotInclude looks pretty difference of Sets as exactly:
    // comparisonArray - inArray ===-> will got always elements from comparsion array that does exist in inArray

const whichElementNotInclude = (inArray = [], comparisonArray = []) => {
    let difference = new Set();
    let inArraySortedClone = [...inArray];
    let comparisonArraySortedClone = [...comparisonArray];

    sortMultiple((v1, v2) => v1 - v2, inArraySortedClone, comparisonArraySortedClone);

    for (var i = 0; i < comparisonArraySortedClone.length; i++) {

        let index = inArraySortedClone.indexOf(comparisonArraySortedClone[i]);

        if (index >= 0) {
            let repeated = 1,
                y = index;

            while (inArraySortedClone[index] === inArraySortedClone[++index])
                repeated++;

            inArraySortedClone.splice(y, repeated);

            repeated = 1, y = i;
            while (comparisonArraySortedClone[y] === comparisonArraySortedClone[++y])
                repeated++;


            comparisonArraySortedClone.splice(i, repeated);

            i--;

        } else {
            difference.add(comparisonArraySortedClone[i]);
        }
    }
    return [...difference];
}
const appendValuesInSpecifyIndexes = (array, indexes, values, defaultValue = 0) => {

    if (!Array.isArray(values))
        values = Array(indexes.length).fill(values);
    else if (values.length === 1) {
        values = Array(indexes.length).fill(values[0]);

    }
    let vIteration = 0;
    for (const index of indexes) {
        if (values[vIteration] || values[vIteration] === 0) {
            array[index] = values[vIteration];

        } else {
            array[index] = defaultValue;
        }
        // array[index] = values[vIteration++] ?? defaultValue; 
        vIteration++;

    }

}
const generateRange = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
const average = (array) => {
    return array.reduce((x, y) => x + y) / array.length
}
const max = (array) => {
    return Math.max(...array);
}
const min = (array) => {
    return Math.min(...array);
}
const eliminateElementsByValues = (array = [], items = []) => {
    let deleteObj = Object.create({});
    items.forEach((item) => deleteObj[item] = true);
    return array.filter(val => !deleteObj[val]);
}
const eliminateElementsByIndex = (array, indices, start = 0) => {
    if (!array.length || !indices.length)
        return;
    array.splice(indices[0] - start, 1);
    eliminateElementsByIndex(array, indices.slice(1), ++start);
}
const repeatedValues = (array = []) => {
    if (!array.length)
        return new Map();
    let repeatedMapToIndices = new Map();

    array.forEach((value, index) => {
        let indices = repeatedMapToIndices.get(value) || [];
        if (!indices.length) {
            indices.push(index);
            repeatedMapToIndices.set(value, indices);
        } else {
            indices.push(index);
        }

    });
    return repeatedMapToIndices;
}
const whereValueRepeated = (array = [], values) => {
    let indices = [];
    if (!Array.isArray(values)) values = [values];
    array.forEach((val, index) => {
        if (values.includes(val))
            indices.push(index);
    });
    return indices;
}

const closestNumberToNumbers = (array, number, setting = -1) => {
    if (number === undefined || number === null) return number;
    let closestNumber = array[0];

    for (const value of array) {
        if (number === value)
            return number;

        let closestNumberDiff = Math.abs(number - closestNumber);
        let valueDiff = Math.abs(number - value);

        if (closestNumberDiff > valueDiff) {
            closestNumber = value;
        } else if (closestNumberDiff === valueDiff) {


            if (setting < 0) {
                closestNumber = Math.min(value, closestNumber);
            } else {

                closestNumber = Math.max(value, closestNumber);
            }

        }

    }
    return closestNumber;
}

const maxDate = (dates) => {
    return new Date(Math.max(...dates));
}
const getTimesDifference = (fromDates = [], toDates = []) => {
    toDates = boundToArray(toDates);
    fromDates = boundToArray(fromDates);
    let datesDif = [];
    //let noNotMapped = Math.abs(toDates.length - fromDates.length);
    let len = fromDates.length <= toDates.length ? fromDates.length : toDates.length;
    for (let i = 0; i < len; i++) {
        datesDif.push(toDates[i] - fromDates[i]);
    }
    return datesDif;
}
const margeRelativeInRow = (...arrays) => {
    let allData = {};

    for (let i = 0; i < arrays[0].length; i++) {
        allData[i] = allData[i] || [];
        for (let j = 0; j < arrays.length; j++) {
            allData[i].push(arrays[j][i]);
        }
    }
    return allData;
}
const sumAllInRow = (arrays, position) => {
    let sum = 0;
    for (const array of arrays) {
        sum += array[position]
    }
    return sum;
}
const indexOfByAttrsValues = (arrayOfObjs, objComparison = {}) => {
    let cArrayOfObjs = arrayOfObjs;
    if (!Array.isArray(arrayOfObjs))
        cArrayOfObjs = [arrayOfObjs];

    let indices = [];

    for (const i in cArrayOfObjs) {
        let equal = false;
        for (const [key, value] of Object.entries(objComparison)) {
            if (cArrayOfObjs[i].hasOwnProperty(key) && cArrayOfObjs[i][key] === value) {
                equal = true;
            } else {
                equal = false;
                break;
            }
        }
        if (equal)
            indices.push(i);

    }
    return indices;
}
const deleteLastElement = (array = [], values = []) => {
    let deleteObj = {};
    array.forEach((val) => deleteObj[val] = true);
    for (let i = array.length - 1; i >= 0; i--) {
        if (deleteObj[array[i]] === true) {
            array.splice(i, 1);
        }
    }
    return array;
}
const getLastElements = (arr = [], noElements) => {
    if (noElements > 0)
        noElements *= -1;
    return arr.slice(noElements);
}
console.log(getAllValuesToNumberType([1, 2, '3']));

console.log(Number('5'));