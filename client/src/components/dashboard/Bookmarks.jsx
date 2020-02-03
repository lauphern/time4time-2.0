import React from "react";

import OfferCard from "../OfferCard"

const Bookmarks = props => {
  return (
    <article className="card">
      <h2>Offers bookmarked</h2>
      {props.listOfBookmarks.length === 0 ? (
        <p>You haven't saved any offers yet!</p>
      ) : (
        <div>
          {props.listOfBookmarks.map(bookmark => {
            return (
              <OfferCard
                title={bookmark.title}
                authorUsername={bookmark.authorUsername}
                duration={bookmark.duration}
                status={bookmark.status}
                category={bookmark.category}
              />
            );
          })}
        </div>
      )}
    </article>
  );
};

export default Bookmarks;
