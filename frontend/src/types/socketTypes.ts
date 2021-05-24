import { io } from "socket.io-client";

interface ISocketManager {}

export enum ClientEvents {
  get_questions_by_session_id = "get_questions_by_session_id",
}
export enum ServerEvents {
  create_question_success = "create_question_success",
  no_active_questions = "no_active_questions",
  success_get_questions_by_session_id = "success_get_questions_by_session_id",
  answer_created = "answer_created",
}
// export class AskerSocketManager implements ISocketManager {
//   private questions_ws = io("/questions");
//   public currentQuestions = [];
//   public registerEvents() {
//     this.questions_ws.on("connect", () => {
//       console.log("LOG CONNECTED CLASS");
//     });
//     this.questions_ws.on(ServerEvents.create_question_success, (resp) => {
//       this.questions_ws.emit(ClientEvents.get_questions_by_session_id);
//     });
//     this.questions_ws.on(ServerEvents.no_active_questions, (resp) => {
//       this.questions_ws.emit(ClientEvents.get_questions_by_session_id);
//     });
//     this.questions_ws.on("success_get_questions_by_session_id", (resp) => {
//       if (resp.status === "success") {
//         this.currentQuestions = resp.data;
//       }
//     });
//   }
//   public dropConnection() {
//     console.log("CONNECTION DROPED");
//     this.questions_ws.disconnect();
//   }
// }
