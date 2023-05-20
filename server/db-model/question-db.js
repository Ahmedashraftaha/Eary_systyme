const MySql = require('./db');
const AnswersDB = require('./answers-db');

const  objExpanded  = require('../util/Helper-methods/expand-obj');

module.exports = class QuestionDB extends AnswersDB {
        constructor() {
            if (this instanceof QuestionDB) {
                throw new Error('A static class cannot be instantiated');
            }
        }

        static async savaQuestions(examId,questions = []) {
            //'id_exam', in next feature  and i will use Object.keys() and i will not sent the 3rd param in insert
            let keysAndColumnsWithoutAnswers = [ 'id_exam','type', 'header', 'description',
                'state', 'rank', 'file_path', 'icon_path', 'default_point'
            ];

            objExpanded.appendAttrValToObjsArr(questions,"id_exam",examId);

            const savingQuestionsResult = await MySql.bulkInsert('questions', questions, keysAndColumnsWithoutAnswers, keysAndColumnsWithoutAnswers);
         
            const savingAnswersResult = await QuestionDB.saveAnswers(questions,savingQuestionsResult["insertedIdFrom"]);
         
            let existError = false;
            if(savingAnswersResult['error'] || savingQuestionsResult['error'])
            existError = true;

            return {"errorExistInInsertingQuestions" :existError,"questions" : savingQuestionsResult,
              "answers" : savingAnswersResult};
        }

     
   
  
        static async getStatesQuestionsWithCorrectAnswers(examId, state) {
          
            const [result] = await MySql.pool.query(`SELECT *, GROUP_CONCAT('[',answers.answer_index,',' ,'"',answers.answer,'"',',',answers.is_correct,',',answers.point,',','"',answers.modified_at,'"' ,']')AS answers from questions JOIN answers ON answers.id_question=questions.question_id AND questions.id_exam = ${examId}  GROUP by questions.question_id;`);
            console.log(res);
            return this.prettyAnswers(result);
        }

        static async getStatesQuestionsWithoutCorrectAnswers(examId, state) {
            
            const [result] = await MySql.pool.query(`SELECT *, GROUP_CONCAT('[',answers.answer_index,',' ,'"',answers.answer,'"',']')AS answers
            from questions JOIN answers ON  questions.id_exam = ? AND answers.id_question=questions.question_id  GROUP by questions.question_id;`, [examId]);
           
                return this.prettyAnswers(result);
        }


        static async getQuestionsWithCorrectAnswers(examId) {
            const [questions]  = await MySql.pool.query('SELECT * from questions where id_exam = ?;',examId);
            console.log("here");
            console.log(questions);
            await QuestionDB.getAnswersWithCorrectAnswer(questions);
                 console.log(questions);
            return questions;
        }
        
        static async getQuestionsWithoutCorrectAnswers(examId, state) {
        
            const [result] = await MySql.pool.query(`SELECT *, GROUP_CONCAT('[',answers.answer_index,',' ,'"',answers.answer,'"',']')AS answers
        from questions JOIN answers ON  questions.id_exam = ? AND questions.state = ? AND answers.id_question=questions.question_id  GROUP by questions.question_id;`, [examId, state]);
            return this.prettyAnswers(result);
        }
        static async getJustQuestionWithCorrectAnswers(examId, questionId) {

            let command = `SELECT * ,GROUP_CONCAT( '[',answers.answer_index ,',','"',answers.answer,'"',',',answers.is_correct,',',answers.point,',','"',answers.modified_at,'"',']') AS answers
         FROM questions JOIN answers ON answers.id_question=questions.question_id AND questions.id_exam = ? AND questions.question_id = ? GROUP BY questions.question_id`;
            const [result] = await MySql.pool.query(command, [examId, questionId]);
            return this.prettyAnswers(result);
        }
        static async prettyAnswers(questions) {

            for (const question of questions) {
                delete question['id_question'];
                delete question['answer'];
                delete question['answer_index'];
                delete question['point'];
                delete question['is_correct'];
                delete question['modified_at'];
                question['answers'] = "[" + question.answers + "]";
                question['answers'] = JSON.parse(question['answers']);
            }
            return questions;
        }
   
        static async getJustQuestionWithoutCorrectAnswers(examId, questionId) {
            try {
                let command = `SELECT * ,GROUP_CONCAT( '[',answers.answer_index ,',','"',answers.answer,'"',']') AS answers FROM questions JOIN answers ON answers.id_question=questions.question_id AND questions.id_exam = ? AND questions.question_id = ? GROUP BY questions.question_id`;
                const [result] = await MySql.pool.query(command, [examId, questionId]);
                const question = this.prettyAnswers(result);
                return question;
            } catch (error) {
                throw error;
            }
        }

        static async updateQuestions(examId, questions) {
            let finalResult = {'errorExistInUpdatingQuestions' : []};
            for (const question of questions) {

                const questionId = QuestionDB.processQuestionData(question);

                finalResult[questionId] = finalResult[questionId] || [];
           
                await QuestionDB.updateAnswersWithQuestion(examId, questionId, question, finalResult);
                //[id_exam ,type , header,description,state	,rank,file_path	,icon_path	,default_point,created_at	,actived_at	,modified_at	]

                let keysAndColumns = Object.keys(question);

                const result = {};
                result[examId] = await MySql.update('questions', question, keysAndColumns, keysAndColumns, `question_id = ${questionId} AND id_exam = ${examId} `,questionId);
          
                if(result[examId]['error'])
                finalResult['errorExistInUpdatingQuestions'].push(questionId);

                finalResult[questionId].push(result);
            }
            return finalResult;
        }

        static async deleteQuestion(examId, questionIds) {
            const result = await MySql.deleteByArr('questions', `id_exam = ${examId}`, 'question_id', questionIds);
            return result;
        }
        static processQuestionData(question) {
            const questionId = question.question_id || question.id;
            //const examId = question.id_exam || question.examId;
            delete question.question_id;
            delete question.id;
            delete question.exam_id;
            delete question.id_exam;
            delete question.examId;
            return questionId;
        }
        static async updateAnswersWithQuestion(exam_id, questionId, question, finalResult) {
            if (question.answers) {
                let result  ={};
                let resultAnswers = await QuestionDB.updateAnswers(exam_id,questionId, question.answers,result);
                finalResult[questionId].push({
                    answers: resultAnswers
                });
                if(!objExpanded.isEmptyObject(result))
                finalResult['errorExistInUpdatingQuestions'].push(result);
                delete question.answers;
            } else {
                finalResult[questionId].push({ answers: {'info' : "there is no answers has been sent"} });
            }
        }

    }
    /*
    let questions = [{
            'question_id': 8,
            'id_exam': 2,
            'type': 'MCQ-Single888',
            'header': 'what did888 you expect ?',
            'description': 'here i8888t is what it is',
            'state': 'ACTIVE',
            'rank': 8,
            'file_path': '.mp3',
            'icon_path': '.img',
            'default_point': 55,
            'answers': [{
                'answer': 'm8',
                'is_correct': 0,
                'point': 888
            }, {

                'answer': 'mmmmmmmmm88mmmmmmmm',
                'is_correct': 0,
                'point': 88
            }, {

                'answer': 'mmm88mm',
                'is_correct': 1,
                'point': 123
            }],

        },
        {
            'question_id': 11,
            'id_exam': 3,
            'type': 'MCQ_SINGLE 11',
            'header': 'what did you expect from that point ? 11',
            'description': '11focus on the target to get the correct answers',
            'state': 'ACTIVE',
            'rank': 2,
            'file_path': 'a1.mp3',
            'icon_path': 'c111.img',
            'default_point': 9311,
            'answers': [{

                'answer': 'm1111111111111',
                'is_correct': 1,
                'point': 123
            }, {

                'answer': 'mmmmmmmmmmmmmm1111111111mmm',
                'is_correct': 1,
                'point': 123
            }, {
                'answer': '1111111111mm11mmm',
                'is_correct': 1,
                'point': 123
            }],

        },
    ]
    let questionUpdate = [{
            // q_id = 
            question_id: 11,
            type: '1111111111MC1111QMCQMCQ',
            header: 'its11 new head',
            answers: {
                1: {
                    answer: 'new11 answer',
                    is_correct: false,
                    point: 999
                },
                2: {
                    answer: 'new a11nswer2 index 2',
                    is_correct: false,
                    point: 11
                }
            }
        }, {
            question_id: 9,
            type: 'MCQMCQMCQ9',
            header: 'its new head9',
            description: 'new dec 9',
            answers: {
                1: {
                    answer: 'new answer9',
                    is_correct: false,
                    point: 999
                },
                2: {
                    answer: 'new answer2999999 index 2',
                    is_correct: false,
                    point: 888
                },
                3: {
                    answer: 'new 3',
                    is_correct: 1,
                    point: 1231
                }
            }
        }


    ]
    let test = async() => {
        //  const result1 = await QuestionDB.getJustQuestionWithCorrectAnswers(2, 3);
        // const result2 = await QuestionDB.getAnswersWithCorrectAnswer(1);
        // await QuestionDB.getAnswersWithoutCorrectAnswer(1);
        // const result3 = await QuestionDB.deleteQuestion(2, [6, 7]);
        const result4 = await QuestionDB.updateQuestions(2, questionUpdate);
        return result4;
    }
    let test2 = async() => {
        const result4 = await test();

        console.log(JSON.stringify(result4));

    }


    console.time();
    test2();
    console.timeEnd();*/