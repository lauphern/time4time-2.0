import React from "react";
import Moment from "react-moment";

const OnePetition = props => {
  return (
    <div>
      <header>
        <p>{props.title}</p>
      </header>
      <div>
        <div>
          <p>Author: {props.authorUsername}</p>
          <p>
            Date:{" "}
            {/* TODO revisar */}
            <Moment format="D MMM YYYY" withTitle>
              {props.date}
            </Moment>
          </p>
          <p>Duration: {props.duration} hour(s)</p>
        </div>
      </div>
      <footer>
        <p>{props.status}</p>
      </footer>
    </div>
  );
};

export default OnePetition;
