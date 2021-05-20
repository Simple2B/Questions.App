import React, { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { socket } from "./socket";
import { Asker } from "./components/asker/Asker"
import { Answerer } from "./components/answerer/Answerer"
import "./app.css"

const questionsFromServer = [
  {"id": 1, "header":"Header 1", "question": "rem ipsum dolor sit amet", "time": 15 },
  {"id": 2, "header":"Header 2", "question": "rem ipsum dolor sit amet", "time": 15 },
  {"id": 3, "header":"Header 3", "question": "rem ipsum dolor sit amet", "time": 15 },
  {"id": 4, "header":"Header 4", "question": "rem ipsum dolor sit amet", "time": 15 },
];

export const App = () => {
  const [socketId, setSocketId] = useState("");
  const [page, setPage] = useState(true)

  const handleConnect = () => {
    setSocketId(socket.id);
    console.log(socketId);
    socket.emit("connection", { id: socketId });
  };

  const handleSendQuestion = () => {};
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on("message", () => {
      console.log("message");
    });
  }, []);
  useEffect(() => {
    // socket.on("connect", () => {
    //   socket.send("User has connected");
    // });
  });

  const handlePage = () => {
    setPage(!page)
  }

  return (
    <>
    <div>
      <button onClick={handleConnect}>Connect</button>{" "}
    </div>
    <button onClick={handlePage}>Change Page</button>
    {page
    ? <Asker questions={questionsFromServer}/>
    : <Answerer questions={questionsFromServer} />
    }
    </>
  );
};
