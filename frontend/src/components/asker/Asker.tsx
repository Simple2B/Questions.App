import { Socket } from "socket.io-client";
import React, { useState } from "react";
import "./asker.css";

interface IAnswererProps {
  socket: Socket;
}

export const Asker = ({ socket }: IAnswererProps) => {
  const [question, setQuestion] = useState("");

  const handleCreateQuestion = () => {
    const resp = {
      session: socket.id,
      question: question,
    };
    if (question) socket.emit("create_question", resp);
  };

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

      {/* <span>Total number of replies: {questions.length}</span> */}
    </div>
  );
};
