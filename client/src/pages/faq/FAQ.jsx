import React, { useState } from "react";

import QuestionAnswer from "../../components/faq/QuestionAnswer";

import "./FAQ.scss";

const listFAQ = [
  {
    q: "What kind of activities can I offer?",
    a:
      "Anything you'd like! From baking cookies, to teaching a new language or fixing a computer!",
  },
  {
    q: "Is it free?",
    a: "You can sign up and start posting and applying to offers for free!",
  },
  {
    q: "How do I pay or get paid for an activity?",
    a:
      "With time! We believe our society is too focused on money, we want to get back the sense of community and sharing with each other. So, let's say you want to learn how to sing. You go on our website and find someone that offers singing classes. Every class lasts one hour, so that's what you pay, 1 hour! If you offer any activity, you will get paid in hours too. All this time is stored in your Time Wallet –when you sign up, we give you two hours for free so you can try some activities :)",
  },
  {
    q: "Can I buy time for my Time Wallet?",
    a:
      "No, the only way to increase the time in your Time Wallet is by offering new activities. It's more fun that way, you get to meet new people, and you also share your talents with the community :)",
  },
];

const FAQ = (props) => {
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
