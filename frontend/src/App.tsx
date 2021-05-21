import React, { useState, useEffect } from "react";
import { questions_ws } from "./socket";
import { Socket } from "socket.io-client";
import { useBeforeunload } from "./hooks/useExitPrompt";
import { Asker } from "./components/asker/Asker";
import { Answerer } from "./components/answerer/Answerer";
import "./app.css";

export const App = () => {
  const [page, setPage] = useState(true);

  useBeforeunload((event) => {
    event.preventDefault();
  });

  const handlePage = () => {
    setPage(!page);
  };

  return (
    <>
      <button onClick={handlePage}>Change Page</button>
      {page ? <Asker /> : <Answerer />}
    </>
  );
};
