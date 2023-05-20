import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../../../../helper/Storage';

const EditQuestion = () => {
  // Get the question ID from the URL params
  const { id, Examid } = useParams();
  const auth = getAuthUser();

  // Define question data as an object
  const [question, setQuestion] = useState({});

  // Use the useEffect hook to fetch question data from the server
  useEffect(() => {
    axios.get(`http://localhost:4000/api/exams/manage/questions/${Examid}/edit/${id}`, {
      headers: {
        token: auth.token,
      }
    })
    .then(response => {
      setQuestion(response.data[0]);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching question data:', error);
    });
  }, [Examid, auth.token, id]);

  // Define a function to handle form submissions
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make a PUT request to update the question data on the server
    const questionData=[question]
    axios.put(`http://localhost:4000/api/exams/manage/questions/${Examid}/edit/${id}`, questionData, {
      headers: {
        token: auth.token,
      }
    })
    .then(response => {
      console.log(response.data);
      // Redirect to the exam details page
      window.location.href = `/exam-details/${question.exam_id}`;
    })
    .catch(error => {
      console.error('Error updating question data:', error);
    });
  };

  // Define a function to handle form input changes
  const handleChange = (event) => {
    if (event.target.name.startsWith('answer')) {
      // If the input is for an answer, update the answer array in the question object
      const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
      const updatedAnswers = [...question.answers];
      updatedAnswers[answerIndex][1] = event.target.value;
      setQuestion({
        ...question,
        answers: updatedAnswers,
      });
    } else {
      // If the input is not for an answer, update the question object as usual
      setQuestion({
        ...question,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div className="container">
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="header" className="form-label">Header</label>
          <input type="text" className="form-control" id="header" name="header" value={question.header || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" rows="3" value={question.description || ''} onChange={handleChange}></textarea>
        </div>
        {question.answers && question.answers.map((answer, index) => (
          <div className="mb-3" key={index}>
            <label htmlFor={`answer${index}`} className="form-label">{`Answer ${index + 1}`}</label>
            <input type="text" className="form-control" id={`answer${index}`} name={`answer${index}`} value={answer[1] || ''} onChange={handleChange} />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditQuestion;