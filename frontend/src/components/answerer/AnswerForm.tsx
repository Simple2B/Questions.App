import React, { useState } from "react";
import { IQuestion } from "../../types/questionTypes";

interface IAnswerFormProps {
  question: IQuestion;
}

export const AnswererForm: React.FC<IAnswerFormProps> = ({ question }) => {
  const [status, setStatus] = useState(false);
  const answerBtnStyles = status
    ? "askme__btn item-group__btn"
    : "askme__btn item-group__btn item-group__btn_active";
  const answerFormStyles = !status
    ? "item-group__answer-form"
    : "item-group__answer-form item-group__answer-form_active";
  return (
    <div className="item-group answer__item-group">
      <div className="item-group__header">
        <div className="item-group__title">{question.question_text}</div>
        <div className="item-group__time">
          {new Date(question.created_at).toLocaleTimeString()}
        </div>
      </div>
      <div className="item-group__content">
        <button
          className={answerBtnStyles}
          onClick={() => setStatus((prev) => !prev)}
        >
          Answer question
        </button>
        <div className={answerFormStyles}>
          <div className="input-group input-group_text">
            <textarea
              id="answerText"
              className="item-group__form-input"
              placeholder="Write your answer here"
            ></textarea>
            <button className="askme__btn submit-btn">Answer</button>
          </div>
          <div className="input-group">
            <button
              className="askme__btn dismiss-btn"
              onClick={() => setStatus((prev) => !prev)}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
