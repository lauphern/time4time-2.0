import React from "react";
import { Link } from "react-router-dom";

import OneOffer from "./OneOffer";

//this component render my own offer's request
const Offers = props => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("offers");
  // }
  return (
    <article className="activity-card offers-card">
      <h2>Offers</h2>
      {/* TODO poner una lista de tus ofertas y una lista de las requested */}
      <div>
        <h3>Requests you got!</h3>
        {/* {props.listOfOffers.length === 0 ? (
          <p>
            You didn't get any request for any of your offers. <em>Yet!</em>
          </p>
        ) : } */}
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
                // TODO revisar
                  {...props}
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
