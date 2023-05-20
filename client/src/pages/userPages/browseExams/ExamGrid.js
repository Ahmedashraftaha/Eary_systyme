import React from "react";
import ExamCard from "./ExamCard";

function ExamGrid({ exams }) {
  return (
    <div className="exam-grid">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
}

export default ExamGrid;
