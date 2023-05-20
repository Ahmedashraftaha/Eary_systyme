const arrayExpanded = require('../util/Helper-methods/expand-array');
const jsonPowerful = require('../util/Helper-methods/powerful-json');
const actionStates = require('./enums/examActionState');
module.exports = class TraceExamIdentity {
    constructor(examsIdsTaken, examsScores, examsState, startTimeDurations, endTimeDurations) {
        this._examsIdsTaken = examsIdsTaken || [];
        this._examsScores = examsScores || [];
        this._examsState = examsState || [];
        this._startTimeDurations = startTimeDurations || [];
        this._endTimeDurations = endTimeDurations || [];
    }
    appendTakenExam(idExam, started, ended = -1, score = -1, state) {
        if (!actionStates.hasOwnProperty(state))
            return false;
        this._examsState.push(state);
        this._examsIdsTaken.push(idExam);
        this._startTimeDurations.push(started);
        this._endTimeDurations.push(ended);
        this._examsScores.push(score);
        return true;

    }
    updateTakenExamInfo(idExam, stated, ended, score, state, index) {
        let indexEditing = this.getSpecificIndexExamById(idExam, index);
        if (indexEditing < 0 || !actionStates.hasOwnProperty(state))
            return false;
        this._endTimeDurations[indexEditing] = ended;
        this._examsScores[indexEditing] = score;
        this._examsState[indexEditing] = state;
        this._startTimeDurations[indexEditing] = stated;
        return true;
    }
    editState(idExam, state, index) {
        let indexEditing = this.getSpecificIndexExamById(idExam, index);
        if (indexEditing < 0 || !actionStates.hasOwnProperty(state))
            return false;
        this._examsState[indexEditing] = state;
        return true;
    }
    editEndedDuration(idExam, endTime, index) {
        let indexEditing = this.getSpecificIndexExamById(idExam, index);
        if (indexEditing < 0)
            return false;
        this._endTimeDurations[indexEditing] = endTime;
        return true;
    }
    editStartedDuration(idExam, startTime, index) {
        let indexEditing = this.getSpecificIndexExamById(idExam, index);
        if (indexEditing < 0)
            return false;
        this._startTimeDurations[indexEditing] = startTime;
        return true;
    }
    editDuration(idExam, startTime, endTime, index) {
        let indexEditing = this.getSpecificIndexExamById(idExam, index);
        if (indexEditing < 0)
            return false;
        this._startTimeDurations[indexEditing] = startTime;
        this._endTimeDurations[indexEditing] = endTime;
        return true;
    }


    editScore(idExam, score, index) {
        let indexEditing = this.getSpecificIndexExamById(idExam, index);
        if (indexEditing < 0)
            return false;
        this._examsScores[indexEditing] = score;
        return true;
    }
    getSpecificIndexExamById(idExam, index) {
        let bettorIndex = this._examsIdsTaken.indexOf(idExam);
        if (!this._examsIdsTaken.length || bettorIndex < 0) return -1;

        //***********************
        if (index === undefined || index === null)
            return bettorIndex;

        if (idExam === this._examsIdsTaken[index])
            return index;
        let indices = arrayExpanded.whereValueRepeated(this._examsIdsTaken, idExam);

        if (indices.length === 1)
            return indices[0];
        // ***********************
        return arrayExpanded.closestNumberToNumbers(indices, index);

    }
    deleteTakenExamInfo(idExam, index) {
        let indexDeleting = this.getSpecificIndexExamById(idExam, index);
        if (indexDeleting < 0)
            return false;
        this._endTimeDurations.splice(indexEditing, 1);
        this._examsScores.splice(indexEditing, 1);
        this._examsState.splice(indexEditing, 1);
        this._startTimeDurations.splice(indexEditing, 1);
        return true;
    }
    getAvgScore() {
        return arrayExpanded.average(this._examsScores);

    }
    getHighestScore() {
        return arrayExpanded.max(this._examsScores);
    }
    getLowestScore() {
            return arrayExpanded.min(this._examsScores);
        }
        //getRank() {
        //
        //}



    getAllData() {
        if (!this._examsIdsTaken.length)
            return {};
        return {

            table: arrayExpanded.margeRelativeInRow(
                this._examsIdsTaken,
                this._examsState,
                this._examsScores,
                this._startTimeDurations,
                this._endTimeDurations),
            indicesForIds: jsonPowerful.convertMapToObject(this.getRepeatedIdExams()),
            pendingExams: this.getExamsThatsPending(),
            inProcessExams: this.getExamsThatsInProgress(),
            interactiveExams: this.getExamsThatsComplete(),
            lastExam: this.getLastExamTaken(),
            avrScore: this.getAvgScore(),
            minScore: this.getLowestScore,
            maxScore: this.getHighestScore

        }

    }
    whereRepeatedExam(idExam) {
        return arrayExpanded.whereValueRepeated(idExam);
        //let indices = 
        /* if (!indices.length) return false;

         if (indices.length === 1)
             return true;
         else
             return false; */
    }
    getDataForJustExam(idExam) {
        if (!this._examsIdsTaken.length)
            return [];
        let indices = this.whereRepeatedExam(idExam);
        if (!indices.length)
            return [];

        let data = [];
        for (const index of indices) {
            data.push([
                this._examsIdsTaken[index],
                this._examsState[index],
                this._examsScores[index],
                this._startTimeDurations[index],
                this._endTimeDurations[index]
            ]);
        }
        return data;
    }


    getRepeatedIdExams() {
        return arrayExpanded.repeatedValues(this._examsIdsTaken);
    }
    getLastExamTaken() {
            return arrayExpanded.maxDate(this._startTimeDurations);
        }
        // status ->
        // InCreation || post || pending || accepted || published ->admin
        // started || pending||  || interactive|| inProgress|| complete -> user
    getExamWithState(state) {
        if (!this._examsIdsTaken.length || !actionStates.hasOwnProperty(state)) return [];

        let idsExamFound = [];
        for (const i in this._examsState) {
            if (this._startTimeDurations[i] === state) {
                idsExamFound.push(this._examsIdsTaken[i]);
            }
        }
        return idsExamFound;
    }

    getExamsThatsPending() {
        this.getExamWithState(actionStates.PENDING_LEFT);
    }
    getExamThatsInteractive() {
        this.getExamWithState(actionStates.INTERACTIVE);
    }
    getExamsThatsComplete() {
        this.getExamWithState(actionStates.COMPLETED);
    }
    getExamsThatsInProgress() {
        this.getExamWithState(actionStates.IN_PROGRESS);
    }
    getExamsThatsInProgress() {
        this.getExamWithState(actionStates.STARTED);
    }


}