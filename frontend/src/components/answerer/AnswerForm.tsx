import React, { ChangeEvent, useEffect, useState } from "react";
import { IQuestion } from "../../types/questionTypes";
import { IAnswer } from "../../types/answerTypes";
import { questions_ws } from "../../socket";
import moment from "moment";

interface IAnswerFormProps {
  question: IQuestion;
}

export const AnswererForm: React.FC<IAnswerFormProps> = ({ question }) => {
  const [status, setStatus] = useState(false);
  const [answerText, setAnswerText] = useState<string>("");

  const answerBtnStyles = status
    ? "askme__btn item-group__btn"
    : "askme__btn item-group__btn item-group__btn_active";
  const answerFormStyles = !status
    ? "item-group__answer-form"
    : "item-group__answer-form item-group__answer-form_active";

  const setAnswerHandler = () => {
    if (answerText !== "" && answerText.length > 3) {
      const answer: IAnswer = {
        question_id: question.id,
        answer_text: answerText,
        answerer_id: 3,
      };
      questions_ws.emit("add_answer", answer);
      setAnswerText("");
    } else {
      alert("Answer can not be empty!");
    }
  };

  useEffect(() => {
    questions_ws.on("answer_created", () => {
      questions_ws.emit("get_active_questions");
    });
  }, []);

  return (
    <div className="item-group answer__item-group" key={question.id}>
      <div className="item-group__header">
        <div className="item-group__header-top">
          <div className="item-group__title">{question.question_text}</div>
          <div className="item-group__time">
            {moment(question.created_at).fromNow()}
          </div>
        </div>
        <div className="item-group__header-bottom">
          Number of answers: {question.answers_list.length}
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
              value={answerText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setAnswerText(e.target.value);
              }}
            ></textarea>
            <button
              className="askme__btn submit-btn"
              onClick={setAnswerHandler}
            >
              Answer
            </button>
          </div>
          <div className="input-group">
            <button
              className="askme__btn dismiss-btn"
              onClick={() => {
                setStatus((prev) => !prev);
                setAnswerText("");
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
