import React from "react";
import Moment from "react-moment";

const OfferCard = props => {
  return (
    <article>
      <h2>{props.title}</h2>
      {/* TODO do validation so it doesn't show on your own offer */}
      <p>{props.authorUsername}</p>
      <p>Duration: {props.duration} hour(s)</p>
      <p>{props.status}</p>
      <p>{props.category}</p>
    </article>
  );
};

export default OfferCard;

// title | |

// date |

// duration

// status |

// category

// authorUsername |

// users that requested your offer

// onClick to approveOffer

// description

// props.toggle [!] + view offer
