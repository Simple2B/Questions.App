import React, { useEffect, useState } from "react";
import { IQuestion } from "../../types/questionTypes";
import { AnswererForm } from "./AnswerForm";
import "./answerer.css";
import { questions_ws, answers_ws } from "../../socket";

export const Answerer = () => {
  const [formIsActive, setFormIsActive] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState([]);

  useEffect(() => {
    answers_ws.connect();

    answers_ws.on("connect", () => {
      answers_ws.send(`User ${answers_ws.id} has connected`);
    });

    questions_ws.on("success_active_questions", (resp) => {
      if (resp.status === "success") {
        setActiveQuestions(resp.data);
      }
    });

    questions_ws.on("question_create_success", (resp) => {
      questions_ws.emit("get_active_questions");
      console.log(resp);
    });

    questions_ws.emit("get_active_questions");
    return () => {
      answers_ws.disconnect();
    };
  }, []);

  const question_components = activeQuestions.map((question) => (
    <AnswererForm question={question} />
  ));

  return (
    // <div className="answer translate-middle shadow-sm p-3 mb-5 bg-body rounded">
    <div className="answer">
      <div className="answer__header">
        <div className="answer_header-row">
          <div className="answer__window-title">Answerer window</div>
          <div className="answer__username">Current answerer</div>
        </div>
        <div className="answer_header-row">
          <div className="answer__question-count">
            Active questions: <b>{activeQuestions.length}</b>
          </div>
        </div>
      </div>
      <div className="answer__content">{question_components}</div>
    </div>
  );
};
