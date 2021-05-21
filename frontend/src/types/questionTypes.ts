import { IAnswer } from "./answerTypes";

export interface IQuestion {
  id: number;
  header: string;
  question_text: string;
  created_at: number;
  session_id: string;
  answers_list: Array<IAnswer>;
}
