import React from "react";
import Proptypes from "prop-types";
import { format } from "date-fns";

//chat session using chatkit API
const ChatSession = props => {
  const { messages } = props;
  return messages.map(message => {
    const time = format(new Date(`${message.updatedAt}`), "HH:mm");

    return (
      <li key={message.id}>
        <div>
          <span>{message.senderId}</span>
          <span>{message.text}</span>
        </div>
        <span>{time}</span>
      </li>
    );
  });
};

ChatSession.propTypes = {
  messages: Proptypes.arrayOf(Proptypes.object).isRequired
};

export default ChatSession;
