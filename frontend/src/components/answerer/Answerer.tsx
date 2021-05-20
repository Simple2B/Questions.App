import React, { useState } from "react";
import { IQuestion } from "../../types/questionTypes";
import "./answerer.css";

interface IAnswererProps {
  questions: Array<IQuestion>;
}

export const Answerer = ({ questions }: IAnswererProps) => {
  const question_components = questions.map((question) => (
    <div className="answer__container" key={question.id}>
      <span>{question.question_text}</span>
      <div className="button_block">
        <button className="answer__button">Submit answer</button>
        <div>
          <span>{new Date(question.created_at).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  ));
  return (
    // <div className="answer translate-middle shadow-sm p-3 mb-5 bg-body rounded">
    <div className="answer">
      <p>Answerer window</p>
      {question_components}
    </div>
  );
};
