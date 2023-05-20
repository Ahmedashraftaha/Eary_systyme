import React from "react";
import "./style/ExamCard.css"

function ExamCard({ exam }) {
  return (
    <div className="exam-card">
      <div className="exam-card-title">{exam.title}</div>
      <div className="exam-card-description">{exam.description}</div>
      <div className="exam-card-details">
        <div className="exam-card-duration">Duration: {exam.duration}</div>
        <div className="exam-card-questions">
          Questions: {exam.questions.length}
        </div>
      </div>
    </div>
  );
}

export default ExamCard;
