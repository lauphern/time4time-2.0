import React from "react";

// TODO borrar este component

const OnePetition = props => {
  return (
    <div>
      <header>
        <p>{props.title}</p>
      </header>
      <div>
        <div>
          <p>Author: {props.authorUsername}</p>

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
