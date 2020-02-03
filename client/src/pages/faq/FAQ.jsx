import React, { useState } from "react";

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

const QuestionAnswer = props => {
  return (
    <>
      <div>
        <h3
          className={props.toggle ? "show-faq" : null}
          onClick={() => props.setShowAnswer(props.toggle ? "" : props.id)}
        >
          <span>
            {props.question}{" "}
            {props.toggle ? (
              <i class="fas fa-minus"></i>
            ) : (
              <i class="fas fa-plus"></i>
            )}
          </span>
        </h3>
        <p>{props.answer}</p>
      </div>
      <hr />
    </>
  );
};

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
