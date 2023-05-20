// correctlyAnswered **unAnswered مهم** wrongAnswered 
// required || optional
// whoCreated || clone -: which exam have the same question
// 
const jsonPowerful = require('../util/Helper-methods/powerful-json');
const Answers = require('./answers');
const arrayExpanded = require('../util/Helper-methods/expand-array');

module.exports = class Question extends Answers {
    //initializing = false;
    static ids = 0;
    constructor(idCreator, header, description, type, rank, answers, indicesOfCorrectAnswers, points, defaultValueForPoint, file, icon, dataOfCreation = new Date(), lastModification = new Date(), active = true) {
        super(answers, indicesOfCorrectAnswers, type, points, defaultValueForPoint);
        //  if (!this.initializing)
        //    throw new Error(`The constructor is private, please use createQuestion() or any alternative see the Readme for answer module.`);
        this._id = idForAllQuestions++;
        this._header = header;
        this._description = description;
        this._rank = rank;
        this._dateOfCreation = dataOfCreation;
        this._lastModification = lastModification;
        this._idForCreatorOP = idCreator;
        this._type = type;
        this._file = file; // .mp3 .mp4a
        this._icon = icon; // image.extension -> jpg 
        this._active = active;
        //this._monitors = ;
        //this._permissions = ;
        // this._label = require // optional;
        //initializing = false;
    }

    getIdCreator() {
        return this._idForCreatorOP;
    }
    getHeader() {
        return this._header;
    }
    setHeader(header) {
        this._header = header;
    }
    getId() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    getDescription() {
        return this._description;
    }
    setDescription(description) {
        this._description = description;
    }
    getRank() {
        return this._rank;
    }
    setRank(rank) {
        this._rank = rank;
    }
    getIcon() {

        return this._icon;
    }
    setIcon(icon) {
        this._icon = icon;
    }
    getDateOFCreation() {
        return this._dateOfCreation;
    }
    getLastModification() {
        return this._lastModification;
    }
    setLastModification(date) {
        if (!date)
            this._lastModification = new Date();
        this._lastModification = date;
    }

    getFile() {
        return this._file;
    }
    setFile(file) {
        this._file = file;
    }
    setActive(bool) {
        this._active = bool;
    }
    turnOn() {
        this._active = true;
    }
    turnOf() {
        this._active = false;
    }
    isActive() {
        return active ? true : false;
    }
    appendDataQuestionToDataObj(objData) {
        objData['id'] = this.getId();
        objData['type'] = this.getType();
        objData['header'] = this.getHeader(); // string (50)
        objData['description'] = this.getDescription(); // string(320)
        objData['rank'] = this.getRank(); // number()
        objData['createdAt'] = this.getDateOFCreation(); // date
        objData['lastModification'] = this.getLastModification(); // date 
        objData['icon'] = this.getIcon(); // img
        objData['file'] = this.getFile(); // file type is audio
        objData['active'] = this.isActive(); //bool true or false // always true for applicator
        return objData;
    }

    getAllDataForCreator() {
        let data = super.getAllDataForCreator();
        this.appendDataQuestionToDataObj(data);
        return data;

    }

    getAllDataForApplication() {
        if (!this.isActive())
            return {};
        let data = super.getAllDataForApplication();
        this.appendDataQuestionToDataObj(data);
        return data;
    }
    checkIsAnswerCorrectByIndexes() {

    }
    getType() {
        return this._type;
    }
    setType(type) {
        this._type = type;
    }

    clone() {
        return new Question(this._idForCreatorOP, this._header, this._description, this._type, this._rank, this._answers, this._correctAnswersIndexes, this._points, this._defaultPoint, this._file, this._icon);
    }
    static clone(question) {
        return new Question(question._idForCreator, question._header, question._description, question._type, question._rank, question._answers, question._correctAnswersIndexes, question._points, question._defaultPoint, question._file, question._icon);

    }
    static getQuestionById(arrayOfQuestions, id) {
        const objComparison = { _id: id };
        return arrayExpanded.indexOfByAttrsValues(arrayOfQuestions, objComparison);
    }
    static setQuestionsToInactive(arrayOfQuestions) {
        for (const question of arrayOfQuestions) {
            if (question instanceof Question) {
                question.turnOf();
            }
        }
    }
    static lookUpForQuestion(arrayOfQuestions, comparisonObj) {
        return arrayExpanded.indexOfByAttrsValues(arrayOfQuestions, comparisonObj);
    }
    static getDataForApplication(arrayOfQuestions) {
        let data = [];
        for (const question of arrayOfQuestions) {
            data.push(question.getAllDataForApplication());
        }
        return data;
    }
    static getDataForCreator(arrayOfQuestions) {
        let data = [];
        for (const question of arrayOfQuestions) {
            data.push(question.getAllDataForCreator());
        }
        return data;
    }
    static checkTogether(modules, answersIndices) {

        super.checkTogether(modules, answersIndices);
    }


}