import React from "react";
import { Link } from "react-router-dom";

import OneOffer from "./OneOffer";

//This component renders the offers the user has posted
const Offers = props => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("offers");
  // }
  let offersRequested = props.listOfOffers.filter(offer => offer.status !== "Open")
  return (
    <article className="activity-card offers-card">
      <h2>Offers</h2>
      <div>
        <h3>Requests you got!</h3>
        {offersRequested.length === 0 ? (
          <p>
            You didn't get any request for any of your offers. <em>Yet!</em>
          </p>
        ) : (
          <div>
            {offersRequested.map(myOffer => {
              return (
                <OneOffer
                  offerId={myOffer.id}
                  title={myOffer.title}
                  authorUsername={myOffer.authorUsername}
                  date={myOffer.date}
                  duration={myOffer.duration}
                  status={myOffer.status}
                  userRequest={myOffer.userRequest}
                />
              );
            })}
          </div>
        )}
      </div>
      <div>
        <h3>All your offers posted</h3>
        {props.listOfOffers.length === 0 ? (
          <p>
            You didn't post any! Do you want to <Link to="/publish-offer">give it a try</Link>?
          </p>
        ) : (
          <div>
            {props.listOfOffers.map(myOffer => {
              return (
                <OneOffer
                  offerId={myOffer.id}
                  title={myOffer.title}
                  authorUsername={myOffer.authorUsername}
                  date={myOffer.date}
                  duration={myOffer.duration}
                  status={myOffer.status}
                  userRequest={myOffer.userRequest}
                />
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

export default Offers;
