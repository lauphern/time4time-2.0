import React, { useState } from "react";

import QuestionAnswer from "../../components/faq/QuestionAnswer"

import "./FAQ.scss";

const listFAQ = [
  {
    q: "First question",
    a: "First answer"
  },
  {
    q: "Second question",
    a: "Second answer"
  },
  {
    q: "Third question",
    a: "Third answer"
  }
];

const FAQ = props => {
  const hideAll = () => {};
  const [showAnswer, setShowAnswer] = useState("");
  return (
    <section className="FAQ">
      <h2>
        <span>FAQ</span>
      </h2>
      {listFAQ.map((faq, index) => (
        <QuestionAnswer
          id={index}
          question={faq.q}
          answer={faq.a}
          hideAll={hideAll}
          setShowAnswer={setShowAnswer}
          toggle={showAnswer === index}
        />
      ))}
    </section>
  );
};

export default FAQ;
