import React from 'react';

interface IQuestion{
  id: number; header: string; question: string; time: number;
}
interface IAnswererProps<T>{
 questions: Array<T>
}

export const Asker = ({questions}: IAnswererProps<IQuestion>) => {
  return (
    <div>
      <button>Start Earning</button>
      <form>
        <input type="text"/>
        <button>Ask</button>
      </form>
      <div>
        <select>
          <option>Filter</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <span>Total number of replies: 2</span>
      </div>
      <div className="answer position-absolute top-50 start-50 translate-middle shadow-sm p-3 mb-5 bg-body rounded">
      {questions.map((question) => (
        <div key={question.id}>
        <span>{question.id}</span>
        {". "}
        <a href="#">{question.question}</a>
        <div className="button_block"><button className="answer_button">Submit answer</button>
        <span>{question.time}</span></div>
        </div>
      ))}
    </div>
    </div>
  )
}
