import { useState } from 'react';
import axios from 'axios';
import { getAuthUser } from '../../../../helper/Storage';
import { useNavigate } from 'react-router-dom';

const CreateExam = () => {
  const auth = getAuthUser();
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
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
      const examData = [
        {
          header,
          description,
          duration_mins: duration,
          difficultly: difficulty,
          total_score: totalScore,
        },
      ];
  
      const response = await axios.post('http://localhost:4000/api/exams/manage', examData, {
        headers: {
          token: auth.token,
        },
      });
  
      setSuccessMessage(response.data.message);
      setHeader('');
      setDescription('');
      setDuration('');
      setDifficulty('');
      setTotalScore('');
      navigate('/manage-exam');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Create Exam</h1>
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
          <select id="difficulty" className="form-select" value={difficulty} onChange={handleDifficultyChange} required>
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
        <button type="submit" className="btn btn-primary">Create Exam</button>
      </form>
    </div>
  );
};

export default CreateExam;