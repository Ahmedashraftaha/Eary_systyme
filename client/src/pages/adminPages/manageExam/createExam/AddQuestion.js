// 
import React, { useState } from 'react';
import axios from 'axios';

import { getAuthUser } from '../../../../helper/Storage';

const AddQuestion = ({ setQuestions, onClose , id }) => {
  // Get the exam ID from the URL params
  const auth = getAuthUser();
console.log(`this my id ${id}`);
  // Define question data as an object
  const [question, setQuestion] = useState({
    type: 'MCQ-Single888',
    header: '',
    description: '',
    state: 'ACTIVE',
    rank: 0,
    file_path: '',
    default_point:0,
    answers: [
      { answer: '', is_correct: 0, point: 0 },
      { answer: '', is_correct: 0, point: 0 },
      { answer: '', is_correct: 0, point: 0 },
    ],
  });

  // Define a function to handle form submissions
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Make a POST request to add the question to the server
//     axios.post(`http://localhost:4000/api/exams/manage/questions/${id}`, question, {
//       headers: {
//         token: auth.token,
//       },
//     })
//     .then(response => {
//       console.log(response.data);
//       setQuestions(prevQuestions => [...prevQuestions, response.data]);
//       // Reset the form
//       setQuestion({
//         type: 'MCQ-Single888',
//         header: '',
//         description: '',
//         state: 'ACTIVE',
//         rank: 0,
//         file_path: '',
//         answers: [
//           { answer: '', is_correct: 0, point: 0 },
//           { answer: '', is_correct: 0, point: 0 },
//           { answer: '', is_correct: 0, point: 0 },
//         ],
//       });
//       onClose();
//     })
//     .catch(error => {
//       console.error('Error adding question:', error);
//     });
//   };
const handleSubmit = (event) => {
    event.preventDefault();
    // Create an array with a single question object
    const questionArray = [question];
    // Make a POST request to add the questions to the server
    axios.post(`http://localhost:4000/api/exams/manage/questions/${id}`, questionArray, {
      headers: {
        token: auth.token,
      },
    })
    .then(response => {
      console.log(response.data);
      const responseData = Array.isArray(response.data) ? response.data : [response.data];
      setQuestions(prevQuestions => [...prevQuestions, ...responseData]);
      // Reset the form
      setQuestion({
        type: 'MCQ-Single888',
        header: '',
        description: '',
        state: 'ACTIVE',
        rank: 0,
        file_path: '',
        answers: [
          { answer: '', is_correct: 0, point: 0 },
          { answer: '', is_correct: 0, point: 0 },
          { answer: '', is_correct: 0, point: 0 },
        ],
      });
      onClose();
    })
    .catch(error => {
      console.error('Error adding question:', error);
    });
  };
  // Define a function to handle form input changes
  const handleChange = (event) => {
    if (event.target.name.startsWith('answer')) {
      // If the input is for an answer, update the answer array in the question object
      const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
      const updatedAnswers = [...question.answers];
      updatedAnswers[answerIndex].answer = event.target.value;
      setQuestion({
        ...question,
        answers: updatedAnswers,
      });
    } else if (event.target.name.startsWith('is_correct')) {
      // If the input is for an is_correct field, update the corresponding answer object in the question object
      const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
      const updatedAnswers = [...question.answers];
      updatedAnswers[answerIndex].is_correct = event.target.checked ? 1 : 0;
      setQuestion({
        ...question,
        answers: updatedAnswers,
      });
    } else if (event.target.name.startsWith('point')) {
      // If the input is for a point field, update the corresponding answer object in the question object
      const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
      const updatedAnswers = [...question.answers];
      updatedAnswers[answerIndex].point = parseInt(event.target.value);
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
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Question</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="header" className="form-label">Header</label>
                <input type="text" className="form-control" id="header" name="header" value={question.header} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={question.description} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <select className="form-select" id="state" name="state" value={question.state} onChange={handleChange} required>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="rank" className="form-label">Rank</label>
                <input type="number" className="form-control" id="rank" name="rank" value={question.rank} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="file_path" className="form-label">File Path</label>
                <input type="text" className="form-control" id="file_path" name="file_path" value={question.file_path} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Answers</label>
              
                {question.answers.map((answer, index) => (
                  <div key={index} className="form-check">
                    <input className="form-check-input" type="checkbox" id={`is_correct_${index}`} name={`is_correct_${index}`} checked={answer.is_correct === 1} onChange={handleChange} />
                    <input type="text" className="form-control d-inline-block ms-2" id={`answer_${index}`} name={`answer_${index}`} value={answer.answer} onChange={handleChange} required />
                    <input type="number" className="form-control d-inline-block ms-2" style={{ width: '100px' }} id={`point_${index}`} name={`point_${index}`} value={answer.point} onChange={handleChange} required />
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddQuestion;
// import axios from 'axios';

// import { getAuthUser } from '../../../../helper/Storage';

// const AddQuestion = ({ setQuestions, onClose , id }) => {
//   // Get the exam ID from the URL params
//   const auth = getAuthUser();
// console.log(`this my id ${id}`);
//   // Define question data as an object
//   const [question, setQuestion] = useState({
//     type: 'MCQ-Single888',
//     header: '',
//     description: '',
//     state: 'ACTIVE',
//     rank: 0,
//     file_path: '',
//     default_point:0,
//     answers: [
//       { answer: '', is_correct: 0, point: 0 },
//       { answer: '', is_correct: 0, point: 0 },
//       { answer: '', is_correct: 0, point: 0 },
//     ],
//   });

//   // Define a function to handle form submissions
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     // Make a POST request to add the question to the server
// //     axios.post(`http://localhost:4000/api/exams/manage/questions/${id}`, question, {
// //       headers: {
// //         token: auth.token,
// //       },
// //     })
// //     .then(response => {
// //       console.log(response.data);
// //       setQuestions(prevQuestions => [...prevQuestions, response.data]);
// //       // Reset the form
// //       setQuestion({
// //         type: 'MCQ-Single888',
// //         header: '',
// //         description: '',
// //         state: 'ACTIVE',
// //         rank: 0,
// //         file_path: '',
// //         answers: [
// //           { answer: '', is_correct: 0, point: 0 },
// //           { answer: '', is_correct: 0, point: 0 },
// //           { answer: '', is_correct: 0, point: 0 },
// //         ],
// //       });
// //       onClose();
// //     })
// //     .catch(error => {
// //       console.error('Error adding question:', error);
// //     });
// //   };
// const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     // Convert file_path to a file and append it to FormData
//     const fileInput = document.getElementById('file_path');
//     if (fileInput.files.length > 0) {
//       formData.append('file', fileInput.files[0]);
//     }
//     // Append the rest of the question data to FormData
//     formData.append('type', question.type);
//     formData.append('header', question.header);
//     formData.append('description', question.description);
//     formData.append('state', question.state);
//     formData.append('rank', question.rank);
//     formData.append('default_point', question.default_point);
//     formData.append('answers', JSON.stringify(question.answers));
//     console.log(formData);
//     // Make a POST request to add the question to the server
//     axios.post(`http://localhost:4000/api/exams/manage/questions/${id}`, [formData.FormData], {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         token: auth.token,
//       },
//     })
//     .then(response => {
//       console.log(response.data);
//       setQuestions(prevQuestions => [...prevQuestions, response.data]);
//       // Reset the form
//       setQuestion({
//         type: 'MCQ-Single888',
//         header: '',
//         description: '',
//         state: 'ACTIVE',
//         rank: 0,
//         file_path: '',
//         answers: [
//           { answer: '', is_correct: 0, point: 0 },
//           { answer: '', is_correct: 0, point: 0 },
//           { answer: '', is_correct: 0, point: 0 },
//         ],
//       });
//       onClose();
//     })
//     .catch(error => {
//       console.error('Error adding question:', error);
//     });
//   };
//   // Define a function to handle form input changes
//   const handleChange = (event) => {
//     if (event.target.name.startsWith('answer')) {
//       // If the input is for an answer, update the answer array in the question object
//       const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
//       const updatedAnswers = [...question.answers];
//       updatedAnswers[answerIndex].answer = event.target.value;
//       setQuestion({
//         ...question,
//         answers: updatedAnswers,
//       });
//     } else if (event.target.name.startsWith('is_correct')) {
//       // If the input is for an is_correct field, update the corresponding answer object in the question object
//       const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
//       const updatedAnswers = [...question.answers];
//       updatedAnswers[answerIndex].is_correct = event.target.checked ? 1 : 0;
//       setQuestion({
//         ...question,
//         answers: updatedAnswers,
//       });
//     } else if (event.target.name.startsWith('point')) {
//       // If the input is for a point field, update the corresponding answer object in the question object
//       const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
//       const updatedAnswers = [...question.answers];
//       updatedAnswers[answerIndex].point = parseInt(event.target.value);
//       setQuestion({
//         ...question,
//         answers: updatedAnswers,
//       });
//     } else {
//       // If the input is not for an answer, update the question object as usual
//       setQuestion({
//         ...question,
//         [event.target.name]: event.target.value,
//       });
//     }
//   };

//   return (
//     <div className="modal show d-block">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add Question</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label htmlFor="header" className="form-label">Header</label>
//                 <input type="text" className="form-control" id="header" name="header" value={question.header} onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description</label>
//                 <textarea className="form-control" id="description" name="description" value={question.description} onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="state" className="form-label">State</label>
//                 <select className="form-select" id="state" name="state" value={question.state} onChange={handleChange} required>
//                   <option value="ACTIVE">Active</option>
//                   <option value="INACTIVE">Inactive</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="rank" className="form-label">Rank</label>
//                 <input type="number" className="form-control" id="rank" name="rank" value={question.rank} onChange={handleChange} required />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="file_path" className="form-label">File Path</label>
//                 <input type="file" className="form-control" id="file_path" name="file_path" value={question.file_path} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Answers</label>
              
//                 {question.answers.map((answer, index) => (
//                   <div key={index} className="form-check">
//                     <input className="form-check-input" type="checkbox" id={`is_correct_${index}`} name={`is_correct_${index}`} checked={answer.is_correct === 1} onChange={handleChange} />
//                     <input type="text" className="form-control d-inline-block ms-2" id={`answer_${index}`} name={`answer_${index}`} value={answer.answer} onChange={handleChange} required />
//                     <input type="number" className="form-control d-inline-block ms-2" style={{ width: '100px' }} id={`point_${index}`} name={`point_${index}`} value={answer.point} onChange={handleChange} required />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
//               <button type="submit" className="btn btn-primary">Save</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddQuestion;