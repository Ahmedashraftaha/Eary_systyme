   // status ->
   // creation process :
   // InCreation || post || pending || accepted || published ->admin
   // taken process:
   // started || pending||  || interactive|| inProgress|| complete -> user
   const arrayExpanded = require('../util/Helper-methods/expand-array');
   const Question = require('./question');
   module.exports = class Exam {
       static ids = 0; // 
       constructor(questions, durationInMins, totalScore, difficultly, idCreator, state = false) {
           this._totalScore = totalScore;
           if (this.areQuestionsPointsApplyTotalScore(questions)) {
               this._totalScore = undefined;
               throw new Error(`invalid questions exceed the total score rather than apply it -> totalScore(${totalScore}) < questionScore()`);
           }
           this._id = ids++;
           this._questions = questions;
           this._durationInMins = durationInMins;
           this._difficultly = difficultly;
           this._totalScore = totalScore;
           this._state = state;
           this._createdAt = new Date();
           this._modifiedAt = new Date();
           this._idCreator = idCreator;
       }
       json() {

           fetch('/api/exams/id')
           objExam['questions'] = [];
           let objAnswers = {}
           objAnswers['answers'] = [{ 'idQ': 'index' }, { '1': 3 }, { '100': 4 }, { '1200': 2 }]
           objAnswers['durationInMis'] = 30;


           objQ['header'] = 'a';
           objQ['rank'] = 1;
           // push in question array
           obj['questions'].push(objQ);
           objJustQ = {}

           JSON.stringify({
               'questions': [
                   { 'header': 'head', 'rank': 1 },
                   { 'header': 'head', 'rank': 1 },

                   { 'header': 'head', 'rank': 1 },

                   { 'header': 'head', 'rank': 1 }
               ],
               'durationInMins': 30,
               'totalScore': score || 100,
               'difficulty': difficulty || 'mid'
           });
       }
       appendNewQuestions(question) {
           if (this.areQuestionsPointsApplyTotalScore()) {;
               this._questions.push(question);
               return true;
           }
           return false;
       }
       deleteQuestionById(id) {
           let index = Question.getQuestionById(this._questions, id);
           this.deleteQuestionByIndex(index);
       }
       deleteQuestionByIndex(index) {
           this._questions.splice(index, 1);
       }


       areQuestionsPointsApplyTotalScore() {
           if (this._totalScore <= Question.sumAllPointsForModules(this._questions))
               return true;
           return false;
       }
       getTimeLeft(time) {
           return this._durationInMins - time;
       }
       getCreatorId() {
           return this._idCreator;
       }
       getDifficulty() {
           return this._difficultly;
       }
       setDifficulty(difficultly) {
           this._difficultly = difficultly;
       }
       appendDataExamToDataObj(objData) {
           objData['id'] = this._id;
           objData['durationInMins'] = this._durationInMins;
           objData['totalScore'] = this._totalScore;
           objData['difficultly'] = this._difficultly;
           objData['creatorId'] = this._idCreator;
           return objData;
       }
       getAllDataForCreator() {
           let data = {
               //[{table:[['xyz',true,1],['abcd',,]] ,header:'a'},{table: header:},{table:[[],[],[]] header:},{}]
               questions: Question.getDataForCreator(this._questions)
           };
           this.appendDataExamToDataObj(data);
           return data;
       }
       getAllDataForApplication() {
           let data = {
               //  [['header':'adf','answers':['a','z'] ,indicesAnswer :[0,1] ],[],[],[]]
               questions: Question.getDataForApplication(this._questions)
           };
           this.appendDataExamToDataObj(data);
           return data;
       }


   }