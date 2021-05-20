import React, { useState, useEffect } from "react";
import { questions_ws } from "./socket";
import { Socket } from "socket.io-client";
import { useBeforeunload } from "./hooks/useExitPrompt";
import { Asker } from "./components/asker/Asker";
import { Answerer } from "./components/answerer/Answerer";
import "./app.css";

const questionsFromServer = [
  { id: 1, header: "Header 1", question: "rem ipsum dolor sit amet", time: 15 },
  { id: 2, header: "Header 2", question: "rem ipsum dolor sit amet", time: 15 },
  { id: 3, header: "Header 3", question: "rem ipsum dolor sit amet", time: 15 },
  { id: 4, header: "Header 4", question: "rem ipsum dolor sit amet", time: 15 },
];

export const App = () => {
  const [socket, setSocket] = useState<Socket>(questions_ws);
  const [page, setPage] = useState(true);
  const [question, setQuestion] = useState("");

  const handleGetQuestions = () => {
    socket.emit("get_active_questions");
  };
  const handleCreateQuestion = () => {
    const resp = {
      session: socket.id,
      question: question,
    };
    if (question) socket.emit("create_question", resp);
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.send(`User ${socket.id} has connected`);
    });

    socket.on("success_active_questions", (resp) => {
      console.log(resp);
    });

    socket.on("question_create_success", (resp) => {
      socket.emit("get_active_questions");
      console.log(resp);
    });
    return () => {
      // const client_data = {
      //   session: socket.id,
      //   message: "disconnected successfully",
      // };
      // socket.emit("leave_service", client_data);
      // socket.disconnect();
    };
  }, []);

  useBeforeunload((event) => {
    event.preventDefault();
    const client_data = {
      session: socket.id,
      message: "disconnected successfully",
    };
    socket.emit("leave_service", client_data);
    socket.disconnect();
  });

  const handlePage = () => {
    setPage(!page);
  };

  return (
    <>
      <div>
        <button onClick={handleGetQuestions}>Get all questions</button> <br />
        <input
          type="text"
          id="question"
          placeholder="Type in your question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <br />
        <button onClick={handleCreateQuestion}>Add question</button>
      </div>
      <button onClick={handlePage}>Change Page</button>
      {page ? (
        <Asker questions={questionsFromServer} />
      ) : (
        <Answerer questions={questionsFromServer} />
      )}
    </>
  );
};
