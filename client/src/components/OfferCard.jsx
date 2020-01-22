import React from "react";

// TODO ver como puedo agregar classes dinamically, tal vez dependiendo de algun prop? y que los nombres de las classes sean similares pero tengan el comienzo distinto, porque con scss puedes combinar nombres de classes

const OfferCard = props => {
  return (
    <article>
      <h2>Title: {props.title}</h2>
      {props.authorUsername ? <p>Author: {props.authorUsername}</p> : null}
      <p>Duration: {props.duration} hour(s)</p>
      {/* TODO necesito hacer validation con esto porque tengo status duplicado en RequestSnippet (y eso lo tengoq eu testear tb) */}
      <p>Status: {props.status}</p>
      <p>Category: {props.category}</p>
      {props.children}
    </article>
  );
};

export default OfferCard;

// title | |

// duration

// status |

// category

// authorUsername |

// users that requested your offer

// onClick to approveOffer

// description

// props.toggle [!] + view offer


// In Petitions component - DONE:

// title
// authorUsername
// duration
// status
// category