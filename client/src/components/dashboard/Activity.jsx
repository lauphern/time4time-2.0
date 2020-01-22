import React, { useState, useEffect } from "react";
import Offers from "./Offers";
import Petitions from "./Petitions";
import Bookmarks from "./Bookmarks";

import customAxios from "../../utils/customAxios";

const Activity = props => {
  const [listOfPetitions, setListOfPetitions] = useState([]);
  const [listOfOffers, setListOfOffers] = useState([]);
  const [listOfBookmarks, setListOfBookmarks] = useState([]);

  const getPetitions = () => {
    customAxios({
      method: "get",
      url: "/get-petitions"
    })
      .then(responseFromApi => {
        setListOfPetitions(responseFromApi.data);
        // this.notificationControl(responseFromApi.data, "petitions");
      })
      .catch(err => console.log(err));
  };

  const getOffers = () => {
    customAxios({
      method: "get",
      url: "/get-offers"
    })
      .then(responseFromApi => {
        setListOfOffers(responseFromApi.data);
        // this.notificationControl(responseFromApi.data, "offers");
      })
      .catch(err => console.log(err));
  };

  const getBookmarks = () => {
    customAxios({
      method: "get",
      url: "/get-bookmarks"
    })
      .then(responseFromApi => {
        setListOfBookmarks(responseFromApi.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPetitions();
    getOffers();
    getBookmarks();
  }, []);

  return (
    <section className="activity-section">
      <Petitions listOfPetitions={listOfPetitions} />
      <Bookmarks listOfBookmarks={listOfBookmarks}/>
      <Offers listOfOffers={listOfOffers} />
    </section>
  );
};

export default Activity;
