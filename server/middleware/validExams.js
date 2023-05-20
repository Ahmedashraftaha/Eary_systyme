const validations = require('./global-validations');
const ExamDB = require('../db-model/exam-db');
const  QuestionDB= require('../db-model/question-db');

const validExam = async (req,res,nxt)=>{
    if(!validations.isNumber(req.examId))
        res.status(403).json({msg : "INVALID EXAM ID : ID must be numerical value"});
    else{
        const [valid,invalid,allValid] = await ExamDB.validExams(req.userId,req.examId);
  
    if(!allValid){
    res.status(403).json({msg : "you have input invalid exam(s)","valid" : valid ,"invalid" : invalid});
    }else{
       // req.validExamId = req.idExam;
        nxt();
    }
}
}
const validQuestion = async (req,res,nxt) =>{
    if(!validations.isNumber(req.questionId))
    res.status(403).json({msg : "INVALID QUESTION ID: ID must be numerical value"});
    else{
 
    const isValidQuestion =await ExamDB.validQuestion(req.examId,req.questionId);
    
  if(!isValidQuestion){
    res.status(403).json({msg : "you have input invalid question(s)","exam_id" : req.examId , "question_id" : req.questionId});
  }else{
   // req.validQuestion = req.questionId;
    nxt()
  }
}

}
const validExamToView = async(req,res,nxt) => {
    if(!validations.isNumber(req.examId)){
    res.status(403).json({msg : "INVALID EXAM ID : ID must be numerical value"});
    }else{
    const valid = await ExamDB.validActivatedExam(req.examId);
    if(!valid){
        res.status(403).json({msg : "you'r trying to get doesn't exist exam (s)","exam_id" : req.examId });
    }else{
        nxt();
    }
}
}



module.exports = {
    validExam,
    validQuestion,
    validExamToView,
    
};
