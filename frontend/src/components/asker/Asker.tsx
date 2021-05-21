import { useEffect, useState } from "react";
import { questions_ws } from "../../socket";
import "./asker.css";
import { IQuestion } from "../../types/questionTypes";

interface IResponse {
  status: string;
  message: string;
  data: IQuestion[];
}
export const Asker = () => {
  const [question, setQuestion] = useState("");
  const [activeQuestions, setActiveQuestions] = useState<IQuestion[]>([]);

  const handleCreateQuestion = () => {
    const resp = {
      session: questions_ws.id,
      question: question,
    };
    if (question) questions_ws.emit("create_question", resp);
  };

  const question_components = activeQuestions
    .filter((q) => q.session_id === questions_ws.id)
    .map((activeQuestions) => (
      <div className="answer__container" key={activeQuestions.id}>
        <span>{activeQuestions.question_text}</span>
        <div className="button_block">
          <button className="answer__button">Submit answer</button>
          <div>
            <span>
              {new Date(activeQuestions.created_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
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

    return () => {};
  }, []);

  return (
    // <div className="answer position-absolute top-50 start-50 translate-middle shadow-sm p-3 mb-5 bg-body rounded">
    <div className="asker">
      <form className="asker__form">
        <p>{questions_ws.id}</p>
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
