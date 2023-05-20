const express = require('express');
const appExamRouter = express.Router();
const ExamDB = require('../../db-model/exam-db');
const QuestionDB = require('../../db-model/question-db');
const {validExam,validQuestion,validExamToView} = require('../../middleware/validExams');

appExamRouter.route("/")
.all((req, res, nxt) => {
    console.log('in route of the applicators');
    nxt();
})
.get(async(req, res) => {
    const exams = await ExamDB.getStateExams(["ACTIVITED"]);
    res.status(200).json(exams);
})

appExamRouter.route("/take/:idExam")
.all((req,res,nxt) =>{
    req.examId = req.params.idExam;
    nxt();
},validExamToView)
.get( async(req, res) => {
    try {
        
       console.log("here in deep");
        const questionsWithoutAnswers = await QuestionDB.getQuestionsWithCorrectAnswers(req.params.idExam);

        console.log(questionsWithoutAnswers);
        res.status(200).json(questionsWithoutAnswers);
    } catch (error) {
        res.status(403).json({});
    }
})
.post(async(req, res) => {
res.status(200).json({});
});


appExamRouter.get("/take/:examId/questions/:questionId",async(req, res) => {
    try {
        console.log(req.params.questionId,req.params.examId);
        console.log("----------------------");
      
        const justQuestionWithAnswers = await QuestionDB.getJustQuestionWithoutCorrectAnswers(req.params.examId, req.params.questionId);

        console.log(justQuestionWithAnswers);
        console.log("in more in");
        res.status(200).json(justQuestionWithAnswers);
    } catch (error) {
        res.status(403).json({});
    }
});
appExamRouter.get("/questions/:questionId/answers", async(req, res) => {
    try {
        const answersWithoutCorrectlyOnes = await QuestionDB.getAnswersWithoutCorrectAnswer(req.params.questionId);
        res.status(200).json(answersWithoutCorrectlyOnes);
    } catch (error) {
        res.status(403).json([]);

    }
});
module.exports = appExamRouter;