import { Link, useParams } from "react-router-dom";
import { getAuthUser } from "../../../../helper/Storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddQuestion from "../createExam/AddQuestion";

const ExamDetails = () => {
  // Get the exam ID from the URL params
  const { id } = useParams();
  const auth = getAuthUser();

  // Define question data as an array
  const [questions, setQuestions] = useState([]);

  // Define a state variable to control whether the AddQuestion modal is shown
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  // Use the useEffect hook to fetch question data from the server
  useEffect(() => {
    axios.get(`http://localhost:4000/api/exams/manage/questions/${id}`,{
      headers: {
        token: auth.token,
      }
    })
    .then(response => {
      setQuestions(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching question data:', error);
    });
  }, [auth.token, id]);

  const handleDeleteQuestion = (questionId) => {
    axios.delete(`http://localhost:4000/api/exams/manage/questions/${id}/edit/${questionId}`, {
      headers: {
        token: auth.token,
      },
    })
    .then(response => {
      // Remove the deleted question from the questions array
      setQuestions(prevQuestions => prevQuestions.filter(question => question.question_id !== questionId));
    })
    .catch(error => {
      console.error('Error deleting question:', error);
    });
  };

  return (
    <div className="container">
      <h2>Exam Details</h2>
      <button type="button" className="btn btn-primary mb-3" onClick={() => setShowAddQuestionModal(true)}>Add Question</button>
      <ul className="list-group">
        {questions.map(question => (
          <li key={question.question_id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3>{question.header}</h3>
              <p>{question.description}</p>
              {Array.isArray(question.answers) && (
                <ul>
                  {question.answers.map(answer => (
                    <li key={answer.answer}>
                      {answer[1]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <Link to={`/manage-exam/${id}/edit-question/${question.question_id}`}>
                <FaEdit className="me-2" />
              </Link>
              <FaTrash onClick={() => handleDeleteQuestion(question.question_id)} />
            </div>
          </li>
        ))}
      </ul>
      {showAddQuestionModal && <AddQuestion id={id} setQuestions={setQuestions} onClose={() => setShowAddQuestionModal(false)} />}
    </div>
  );
};

export default ExamDetails;