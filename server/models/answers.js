const arrayExpanded = require("../util/Helper-methods/expand-array");
module.exports = class Answers {

    constructor(answers, indicesOfCorrectAnswers, points, defaultValueForPoint) {
        //  if (!this.initializing)
        //    throw new Error(`The constructor is private, please use createAnswersModule() or any alternative see the Readme for answer module.`);
        if (!Array.isArray(answers))
            throw new Error("answers must be Array entry");

        let answerValues = [...new Set(answers)];

        let cCorrectAnswerIndexes = arrayExpanded.boundToArray(indicesOfCorrectAnswers);

        if (!arrayExpanded.areValidIndexesToDealWith(answerValues, cCorrectAnswerIndexes, true)) {

            throw new Error("indexes are out of bounded");
        }

        this._answers = answerValues;
        this._correctAnswersIndexes = cCorrectAnswerIndexes;

        this._points = points;
        this._defaultPoint = defaultValueForPoint;
    }

    appendAnswer(newAnswer, isCorrect = false, point = this._defaultPoint) {
        if (!newAnswer) return;

        let cNewAnswers = arrayExpanded.boundToArray(newAnswer);
        let cAreCorrects = arrayExpanded.boundToArray(isCorrect);
        let cPoints = arrayExpanded.boundToArray(point);

        for (const i in cNewAnswers) {
            let index = this._answers.indexOf(cNewAnswers[i]);

            if (index < 0) {
                index = this._answers.length;
                this._answers.push(cNewAnswers[i]);
            }
            if (cAreCorrects[i] === true)
                arrayExpanded.appendUniqueElements(index, this._correctAnswersIndexes);


            if (!cPoints[i] && cPoints !== 0)
                this._points[index] = this._defaultPoint;
            else
                this._points[index] = cPoints[i];



        }

    }
    checkWhetherHadThatAnswer(answer) {
        let index = this._answers.indexof(answer);
        return (index < 0) ? false : true;
    }
    getIndexesOfAllAnswers() {
        if (!this._answers.length) return [];
        return arrayExpanded.generateRange(0, this._answers.length - 1);
    }
    getIndexesOfNonCorrectAnswers() {
        // allAnswers - correctAnswers
        if (!this._answers.length) return [];
        return arrayExpanded.whichElementNotInclude(this.getCorrectAnswerAsIndexes(), this.getIndexesOfAllAnswers());

    }


    deleteAnswersByIndex(indexesInAnswersToDelete) {
            if (!this._answers) return;

            let cIndexesInAnswersToDelete = arrayExpanded.boundToArray(indexesInAnswersToDelete);

            if (arrayExpanded.checkValidIndexes(this._answers, cIndexesInAnswersToDelete)) {
                for (const index of cIndexesInAnswersToDelete) {
                    this._answers.splice(index, 1);
                    this._points.splice(index, 1);
                    let indexInCorrect = this._correctAnswersIndexes.indexOf(index);
                    if (indexInCorrect >= 0)
                        this._correctAnswersIndexes.splice(indexInCorrect, 1);
                }
            } else {
                throw new Error("you probably enter indexes not valid or undefined values");
            }

        }
        // 0 -> len-1 in correctAnswer
    setCorrectAnswerToUnCorrectAnswer(indexesOfCorrectAnswers, points) {
        if (!this._answers) return false;
        indexesOfCorrectAnswers = arrayExpanded.boundToArray(indexesOfCorrectAnswers);
        let p = 0;
        for (const index of indexesOfCorrectAnswers) {
            let positionInArrayOfIndices = this._correctAnswersIndexes.indexOf(index);
            if (positionInArrayOfIndices >= 0) {
                this._correctAnswersIndexes.splice(positionInArrayOfIndices, 1);
                this._points[index] = points[p++] || this._defaultPoint;
                //this._points[index] = points[p++] ?? this._defaultPoint;
            }
        }
        return true;
    }



    //               [0,1,2]  ["v0","v1","v2"] 
    editAnswerByIndex(indexInAnswersToEdit, newValues) {
        let cIndexInAnswersToEdit = arrayExpanded.boundToArray(indexInAnswersToEdit);
        let cNewValues = arrayExpanded.boundToArray(newValues);

        if (!arrayExpanded.areValidIndexesToDealWith(cIndexInAnswersToEdit, this._answers, true))
            throw new Error("indexes out of bound or args are undefined or invalid indexes (are not numerical values)");


        try {
            if (!arrayExpanded.equivalentArraysLength([cIndexInAnswersToEdit, cNewValues]))
                throw new Error("the length of indexes and mapped values to them must be equivalent");

            let positionOfNewValues = 0;
            for (const index of cIndexInAnswersToEdit) {
                this._answers[index] = cNewValues[positionOfNewValues];
                positionOfNewValues++;
            }

        } catch (error) {
            throw error;
        }

    }
    getAnswers() {
        return this._answers;
    }
    deleteAndSetAnswersToArray(array = []) {
        try {
            arrayExpanded.deleteAndSetToNewArray(this._answers, array);
            this._correctAnswersIndexes = [];
            this._points = [];
        } catch (error) {
            throw error;
        }
    }

    deleteAndSetCorrectAnswersIndexesToArray(arr = []) {
        let cArr = arrayExpanded.boundToArray(arr);
        if (!arrayExpanded.areValidIndexesToDealWith(this._answers, cArr, true))
            throw new Error("index (s) are not valid or you deal with undefined entries");

        try {

            arrayExpanded.deleteAndSetToNewArray(this._correctAnswersIndexes, cArr);
            this._points = [];
            z
        } catch (error) {
            throw error;
        }
    }
    quickAppendAnswers(answers, agree) {

        if (!agree) throw new Error("you must agree for using this function under your responsibility");

        let cAnswers = arrayExpanded.boundToArray(answers);
        for (const answer of cAnswers)
            this._answers.push(answer);

    }

    quickAppendIndexesOFCorrectAnswer(indexes, agree) {
        if (!agree) throw new Error("you must agree for using this function under your responsibility");

        let cIndexes = arrayExpanded.boundToArray(indexes);

        for (const index of cIndexes)
            this._correctAnswersIndexes.push(index);
    }

    appendIndexesOFCorrectAnswer(indexesOfCorrectAnswer) {
        // check valid  
        try {
            if (arrayExpanded.areValidIndexesToDealWith(this._answers, arrayExpanded.boundToArray(indexesOfCorrectAnswer), true)) {

                arrayExpanded.appendUniqueElements(indexesOfCorrectAnswer, this._correctAnswersIndexes);

            } else {
                throw new Error("index (s) are not valid or you deal with undefined entries");
            }
        } catch (error) {
            throw error;
        }
    }

    // #


    swapAnswerByIndex(indexForAnswer, indexForAnswerToSwapWith) {
        try {
            arrayExpanded.swapElements(this._answers, [indexForAnswer, indexForAnswerToSwapWith]);
        } catch (error) {
            throw error;
        }

    }

    sortAnswersByFun(fun) {
        this._answers.sort(fun);
    }

    clear() {
            this._answers = [];
            this._correctAnswersIndexes = [];

            this._defaultPoint = 0;
            this._points = [];
        }
        // using zero-indexing 


    appendCorrectAnswers(answers, points) {
        if (!answers) return;
        let [indexesOfNewElements,
            indexesOfElementsRepeated
        ] = arrayExpanded.appendUniqueElements(answers, this._answers);
        let indexesOfNewCorrectAnswers = indexesOfNewElements.concat(indexesOfElementsRepeated);
        if (arrayExpanded.isAliveArray(points)) {
            this.mapPointsToAllAnswersByIndexes(points, indexesOfNewCorrectAnswers);
        }
        this.appendIndexesOFCorrectAnswer(indexesOfNewCorrectAnswers);

    }
    getAllPoints() {
        return this._points;
    }
    getPointsForCorrectAnswers() {
        return arrayExpanded.mapIndexesToValues(this._points, this.getCorrectAnswerAsIndexes());
    }
    getPointsForNonCorrectAnswers() {
        return arrayExpanded.mapIndexesToValues(this._points, this.getIndexesOfNonCorrectAnswers());
    }
    getPointsForSpecificIndexes(indexes) {
        let cIndexes = arrayExpanded.boundToArray(indexes);
        if (!arrayExpanded.areValidIndexesToDealWith(this._answers, cIndexes, true))
            throw new Error(`out of bound indexes`);
        return arrayExpanded.mapIndexesToValues(this._points, indexes);
    }
    getTotalPointsForIndexes(indexes) {
        return arrayExpanded.sumAll(this.getPointsForSpecificIndexes(indexes));
    }
    getTotalPointsForValues(pointsValue) {
        return arrayExpanded.sumAll(pointsValue);
    }
    getTotalPointsForAllIndexes() {
        return arrayExpanded.sumAll(this._points);
    }

    getCorrectAnswer() {
            if (!arrayExpanded.isAliveArray(this._correctAnswersIndexes)) return null;
            let correctAnswer = new Map();
            for (const index of this._correctAnswersIndexes) {
                correctAnswer.set(index, this._answers[index])
            }
            return correctAnswer;
        }
        // [] or single primitive
    checkMissedAnswersByIndexes(adamantAnswersIndexes) {
        if (adamantAnswersIndexes === undefined || adamantAnswersIndexes === null) return adamantAnswersIndexes;
        return arrayExpanded.whichElementNotInclude(arrayExpanded.boundToArray(adamantAnswersIndexes), this.getCorrectAnswerAsIndexes())

    }

    checkIsAnswerCorrectByIndexes(adamantIndexesOfAnswers) {
        let cAdamantIndexesOfAnswers = arrayExpanded.boundToArray(adamantIndexesOfAnswers);
        if (!arrayExpanded.areAllAliveArrays(this._correctAnswersIndexes, cAdamantIndexesOfAnswers)) return false;
        let mappedEachIndex = new Map();
        let allCorrect = true;

        let actuallyIndexes = this.getCorrectAnswerAsIndexes();
        let missed = this.checkMissedAnswersByIndexes(cAdamantIndexesOfAnswers);
        let points = this.getTotalPointsForIndexes(cAdamantIndexesOfAnswers);
        cAdamantIndexesOfAnswers.forEach(
            (indexAsValue) => {
                let valid = actuallyIndexes.indexOf(indexAsValue);
                if (valid < 0) {
                    mappedEachIndex.set(indexAsValue, false);
                    allCorrect = false;
                } else
                    mappedEachIndex.set(indexAsValue, true);
            }
        );
        return [Object.fromEntries(mappedEachIndex), allCorrect, missed, points];
    }

    checkIsAnswerCorrectByValue(adamantValuesOfAnswers) {
        if (!arrayExpanded.areAllAliveArrays([this._correctAnswersIndexes, adamantValuesOfAnswers])) return false;
        let adamantIndexes = arrayExpanded.mapValuesToIndexes(this._answers, adamantValuesOfAnswers);
        return this.checkIsAnswerCorrectByIndexes(adamantIndexes);
    }
    getCorrectAnswerAsIndexes() {

        return this._correctAnswersIndexes;
    }

    getCorrectAnswerAsValues() {
        return Array.from(this.getCorrectAnswer().values());
    }
    getJustElementOfAnswersByIndex(index) {
        return this._answers[index];
    }
    getNumberOfAnswers() {
        return this._answers.length;
    }
    getNumberOfCorrectAnswer() {
        return this._correctAnswersIndexes.length;
    }
    isSingleAnswerCorrect() {
        if (!arrayExpanded.isAliveArray(this._correctAnswersIndexes)) throw new Error("there is no correct answer is defined");

        return this._correctAnswersIndexes.length === 1 ? true : false;
    }

    mapPointsToCorrectAnswers(points) {
        if (!arrayExpanded.areAllAliveArrays([this._answers, this._correctAnswersIndexes]))
            throw new Error('there is no answers to map points with them');
        if (!arrayExpanded.areAllValuesNumerical(points))
            throw new Error('all values of points must be numerical');

        let cPoints = arrayExpanded.boundToArray(points);
        let indexesOfCorrect = this.getCorrectAnswerAsIndexes();
        if (indexesOfCorrect.length === 1) {
            this._points[indexesOfCorrect[0]] = cPoints[0];
            return;
        }
        arrayExpanded.appendValuesInSpecifyIndexes(this._points, Array.from(indexesOfCorrect), cPoints, this._defaultPoint);

    }

    mapPointToJustOneSpecificIndex(point, index) {
        if (!arrayExpanded.isAliveArray(this._answers))
            throw new Error('there is no answers to map point with');
        if ((!point && point !== 0) || !(arrayExpanded.isAliveArray(point)))
            throw new Error(`invalid args. : input args must be exist(there are values populate in them) `);
        if ((arrayExpanded.isAliveArray(point) && !arrayExpanded.areAllValuesNumerical(point[0])) ||
            !(arrayExpanded.areAllValuesNumerical(point)))

            throw new Error('all values of points must be numerical');

        let cPoint = point,
            cIndex = index;

        if (Array.isArray(point))
            cPoint = point[0];
        if (Array.isArray(index))
            cIndex = index[0];

        if (!arrayExpanded.checkValidIndex(this.getAnswers(), cIndex))
            throw new Error(`index is out of bound to answers`);

        this._points[cIndex] = cPoint;

    }
    mapPointsToNonCorrectAnswers(points) {
        if (!arrayExpanded.isAliveArray(this._answers))
            throw new Error('there is no answers to map point with');
        if (!arrayExpanded.isAliveArray(points))
            throw new Error(`invalid args. : input args must be exist(there are values populate in them) `);
        if (!arrayExpanded.areAllValuesNumerical(points))
            throw new Error('all values of points must be numerical');

        this.appendValuesInSpecifyIndexes(this._points, Array.from(this.getIndexesOfNonCorrectAnswers()), arrayExpanded.boundToArray(points), this._defaultPoint);

    }
    mapPointsToAllAnswersByIndexes(points, indexes) {
        if (!arrayExpanded.isAliveArray(this._answers))
            throw new Error('there is no answers to map point with');
        if (!arrayExpanded.isAliveArray(points))
            throw new Error(`invalid args. : input args must be exist(there are values populate in them) `);
        if (!arrayExpanded.areAllValuesNumerical(points))
            throw new Error('all values of points must be numerical');

        if (!indexes && indexes !== 0) {
            var indexes = this.getIndexesOfAllAnswers();
        } else {
            if (!arrayExpanded.areValidIndexesToDealWith(this.getAnswers(), indexes, true))
                throw new Error(`out of bound indexes`);
        }
        arrayExpanded.appendValuesInSpecifyIndexes(this._points, arrayExpanded.boundToArray(indexes), arrayExpanded.boundToArray(points), this._defaultPoint);


    }


    getDefaultValueOfPoint() {
        return this._defaultPoint;
    }

    mapAllIndexesToCorrectAnswersAsBool() {

        return arrayExpanded.mapToBool(this._answers, this._correctAnswersIndexes);
    }

    getAllDataForCreator() {
        return {
            numberOfAnswers: this.getNumberOfAnswers(),
            onlyOneCorrect: this.isSingleAnswerCorrect(),
            answers: this.getAnswers(), // ['abcd','xyz','row'] [0,1,2]
            indicesOfAnswers: this.getIndexesOfAllAnswers(),

            correctAnswers: Object.fromEntries(this.getCorrectAnswer()),
            correctAnswersIndices: this.getCorrectAnswerAsIndexes(),
            correctAnswersValues: this.getCorrectAnswerAsValues(),
            indicesOfNonCorrectAnswers: this.getIndexesOfNonCorrectAnswers(),
            // [0,1,0]
            points: this.getAllPoints(),
            defaultPoint: this.getDefaultValueOfPoint(),
            pointsForCorrectAnswers: this.getPointsForCorrectAnswers(),
            //[1]
            pointsForNonCorrectAnswers: this.getPointsForNonCorrectAnswers(),
            //[0,0]// dataQCreate['table'] = [['xyz',false,0],['abc',true,1],['row',false,0]]
            table: arrayExpanded.margeRelativeInRow(this._answers, this._points, this.mapAllIndexesToCorrectAnswersAsBool())
        };

    }
    getAllDataForApplication() {
        return {
            numberOfAnswers: this.getNumberOfAnswers(), // number
            answers: this.getAnswers(), // ['a', 'aakdjflkad' ,'adf']
            indicesOfAnswers: this.getIndexesOfAllAnswers() // []
        }

    }
    static createAnswers(answers = [], correctAnswerIndexes = [], points = [], defaultValueForPoint = 0) {
            /* if (!Array.isArray(answers))
                 throw new Error("answers must be Array entry");


             let answerValues = [...new Set(answers)];

             let cCorrectAnswerIndexes = Array.from(correctAnswerIndexes);

             if (!arrayExpanded.areValidIndexesToDealWith(answerValues, cCorrectAnswerIndexes, true)) {

                 throw new Error("indexes are out of bounded");
             }
             let answersOjb = null;
             if (Array.isArray(points))
                 answersOjb = new this(Array.from(answerValues), Array.from(correctAnswerIndexes), type, points, defaultValueForPoint);
             else {

                 answersOjb = new this(Array.from(answerValues), Array.from(correctAnswerIndexes), type, [], defaultValueForPoint);
                 answersOjb.mapPointsToCorrectAnswers(points);

             }
             return answersOjb;
             */
        }
        // call (,,,) not []
    static margeAnswersModules(modules) {
        if (!arrayExpanded.isAliveArray(modules)) return null;

        let initIndex = 0;
        while (!modules[initIndex] instanceof Answers && initIndex < modules.length)
            initIndex++;

        if (initIndex >= modules.length)
            return null;

        let mergedModule = Answers.createAnswers(modules[initIndex].getAnswers(),
            modules[initIndex].getCorrectAnswerAsIndexes(),
            "merged", [],
            module[initIndex].getDefaultValueOfPoint());


        for (let i = initIndex + 1; i < modules.length; i++) {
            if (modules[i] instanceof Answers) {
                let correctAnswersToAppend = modules[i].getCorrectAnswerAsValues();

                mergedModule.appendAnswers(modules[i].getAnswers());

                let indexes = arrayExpanded.mapValuesToIndexes(mergedModule.getAnswers(), correctAnswersToAppend);


                mergedModule.AppendIndexesOFCorrectAnswer(indexes);

            }
        }
        return mergedModule;
    }
    static checkTogether(modules, mappedAnswerAsIndexes) {
        try {
            if (!arrayExpanded.equivalentArraysLength([modules, mappedAnswerAsIndexes])) return;
            let allChecked = [];
            for (const i in modules) {
                if (modules[i] instanceof Answers) {

                    mappedAnswerAsIndexes[i] = arrayExpanded.boundToArray(mappedAnswerAsIndexes[i]);

                    allChecked.push(modules[i].checkIsAnswerCorrectByIndexes(mappedAnswerAsIndexes[i]));

                }

            }
            return allChecked;
        } catch (error) {
            throw error;
        }
    }
    static sumAllPointsForModules(answerModules) {
        let sum = 0
        for (const answer of answerModules) {
            if (answer instanceof Answers)
                sum += answer.getTotalPointsForAllIndexes();
        }
        return sum;
    }

}