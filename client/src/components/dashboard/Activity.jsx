import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import OfferCard from "../OfferCard";
import OfferModal from "../OfferModal";

import customAxios from "../../utils/customAxios";

const RequestSnippet = (props) => {
  const [offerStatus, setOfferStatus] = useState("");
  const [error, setError] = useState("");
  const [offerApproved, setOfferApproved] = useState(undefined);

  let history = useHistory();

  const approveOffer = (event, offerId) => {
    event.preventDefault();
    customAxios({
      method: "post",
      url: "/approve-offer",
      data: { offerId },
    })
      .then((res) => {
        // TODO revisar
        setOfferStatus("Approved");
        setOfferApproved(res.data.offerApproved);
        props.updateOffers();
        //TODO test que este orden funciona
        return customAxios({
          method: "post",
          url: "/update-time-wallet",
          data: { offerId },
        });
      })
      .then(() => {
        history.push("/dashboard");
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  };

  return (
    <>
      {/* TODO revisar esto porque es un caos */}
      <div>
        {props.userRequest ? (
          <p>Who applied to your offer: {props.userRequest}</p>
        ) : null}

        {offerStatus ? (
          <p style={{ color: "green" }}>
            You gained {offerApproved.duration} hour(s) in your Time Wallet!
          </p>
        ) : null}

        {error ? <p style={{ color: "red" }}>{error}</p> : null}
      </div>

      <div>
        {offerApproved ? (
          <p> Offer status: &nbsp; {offerApproved.status}</p>
        ) : (
          <p> Offer status: &nbsp; {props.status}</p>
        )}

        {offerStatus === "Approved" ? (
          <Link>Approved!</Link>
        ) : (
          <>
            {props.status === "Open" ? null : (
              <>
                {props.status === "Approved" ? (
                  <Link>Approved!</Link>
                ) : (
                  <Link onClick={(e) => approveOffer(e, props.offerId)}>
                    Approve
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const OneColumn = (props) => {

  let location = useLocation()

  return (
    <props.containerEl
      className={props.containerEl === "article" ? "card" : null}
    >
      <props.titleEl>{props.title}</props.titleEl>
      {props.data.length === 0 ? (
        <p>{props.cta}</p>
      ) : (
        <div>
          {props.data.map((offer) => {
            return (
              <>
                <OfferCard offerInfo={offer}>
                  {props.updateOffers ? (
                    <RequestSnippet
                      offerId={offer.id}
                      updateOffers={props.updateOffers}
                    />
                  ) : null}
                </OfferCard>
                <OfferModal
                  booleanShow={location.pathname === `/dashboard/${offer.id}`}
                  location={location}
                  offerInfo={offer}
                />
              </>
            );
          })}
        </div>
      )}
    </props.containerEl>
  );
};

const Activity = (props) => {
  const [listOfPetitions, setListOfPetitions] = useState([]);
  const [listOfOffers, setListOfOffers] = useState([]);
  const [listOfBookmarks, setListOfBookmarks] = useState([]);

  const getPetitions = () => {
    customAxios({
      method: "get",
      url: "/get-petitions",
    })
      .then((responseFromApi) => {
        setListOfPetitions(responseFromApi.data);
        // this.notificationControl(responseFromApi.data, "petitions");
      })
      .catch((err) => console.log(err));
  };

  const getOffers = () => {
    customAxios({
      method: "get",
      url: "/get-offers",
    })
      .then((responseFromApi) => {
        setListOfOffers(responseFromApi.data);
        // this.notificationControl(responseFromApi.data, "offers");
      })
      .catch((err) => console.log(err));
  };

  const getBookmarks = () => {
    customAxios({
      method: "get",
      url: "/get-bookmarks",
    })
      .then((responseFromApi) => {
        setListOfBookmarks(responseFromApi.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPetitions();
    getOffers();
    getBookmarks();
  }, []);

  return (
    <section className="activity-section">
      <OneColumn
        containerEl={"article"}
        titleEl={"h2"}
        title={"My petitions"}
        data={listOfPetitions}
        cta={[
          `You haven't applied to any activities yet, do you want to check `,
          <Link to="/">all the avalaible offers</Link>,
          ` now?`,
        ]}
      />
      <OneColumn
        containerEl={"article"}
        titleEl={"h2"}
        title={"Your bookmarks"}
        data={listOfBookmarks}
        cta={[
          `You haven't saved any offers yet! `,
          <Link to="/">Browse all the offers available</Link>,
        ]}
      />
      <article className="card col-2">
        <h2>Offers</h2>
        <OneColumn
          containerEl={"div"}
          titleEl={"h3"}
          title={"Requests you got!"}
          data={listOfOffers.filter((offer) => offer.status !== "Open")}
          cta={[
            `You didn't get any request for any of your offers, `,
            <em>yet!</em>,
          ]}
          updateOffers={getOffers}
        />
        <OneColumn
          containerEl={"div"}
          titleEl={"h3"}
          title={"All your offers posted"}
          data={listOfOffers}
          cta={[
            `You didn't post any! Do you want to `,
            <Link to="/publish-offer">give it a try</Link>,
            `?`,
          ]}
          updateOffers={getOffers}
        />
      </article>
    </section>
  );
};

export default Activity;
