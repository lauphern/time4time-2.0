import React from "react";
import AllRequests from "./AllOffers";
import MyPetitions from "./MyPetitions";

const Activity = props => {
  return (
    <section className="activity-section">
      {/* TODO organize with grid */}
      <MyPetitions {...props} />
      <article className="activity-card">
        <h2>Offers bookmarked</h2>
        {/* TODO */}
        <p>In progress!</p>
      </article>
      <AllRequests {...props} />
    </section>
  );
};

export default Activity;
