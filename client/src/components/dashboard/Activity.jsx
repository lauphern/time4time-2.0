import React, { useState, useEffect } from "react";
import Offers from "./Offers";
import Petitions from "./Petitions";

import customAxios from "../../utils/customAxios";

const Activity = props => {

  const [listOfPetitions, setListOfPetitions] = useState([])
  const [listOfOffers, setListOfOffers] = useState([])


  const getPetitions = () => {
    customAxios({
      method: "get",
      url: "/get-petitions"
    }).then(responseFromApi => {
      setListOfPetitions(responseFromApi.data)
      // this.notificationControl(responseFromApi.data, "petitions");
    });
  };

  const getOffers = () => {
    customAxios({
      method: "get",
      url: "/get-offers"
    }).then(responseFromApi => {
      setListOfOffers(responseFromApi.data)
      // this.notificationControl(responseFromApi.data, "offers");
    });
  };

  useEffect(() => {
    getPetitions();
    getOffers();

 }, []);
  return (
    <section className="activity-section">
      <Petitions listOfPetitions={listOfPetitions} />
      <article className="activity-card">
        <h2>Offers bookmarked</h2>
        {/* TODO */}
        <p>In progress!</p>
      </article>
      <Offers listOfOffers={listOfOffers} />
    </section>
  );
};

export default Activity;
