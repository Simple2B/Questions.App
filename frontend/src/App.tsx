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
  const [activeQuestions, setActiveQuestions] = useState([]);

  const handleGetQuestions = () => {
    socket.emit("get_active_questions");
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.send(`User ${socket.id} has connected`);
    });

    socket.on("success_active_questions", (resp) => {
      if (resp.status === "success") {
        setActiveQuestions(resp.data);
      }
    });

    socket.on("question_create_success", (resp) => {
      socket.emit("get_active_questions");
      console.log(resp);
    });

    handleGetQuestions();
  }, []);

  useBeforeunload((event) => {
    console.log(socket);

    const client_data = {
      session: socket.id,
      message: "disconnected successfully",
    };
    console.log(client_data);

    socket.emit("leave_service", client_data);
    // socket.disconnect();
    event.preventDefault();
  });

  const handlePage = () => {
    setPage(!page);
  };

  return (
    <>
      <button onClick={handlePage}>Change Page</button>
      <div>
        {page ? (
          <Asker questions={activeQuestions} />
        ) : (
          <Answerer questions={activeQuestions} />
        )}
      </div>
    </>
  );
};
