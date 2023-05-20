const MySql = require('./db');
const objExpanded = require('../util/Helper-methods/expand-obj');
const { log } = require('console');

module.exports = class AnswersDB {
        constructor() {
            if (this instanceof AnswersDB) {
                throw new Error('A static class cannot be instantiated');
            }
        }
        static async saveAnswers(questions = [], firstIdInserted) {
            let finalResult = {'errorExistIn':[]};
            let keysAndColumns = ['id_question', 'answer_index', 'answer', 'is_correct', 'point'];
            for (const i in questions) {
                const currentId = +firstIdInserted + +i;
                if (!AnswersDB.appendIdForEachAnswer(questions[i], (currentId))) {
                    finalResult[currentId] = {'error' : `INVALID QUESTION : question ID(${currentId}})have no answer plz insert any answer to this question to view it or that question will be like never existed`,
                                'id':currentId,'commandToDeleteThatQuestion':undefined };
                    finalResult['errorExistIn'].push(currentId);            
                    continue;
                }
                let lastIndex = await AnswersDB.getLastIndexOfAnswers(questions[i]['id_question']);

                if (lastIndex > 0) lastIndex++;

                objExpanded.appendObjToObjsWithFunction(questions[i]['answers'], {
                    'answer_index': lastIndex
                }, {
                    'answer_index': objExpanded.adder
                });
                const result = await MySql.bulkInsert('answers', questions[i]['answers'], keysAndColumns, keysAndColumns);
                if(result['error'])
                   finalResult['errorExistIn'].push(currentId);

                finalResult[currentId] = result;
            }
            return finalResult;
        }
        static appendIdForEachAnswer(question, id) {
            if (question['answers']) {
                objExpanded.appendAttrValToObjsArr(question['answers'], 'id_question', id);
                return true;
            }
            return false;
        }
        static async getAnswersWithCorrectAnswer(questions) {
          //  let ids = objExpanded.getAllDataAttr(questions,'question_id');
            for(let i in questions){
            let selectCommand = `SELECT answer_index,answer,is_correct,point,modified_at FROM answers WHERE id_question = ?`;
            
            const [answerObjs] = await MySql.pool.query(selectCommand, [questions[i].question_id]);
            console.log(answerObjs);
            let answers = objExpanded.mergeInOneShotAnswer(answerObjs);
            questions[i].answers = answers;
            console.log(answers[0]);
            }
        }
        
        static async getAnswersWithoutCorrectAnswer(questionId) {
            let selectCommand = `SELECT answer_index,answer FROM answers WHERE id_question = ?`
            const [answerObjs] = await MySql.pool.query(selectCommand, [questionId]);
            return {
                questionId: answerObjs
            };
        }
        static async getAnswersWithWhetherCorr(questionId, IS_CORRECT = 1) {
            let command = `SELECT * FROM answers WHERE id_question =? AND  is_correct = ?`
            const [answerObjs] = await MySql.pool.query(command, [questionId, IS_CORRECT]);
            return answerObjs;
        }
        static async updateAnswers(examId, questionId, indicesObj,resultForTrace) {
            let finalResult = {};

            try {

                const result = await MySql.validForeignKey('questions', 'question_id',questionId,'id_exam', examId);
                if (!result){
                    
                    return { 'INVALID_QUESTION': [examId, questionId, Object.keys(indicesObj)] };
                }
                const indices = Object.keys(indicesObj);
                for (const index of indices) {

                    let alteredAttrs = Object.keys(indicesObj[index]);
                    finalResult[questionId] = await MySql.update('answers', indicesObj[index], alteredAttrs, alteredAttrs,
                        `id_question = ${questionId} AND answer_index = ${index}`,index);

                        if(finalResult[questionId]['error']){
                       
                            resultForTrace[questionId] = resultForTrace[questionId] || [];
                            resultForTrace[questionId].push(index);
                        }
                    
                }
                
                return finalResult;
            } catch (invalid) {
                return { 'INVALID_QUESTION': [examId, questionId, Object.keys(indicesObj)] };
            }
        }
        static async deleteAnswers(questionId, indicesArr) {
            const result = await MySql.deleteByArr('answers', `id_question = ${questionId}`, 'answer_index', indicesArr);
            return result;
        }

        static async getLastIndexOfAnswers(questionId) {
            let maxIndexCommand = `SELECT max(answer_index) FROM answers WHERE id_question = ?`;
            let [maxIndex] = await MySql.pool.query(maxIndexCommand, [questionId]);
            const index = maxIndex[0]['max(answer_index)'];
            if (!(index)) return 0;
            return index;
        }

    }
    /*
            let questions = [{
                    'id': 3,
                    'answers': [{
                        'questionId': 3,
                        'answerValue': 'm',
                        'isCorrect': 1,
                        'point': 123
                    }, {
                        'questionId': 3,
                        'answerValue': 'mmmmmmmmmmmmmmmmm',
                        'isCorrect': 1,
                        'point': 123
                    }, {
                        'questionId': 3,
                        'answerValue': 'mmmmm',
                        'isCorrect': 1,
                        'point': 123
                    }],
                    'state': 0
                },

                {
                    'id': 2,
                    'answers': [{
                            'questionId': 2,
                            'answerValue': 'b',
                            'isCorrect': 1,
                            'point': 0
                        },
                        {
                            'questionId': 2,
                            'answerValue': 'bbb',
                            'isCorrect': 1,
                            'point': 123
                        },
                        {
                            'questionId': 2,
                            'answerValue': 'bbbbbbbbbbbbbb',
                            'isCorrect': 0,
                            'point': 0
                        }
                    ],
                    'state': 1
                }
            ]
            let indicesObj = {
                // q_id = 
                1: {
                    answer: 'new answer',
                    is_correct: false,
                    point: 999
                },
                2: {
                    answer: 'new answer2 index 2',
                    is_correct: false,
                    point: 888
                }
            }
            */