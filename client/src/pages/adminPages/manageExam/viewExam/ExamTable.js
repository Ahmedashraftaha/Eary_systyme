import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/ExamTable.css';
import { getAuthUser } from '../../../../helper/Storage';

const ExamTable = () => {
  // Define exam data as an array of objects
  const auth = getAuthUser();
  const [exams, setExams] = useState([]);

  // Use the useEffect hook to fetch exam data from the server
  useEffect(() => {
    axios.get('http://localhost:4000/api/exams/manage',{
      headers: {
        token: auth.token,
      },
    }).then(response => {
      setExams(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error('Error fetching exam data:', error);
    });
  }, [auth.token]);

  // Define a function to handle creating a new exam
  const handleCreateExam = () => {
    // TODO: Implement logic for creating a new exam
  };

  // Define a function to handle deleting an exam
  const handleDeleteExam = (examId) => {
    axios.delete(`http://localhost:4000/api/exams/manage/questions/${examId}`, {
      headers: {
        token: auth.token,
      },
    }).then(response => {
      setExams(exams.filter(exam => exam.exam_id !== examId));
      console.log(response.data);
    }).catch(error => {
      console.error('Error deleting exam:', error);
    });
  };

  return (
    <div>
      <h2>Exam Table</h2>
      <Link to={"create"} className="btn btn-success" onClick={handleCreateExam}>Create Exam</Link>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Duration</th>
            <th>Description</th>
            <th>State</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index}>
              <td><Link to={`/manage-exam/${exam.exam_id}`}>{exam.header}</Link></td>
              <td>{exam.difficultly}</td>
              <td>{exam.duration_mins}</td>
              <td>{exam.description}</td>
              <td>{exam.state}</td>
              <td>{exam.created_at}</td>
              <td>
                <Link to={`/manage-exam/update-exam/${exam.exam_id}`} className="btn btn-primary">Update</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteExam(exam.exam_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;