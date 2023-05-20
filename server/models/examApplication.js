const Exam = require('./exam'); // this class intentionaly made for interactive
// status ->
// creation process :
// InCreation || post || pending || accepted || published ->admin //state
// taken process:
// started || pending||  || interactive|| inProgress|| complete -> user //requestState
const actionStates = require('./enums/examActionState');
const arrayExpanded = require('../util/Helper-methods/expand-array');
const jsonPowerful = require('../util/Helper-methods/powerful-json');
const Exam = require('./exam');
const TraceExam = require('./logsForExamApp');
const ExamSettings = require('./ExamSettings');
module.exports = class ExamApp extends Exam {
    constructor(Questions, durationInMins, totalScore, idCreator, state) {
        super(Questions, durationInMins, totalScore, idCreator);
        this._stateForCreator = "published";
        this._setting = new ExamSettings();
    }

    getAllDataForCreator() {
        super.getAllDataForCreator();
    }

    getAllDataForApplication(idForIdentity, TypeOfIdentity) {

            return super.getAllDataForApplication()
        }
        //state, startedTime, totalTimeLeft, restOFScore, cumulativeScore, Questions, duration, totalScore, idCreator
}