import React from "react";
import { Link } from "react-router-dom";

import OfferCard from "../OfferCard";

//This component renders the offers the user has applied to
const Petitions = (props) => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("petitions");
  // }
  return (
    <article className="card">
      <h2>My petitions</h2>
      {props.listOfPetitions.length === 0 ? (
        <p>
          You haven't applied to any activities yet, do you want to check{" "}
          <Link to="/">all the avalaible offers</Link> now?
        </p>
      ) : (
        <div>
          {props.listOfPetitions.map((myPetition) => {
            return <OfferCard offerInfo={myPetition} />;
          })}
        </div>
      )}
    </article>
  );
};

export default Petitions;
