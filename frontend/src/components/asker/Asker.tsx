import { Socket } from "socket.io-client";
import React, { useState } from "react";
import { questions_ws } from "../../socket";
import "./asker.css";
import { IQuestion } from "../../types/questionTypes";

interface IAnswererProps {
  questions: IQuestion[];
}

export const Asker = ({ questions }: IAnswererProps) => {
  const [question, setQuestion] = useState("");

  const handleCreateQuestion = () => {
    const resp = {
      session: questions_ws.id,
      question: question,
    };
    if (question) questions_ws.emit("create_question", resp);
  };
  const question_components = questions
    .filter((q) => q.session_id === questions_ws.id)
    .map((question) => (
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
    // <div className="answer position-absolute top-50 start-50 translate-middle shadow-sm p-3 mb-5 bg-body rounded">
    <div className="asker">
      <form className="asker__form">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ask your question"
            aria-label="Ask your question"
            aria-describedby="button-addon2"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
          <button
            className="btn btn-success"
            type="button"
            id="button-addon2"
            onClick={handleCreateQuestion}
          >
            Ask
          </button>
        </div>
      </form>
      <div className="answer">{question_components}</div>
      {/* <span>Total number of replies: {questions.length}</span> */}
    </div>
  );
};
