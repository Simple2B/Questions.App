import React, { useEffect, useState } from "react";
import moment from "moment";
import { questions_ws } from "../../socket";
import { IQuestion } from "../../types/questionTypes";
import { IAnswer } from "../../types/answerTypes";
import "./asker.css";
import { AskerQuestion } from "./AskerQuestion";

interface IResponse {
  status: string;
  message: string;
  data: IQuestion[];
}
export const Asker = () => {
  const [question, setQuestion] = useState("");
  const [activeQuestions, setActiveQuestions] = useState<IQuestion[]>([]);

  const handleCreateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = {
      session: questions_ws.id,
      question: question,
    };
    if (question) questions_ws.emit("create_question", resp);
  };

  const question_components = activeQuestions.map((question) => (
    <AskerQuestion question={question} />
  ));

  useEffect(() => {
    questions_ws.on("create_question_success", (resp) => {
      questions_ws.emit("get_questions_by_session_id");
    });

    questions_ws.on("no_active_questions", (resp) => {
      setActiveQuestions([]);
    });
    questions_ws.on("success_get_questions_by_session_id", (resp) => {
      if (resp.status === "success") {
        setActiveQuestions(resp.data);
      }
    });
    questions_ws.on("answer_created", () => {
      questions_ws.emit("get_questions_by_session_id");
    });
  }, []);

  return (
    <div className="ask_block">
      <div className="ask_form">
        {/* <p>{questions_ws.id}</p> */}
        <form className="form" onSubmit={(e) => handleCreateQuestion(e)}>
          <input
            className="input"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
          <button className="ask_button">Ask</button>
        </form>
      </div>
      <div className="ask_select">
        <select className="ask_filter">
          <option>Filter</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
        <span>Total number of questions: {activeQuestions.length}</span>
      </div>
      <div className="asker_questions">{question_components}</div>
    </div>
  );
};
