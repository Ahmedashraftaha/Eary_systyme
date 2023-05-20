const TraceExam = require('./logsForExamApp');
const actionStates = require('./enums/examActionState');
const arrayExpanded = require('../util/Helper-methods/expand-array');
const jsonPowerful = require('../util/Helper-methods/powerful-json');

module.exports = class ExamSettings extends TraceExam {
    constructor(ids, identitiesTypes, actions, actionsInfo, timeForActions,
        allowInstancesApplication = 10, allowToLeftWithoutCount = true, timeAllowForLeftInMins = 420) {
        super(ids, identitiesTypes, actions, actionsInfo, timeForActions);
        this._noAllowedInstancesApplication = allowInstancesApplication;
        this._isAllowToLeftWithoutCount = allowToLeftWithoutCount;
        this._timeAllowForLeftInMins = timeAllowForLeftInMins;
    }
    setTraceExam(examsIdsTaken, examsScores, examsState, startTimeDurations, endTimeDurations) {
        this._tracer = new TraceExam(examsIdsTaken, examsScores, examsState, startTimeDurations, endTimeDurations);
    }
    setTimeAllowForLeftInMins(timeInMins) {
        this._timeAllowForLeftInMins = timeInMins;
    }
    setAllowToLeftWithoutCount(bool) {
        this._isAllowToLeftWithoutCount = bool;
    }
    setNumberAllowInstancesApplication(NoInstances) {
        this._noAllowedInstancesApplication = NoInstances;
    }
    getTimeAllowForLeftInMins() {
        return this._timeAllowForLeftInMins;
    }
    IsAllowsToLeftWithoutCount() {
        return this._isAllowToLeftWithoutCount;
    }

    getNumberOfAllowsInstancesApplication() {
        return this._noAllowedInstancesApplication;
    }

    // wholeActivity
    getAnsweredQuestions() {
        this.identityInteractive()
    }
    getTimesFinished(id) {
        let [started, ended] = this.identityTakenFullTimesToFinish(id);
        if (!started.length)
            return [];
        //noOfNotMappedValues
        let timesUntilFinished = arrayExpanded.getTimesDifference(started, ended);
        if (timesUntilFinished.length % 2 !== 0) {
            // not finished
        }


    }
    getAllData() {
        // return {, , }
    }

}