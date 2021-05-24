import { io } from "socket.io-client";

export const questions_ws = io("/questions");
