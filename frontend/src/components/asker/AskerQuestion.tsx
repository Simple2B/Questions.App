import React, { useEffect, useState } from "react";
import { IAnswer } from "../../types/answerTypes";
import { IQuestion } from "../../types/questionTypes";

interface IAskerQuestionProps {
  question: IQuestion;
}

export const AskerQuestion: React.FC<IAskerQuestionProps> = ({ question }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const styles = showAnswers
    ? "asker__answers asker__answers_active"
    : "asker__answers";
  const answerComponents = question.answers_list.map((a) => {
    return (
      <div className="answers_info">
        <div className="answers_author">Author {a.answerer_id}:</div>
        <div className="answers_text">{a.answer_text}</div>
      </div>
    );
  });

  return (
    <div className="asker_questions">
      <div
        className="asker_question"
        onClick={() => {
          setShowAnswers((prev) => !prev);
        }}
      >
        <p className="asker_question-header">{question.question_text}</p>
        <p className="asker_question-amount">{question.answers_list.length}</p>
      </div>
      <div className={styles}>{answerComponents}</div>
    </div>
  );
};
