import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthUser } from '../../../../helper/Storage';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExam = () => {
  const auth = getAuthUser();
  const { examId } = useParams();
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficultly, setDifficulty] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/exams/manage/${examId}`, {
      headers: {
        token: auth.token,
      },
    })
      .then(response => {
        const exam = response.data[0];
        console.log(exam)
        setHeader(exam.header);
        setDescription(exam.description);
        setDuration(exam.duration_mins);
        setDifficulty(exam.difficultly);
        setTotalScore(exam.total_score);
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });
  }, [auth.token, examId]);

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleTotalScoreChange = (event) => {
    setTotalScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const examData = {
        header,
        description,
        duration_mins: duration,
        difficultly,
        total_score: totalScore,
      };
      const exam=[examData]

      const response = await axios.put(`http://localhost:4000/api/exams/manage/${examId}`, exam, {
        headers: {
          token: auth.token,
        },
      });

      setSuccessMessage(response.data.message);
      navigate('/manage-exam');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Update Exam</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={header}
            onChange={handleHeaderChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration (in minutes):</label>
          <input
            type="number"
            id="duration"
            className="form-control"
            value={duration}
            onChange={handleDurationChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label">Difficulty:</label>
          <select id="difficulty" className="form-select" value={difficultly} onChange={handleDifficultyChange} required>
            <option value="">Select difficulty level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="totalScore" className="form-label">Total Score:</label>
          <input
            type="number"
            id="totalScore"
            className="form-control"
            value={totalScore}
            onChange={handleTotalScoreChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Exam</button>
      </form>
    </div>
  );
};

export default UpdateExam;