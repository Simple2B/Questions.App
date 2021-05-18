import React, { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { socket } from "./socket";

export const App = () => {
  const [socketId, setSocketId] = useState("");

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
  return (
    <div>
      <button onClick={handleConnect}>Connect</button>{" "}
    </div>
  );
};
