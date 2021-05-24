import React, { useEffect, useState } from "react";
import { IQuestion } from "../../types/questionTypes";
import { AnswererForm } from "./AnswerForm";
import "./answerer.css";
import { questions_ws } from "../../socket";
import { io } from "socket.io-client";

export const Answerer = () => {
  const [formIsActive, setFormIsActive] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<IQuestion[]>([]);
  const [answId, setAnswId] = useState("");

  useEffect(() => {
    const answers_ws = io("/answers");
    answers_ws.on("connect", () => {
      setAnswId(answers_ws.id);
    });

    questions_ws.on("connect", () => {
      questions_ws.send(`User ${questions_ws.id} has connected`);
    });

    questions_ws.on("create_question_success", () => {
      questions_ws.emit("get_active_questions");
    });

    questions_ws.on("asker_leave", () => {
      questions_ws.emit("get_active_questions");
    });

    questions_ws.on("success_active_questions", (resp) => {
      if (resp.status === "success") {
        setActiveQuestions(resp.data);
        console.log(resp.data);
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
          <div className="answer__username">{answId}</div>
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
