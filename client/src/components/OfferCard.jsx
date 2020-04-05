import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { toggleModal } from "../utils/uiMethods";

// TODO ver como puedo agregar classes dinamically, tal vez dependiendo de algun prop? y que los nombres de las classes sean similares pero tengan el comienzo distinto, porque con scss puedes combinar nombres de classes

const OfferCard = (props) => {
  let history = useHistory();
  let location = useLocation();

  return (
    <article className={props.classes ? props.classes : undefined}>
      {/* {props.linkToOffer ? (
        <h2>
          <Link to={`/${props.offerId}`}>
            <span>{props.title}</span>
          </Link>
        </h2>
      ) : (
        <h2>
          <span>{props.title}</span>
        </h2>
      )} */}
      <h2>
        <a
          onClick={() => {
            if (location.pathname === "/dashboard")
              toggleModal(`/dashboard/${props.offerInfo.id}`, history);
            else toggleModal(`/${props.offerInfo.id}`, history);
          }}
        >
          {props.offerInfo.title}
        </a>
      </h2>
      <p>Author: {props.offerInfo.authorUsername}</p>
      <p>Duration: {props.offerInfo.duration} hour(s)</p>
      {/* TODO necesito hacer validation con esto porque tengo status duplicado en RequestSnippet (y eso lo tengoq eu testear tb) */}
      <p>Status: {props.offerInfo.status}</p>
      <p>Category: {props.offerInfo.category}</p>
      {props.children}
    </article>
  );
};

export default OfferCard;
