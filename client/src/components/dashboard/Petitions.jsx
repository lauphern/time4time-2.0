import React from "react";
import { Link } from "react-router-dom";

import OnePetition from "./OnePetition";

//This component renders the offers the user has applied to
const Petitions = props => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("petitions");
  // }
  return (
    <article className="activity-card">
      <h2>My petitions</h2>
      {props.listOfPetitions.length === 0 ? (
        <p>
          You haven't applied to any activities yet, do you want to check{" "}
          <Link to="/">all the avalaible offers</Link> now?
        </p>
      ) : (
        <div>
          {props.listOfPetitions.map(mypetition => {
            return (
              <OnePetition
                title={mypetition.title}
                authorUsername={mypetition.authorUsername}
                date={mypetition.date}
                duration={mypetition.duration}
                status={mypetition.status}
              />
            );
          })}
        </div>
      )}
    </article>
  );
};

export default Petitions;
