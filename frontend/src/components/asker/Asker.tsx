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
      <button>Start Earning</button>
      <form>
        <input type="text"/>
        <button>Ask</button>
      </form>
      <div className="filter">
        <select>
          <option>Filter</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <span>Total number of replies: {questions.length}</span>
      </div>
      {questions.map((question) => (
        <div className="border-bottom" key={question.id}>
          <span>{question.id}</span>
          {". "}
          <a href="#">{question.question}</a>
          <div>{" 0 answers"}</div>
        </div>
      ))}
    </div>
  )
}
