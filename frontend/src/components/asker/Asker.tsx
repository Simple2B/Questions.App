import React from 'react';
import "./asker.css"

interface IQuestion{
  id: number; header: string; question: string; time: number;
}
interface IAnswererProps<T>{
 questions: Array<T>
}

export const Asker = ({questions}: IAnswererProps<IQuestion> ) => {
  return (
      <div className="answer position-absolute top-50 start-50 translate-middle shadow-sm p-3 mb-5 bg-body rounded">
      <button className="btn_start btn btn-secondary">Start Earning</button>
      <form>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Ask your question" aria-label="Ask your question" aria-describedby="button-addon2" />
        <button className="btn btn-success" type="button" id="button-addon2">Ask</button>
      </div>
      </form>
      <div className="filter">
      <select className="form-select">
        <option selected>Filter</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
        <span>Total number of replies: {questions.length}</span>
      </div>
      {questions.map((question) => (
        <div className="border-bottom" key={question.id}>
          <span>{question.id}</span>
          {". "}
          <a href="#">{question.question}</a>
          <div className="answer_amount">{" 0 answers"}</div>
        </div>
      ))}
    </div>
  )
}
