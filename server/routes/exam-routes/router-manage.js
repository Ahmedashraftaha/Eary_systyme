const { log } = require("console");
const express = require("express");

const manageExamRouter = express.Router();

const ExamDB = require("../../db-model/exam-db");
const QuestionDB = require('../../db-model/question-db');
const Exam = require("../../models/exam");
const {validExam,validQuestion} = require("../../middleware/validExams");
const upload = require("../../middleware/uploadaudio")
// don't forget you have to set the id admin when you validate in db by just one quick line
//                                               req.body.adminId = id(FROM DB)


manageExamRouter.route("/questions/:idExam/edit/:questionId")
.all((req,res,nxt) => {
req.examId = req.params.idExam;
req.questionId = req.params.questionId;
nxt();
},validExam,validQuestion)
.get(async (req,res)=>{
    const result = await QuestionDB.getJustQuestionWithCorrectAnswers(req.examId,req.questionId);
    res.status(200).json(result);
})
.put(async (req,res) =>{
    req.body[0].question_id = req.questionId; 
const result = await QuestionDB.updateQuestions(req.examId, req.body); 
if(result.errorExistInUpdatingQuestions)
res.status(400).json(result);
else
res.status(200).json(result);
})
.delete(async (req,res) =>{
     const questionId= [req.questionId];
     const result = await QuestionDB.deleteQuestion(req.examId,questionId);
     if(result.error)
     res.status(400).json(result);
     else
     res.status(200).json(result);
})
    

manageExamRouter.route("/questions/:idExam")
.all((req,res,nxt) => {
req.examId = req.params.idExam;
console.log("here");
nxt();
},validExam)
.get(async (req,res)=>{
    const result = await QuestionDB.getQuestionsWithCorrectAnswers(req.examId);
    res.status(200).json(result);
})
.post(upload.single('file_path'),async (req,res) =>{
    const result = await QuestionDB.savaQuestions(req.examId,req.body);
    if(result.errorExistInInsertingQuestions)
    res.status(400).json(result);
    else
    res.status(200).json(result);
})





manageExamRouter.route("/:idExam")
.all((req,res,nxt) =>{
req.examId = req.params.idExam;
nxt();
},validExam)
.put(async(req,res) =>{
    console.log("putting");
    req.body[0].exam_id = req.examId;
   const result  = await ExamDB.updateExams(req.userId,req.body);
   if(result.errorExistInUpdatingQuestions)
   res.status(400).json(result);
   else
   res.status(200).json(result);
})
.get(async (req,res) => {
const exam = await ExamDB.getJustExam(req.userId,req.examId);
res.status(200).json(exam);
})
.delete(async (req,res) =>{
     const result = await ExamDB.deleteJustOneExam(req.userId,req.examId);
     if(result.error)
     res.status(400).json(result);
     else
     res.status(200).json(result);
})






manageExamRouter.route("/")
    .all((req, res, nxt) => {
        nxt();
    })
    .post(async(req, res) => {
        const result = await ExamDB.saveExams(req.userId, req.body);
        res.status(200).send(result);
    })
    .get(async(req, res) => {
        try {
            const questions = await ExamDB.getExamsForCreator(req.userId);

            res.status(200).json(questions);
        } catch (err) {
            res.status(403).json({ "msg": "error in get all exams for creator" });
        }
    })
 


    module.exports = manageExamRouter;

// manageExamRouter.route("/")
//     .all((req, res, nxt) => {
//         console.log('in manage');
//         nxt();
//     })
    
//     .post(async(req, res) => {
//         //                                      replace with after edit req.body.adminId`
        
//         const result = await ExamDB.saveExams(req.creatorId, req.body);

//         res.status(200).send(result);
 
//     }).get(async(req, res) => {
//         // pay your intention here you have to enter the id of id creator before we go 
//         try{
//         const questions = await ExamDB.getExamsForCreator(req.creatorId);
//         res.status(200).json({questions,"msg":"get all exams for creator"});
//         }
//         catch(err){
//             res.status(500).json({"msg":"error in get all exams for creator"});
//         }
//     })
// module.exports = manageExamRouter;
/*
manageExamRouter.route(":id")
    .all((req, res, nxt) => {
        //if(req.valid == 1)
        console.log(`you are in exam route and you trying to manipulates data on id : ${req.params.id}`);
        nxt();
    })
    .get(async(req, res) => {
        // pay your intention here you have to enter the id of id creator before we go 

        const questions = await ExamDB.getExamsForCreator(Number(req.params.id));
        res.status(200).json(questions);
    })
    .put(async(req, res) => {
        // pay your intention here you have to enter the id of id creator before we go 

        let exams = [{
                'exam_id': 3,
                'header': 'abcd',
                'duration_mins': 113,
                'difficultly': 'ea112sy',
                'total_score': 1
            },
            {
                'exam_id': 4,
                'header': 'akdfjdlkf',
                'duration_mins': 2113333,
                'difficultly': 'ha1321rd',
                'total_score': 2
            },
            {
                'exam_id': 5,
                'duration_mins': 1123,
                'difficultly': 'd123',
                'total_score': 123
            },
            {
                'exam_id': 6,
                'duration_mins': 144,
                'difficultly': 'ea132sy',
                'total_score': 4
            }
        ]
        console.log(req.body);
        const result = await ExamDB.updateExams(2, req.body);
        res.status(200).json(result);
    })
    .delete(async(req, res) => {
        // pay your intention here you have to enter the id of id creator before we go 
        const result = await ExamDB.deleteExams(2, req.params.id);
        res.status(200).json(result);
    });

manageExamRouter.route("")
    .post
    .post
    .get
    .get

manageExamRouter.param("id", (req, res, nxt, val) => {
    console.log(`in examRouter.param ${req.method}   ${req.url}`);
    if (isNaN(val))
        return res.status(403).send("id must be numerical value");

    req.id = val;
    nxt();
});
manageExamRouter.route("/:id")
    .all((req, res, nxt) => {
        console.log(`in all examRouter.route(:/d) ${req.method}  ${req.url}`);
        nxt();
    })
    .get((req, res) => {
        const index = exams.findIndex((val) => req.params.id == val.id);

        if (index !== -1) {
            res.json(exams[index]);
        } else {
            res.status(403).send("invalid id to get");
        }
    })
    .put((req, res) => {
        const index = exams.findIndex((val) => val.id == req.params.id);
        if (index !== -1) {
            for (i in req.body) {
                exams[index][i] = req.body[i];
            }
            res.status(200).json(exams[index]);
        } else {
            res.status(403).send("invalid id to put");

        }
    })
    .delete((req, res) => {
        const index = exams.findIndex((val) => req.id == val.id);
        if (index !== -1) {
            exams.splice(index, 1);
            res.status(200).json(exams);
        } else {
            res.send(403).send("invalid id to delete");
        }
    });

8/ */
