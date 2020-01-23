import React, { useState } from "react";
import { Link } from "react-router-dom";

import OfferCard from "../OfferCard";

import customAxios from "../../utils/customAxios";

// TODO continuar testeando todo eso

const RequestSnippet = props => {
  return (
    <>
    {/* TODO revisar esto porque es un caos */}
      <div>
        {props.userRequest ? (
          <p>Who applied to your offer: {props.userRequest}</p>
        ) : null}

        {props.offerStatus ? (
          <p style={{ color: "green" }}>
            You gained {props.offerApproved.duration} hour(s) in your Time
            Wallet!
          </p>
        ) : null}

        <p style={{ color: "red" }}>{props.error ? props.error : ""}</p>
      </div>

      <div>
        {props.offerApproved ? (
          <p> Offer status: &nbsp; {props.offerApproved.status}</p>
        ) : (
          <p> Offer status: &nbsp; {props.status}</p>
        )}

        {props.offerStatus === "Approved" ? (
          <Link>Approved!</Link>
        ) : (
          <>
            {props.status === "Open" ? null : (
              <>
                {props.status === "Approved" ? (
                  <Link>Approved!</Link>
                ) : (
                  <Link onClick={props.approveOffer}>Approve</Link>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

//This component renders the offers the user has posted
const Offers = props => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("offers");
  // }

  const [offerStatus, setOfferStatus] = useState("");
  const [error, setError] = useState("");
  const [offerApproved, setOfferApproved] = useState(undefined);

  const approveOffer = event => {
    event.preventDefault();
    customAxios({
      method: "post",
      url: "/approve-offer"
      // TODO check where I have the offerId, if I don't have it in props, sends through method call
      // data: { offerId: props.offerId }
    })
      .then(res => {
        // TODO revisar
        setOfferStatus("Approved");
        setOfferApproved(res.data.offerApproved);
        //TODO get this prop here (it comes from UserDashboard)
        props.updateOffers();
        //TODO test que este orden funciona
        return customAxios({
          method: "post",
          url: "/update-time-wallet"
          // TODO check where I have the offerId, if I don't have it in props, sends through method call
          // data: { offerId: props.offerId }
        })
      })
      .then(() => {
        //TODO check if I have history. If I don't, there's a hook for it
        props.history.push("/dashboard");
      })
      .catch(err => {
        setError("Something went wrong!");
      });
  };

  let offersRequested = props.listOfOffers.filter(
    offer => offer.status !== "Open"
  );

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
                <OfferCard
                  offerId={myOffer.id}
                  title={myOffer.title}
                  authorUsername={myOffer.authorUsername}
                  duration={myOffer.duration}
                  status={myOffer.status}
                  category={myOffer.category}
                  userRequest={myOffer.userRequest}
                >
                  <RequestSnippet
                    approveOffer={approveOffer}
                    offerStatus={offerStatus}
                    offerApproved={offerApproved}
                    error={error}
                  />
                </OfferCard>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <h3>All your offers posted</h3>
        {props.listOfOffers.length === 0 ? (
          <p>
            You didn't post any! Do you want to{" "}
            <Link to="/publish-offer">give it a try</Link>?
          </p>
        ) : (
          <div>
            {props.listOfOffers.map(myOffer => {
              return (
                <OfferCard
                  offerId={myOffer.id}
                  title={myOffer.title}
                  authorUsername={myOffer.authorUsername}
                  duration={myOffer.duration}
                  status={myOffer.status}
                  category={myOffer.category}
                  userRequest={myOffer.userRequest}
                >
                  <RequestSnippet
                    approveOffer={approveOffer}
                    offerStatus={offerStatus}
                    offerApproved={offerApproved}
                    error={error}
                  />
                </OfferCard>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

export default Offers;
