import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import OfferCard from "../OfferCard";

import customAxios from "../../utils/customAxios";

//TODO borrar este component

// TODO continuar testeando todo eso


//This component renders the offers the user has posted
const Offers = (props) => {
  // componentWillUnmount() {
  // TODO
  // this.props.cleanNotif("offers");
  // }

  // const [offerStatus, setOfferStatus] = useState("");
  // const [error, setError] = useState("");
  // const [offerApproved, setOfferApproved] = useState(undefined);

  // let history = useHistory();

  // const approveOffer = (event, offerId) => {
  //   event.preventDefault();
  //   customAxios({
  //     method: "post",
  //     url: "/approve-offer",
  //     data: { offerId },
  //   })
  //     .then((res) => {
  //       // TODO revisar
  //       setOfferStatus("Approved");
  //       setOfferApproved(res.data.offerApproved);
  //       props.updateOffers();
  //       //TODO test que este orden funciona
  //       return customAxios({
  //         method: "post",
  //         url: "/update-time-wallet",
  //         data: { offerId },
  //       });
  //     })
  //     .then(() => {
  //       history.push("/dashboard");
  //     })
  //     .catch((err) => {
  //       setError("Something went wrong!");
  //     });
  // };

  // let offersRequested = props.listOfOffers.filter(
  //   (offer) => offer.status !== "Open"
  // );

  return (
    <article className="card col-2">
      <h2>Offers</h2>
      {props.children}
    </article>
  );
};

export default Offers;


// const Offers = (props) => {
//   // componentWillUnmount() {
//   // TODO
//   // this.props.cleanNotif("offers");
//   // }

//   const [offerStatus, setOfferStatus] = useState("");
//   const [error, setError] = useState("");
//   const [offerApproved, setOfferApproved] = useState(undefined);

//   let history = useHistory();

//   const approveOffer = (event, offerId) => {
//     event.preventDefault();
//     customAxios({
//       method: "post",
//       url: "/approve-offer",
//       data: { offerId },
//     })
//       .then((res) => {
//         // TODO revisar
//         setOfferStatus("Approved");
//         setOfferApproved(res.data.offerApproved);
//         props.updateOffers();
//         //TODO test que este orden funciona
//         return customAxios({
//           method: "post",
//           url: "/update-time-wallet",
//           data: { offerId },
//         });
//       })
//       .then(() => {
//         history.push("/dashboard");
//       })
//       .catch((err) => {
//         setError("Something went wrong!");
//       });
//   };

//   let offersRequested = props.listOfOffers.filter(
//     (offer) => offer.status !== "Open"
//   );

//   return (
//     <article className="card col-2">
//       <h2>Offers</h2>
//       <div>
//         <h3>Requests you got!</h3>
//         {offersRequested.length === 0 ? (
//           <p>
//             You didn't get any request for any of your offers. <em>Yet!</em>
//           </p>
//         ) : (
//           <div>
//             {offersRequested.map((myOffer) => {
//               return (
//                 <OfferCard offerInfo={myOffer}>
//                   <RequestSnippet
//                     offerId={myOffer.id}
//                     approveOffer={approveOffer}
//                     offerStatus={offerStatus}
//                     offerApproved={offerApproved}
//                     error={error}
//                   />
//                 </OfferCard>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       <div>
//         <h3>All your offers posted</h3>
//         {props.listOfOffers.length === 0 ? (
//           <p>
//             You didn't post any! Do you want to{" "}
//             <Link to="/publish-offer">give it a try</Link>?
//           </p>
//         ) : (
//           <div>
//             {props.listOfOffers.map((myOffer) => {
//               return (
//                 <OfferCard offerInfo={myOffer}>
//                   {myOffer.status !== "Open" ? (
//                     <RequestSnippet
//                       offerId={myOffer.id}
//                       approveOffer={approveOffer}
//                       offerStatus={offerStatus}
//                       offerApproved={offerApproved}
//                       error={error}
//                     />
//                   ) : null}
//                 </OfferCard>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </article>
//   );
// };
