import React, { useState } from 'react';
import './answerer.css'

interface IQuestion{
   id: number; header: string; question: string; time: number;
}
interface IAnswererProps<T>{
  questions: Array<T>
}

export const Answerer = ( {questions}: IAnswererProps<IQuestion> ) => {

  return (
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
  )
}
