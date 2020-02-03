import React from "react";

const QuestionAnswer = props => {
  return (
    <>
      <div className="faq-card">
        <h3
          className={props.toggle ? "show-faq" : null}
          onClick={() => props.setShowAnswer(props.toggle ? "" : props.id)}
        >
          <span>
            {props.question}{" "}
            {props.toggle ? (
              <i className="fas fa-minus"></i>
            ) : (
              <i className="fas fa-plus"></i>
            )}
          </span>
        </h3>
        <p>{props.answer}</p>
      </div>
      <hr />
    </>
  );
};

export default QuestionAnswer;
