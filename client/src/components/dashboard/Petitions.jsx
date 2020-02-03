import React from "react";
import { Link } from "react-router-dom";

import OfferCard from "../OfferCard";

//This component renders the offers the user has applied to
const Petitions = props => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("petitions");
  // }
  return (
    <article className="activity-card">
      <h2><span>My petitions</span></h2>
      {props.listOfPetitions.length === 0 ? (
        <p>
          You haven't applied to any activities yet, do you want to check{" "}
          <Link to="/">all the avalaible offers</Link> now?
        </p>
      ) : (
        <div>
          {props.listOfPetitions.map(mypetition => {
            return (
              <OfferCard
                title={mypetition.title}
                authorUsername={mypetition.authorUsername}
                duration={mypetition.duration}
                status={mypetition.status}
                category={mypetition.category}
              />
            );
          })}
        </div>
      )}
    </article>
  );
};

export default Petitions;
