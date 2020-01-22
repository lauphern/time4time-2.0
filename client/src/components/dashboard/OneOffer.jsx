import React, { Component } from "react";
import { Link } from "react-router-dom";

import customAxios from "../../utils/customAxios";

import OfferCard from "../OfferCard";

// TODO dependiendo de como haga los methods, tal vez no necesito este file y lo meto directamente en Offers.jsx

// tal vez puedo hacer como un HOC que renders props.children y cuando lo inserto en el dom pongo el <OfferCard /> dentro. Es bastante nesting pero es algo que ya tengo...
class OneOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerStatus: "",
      error: "",
      offerApproved: undefined
    };
  }

  approveOffer = event => {
    event.preventDefault();
    customAxios({
      method: "post",
      url: "/approve-offer",
      data: { offerId: this.props.offerId }
    })
      .then(res => {
        // TODO revisar
        this.setState({
          offerStatus: "Approved",
          offerApproved: res.data.offerApproved
        });
        this.props.updateOffers();
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        this.setState({ error: "The offer could not be approved" });
      });
  };
  updateTimeWallet = event => {
    event.preventDefault();
    customAxios({
      method: "post",
      url: "/update-time-wallet",
      data: { offerId: this.props.offerId }
    })
      .then(() => {
        console.log("updated time wallet");
      })
      .catch(err => {
        this.setState({ error: "The time wallet could not be updated" });
      });
  };
  render() {
    return (
      <OfferCard
        title={this.props.title}
        duration={this.props.duration}
        status={this.props.status}
        category={this.props.category}
      >

      {/* continue: put this jsx in RequestSnippet and the things that come from the state, send it from the parent through props
      and put the methods in the Offers component, so the parent manages the logic */}
        {/* TODO revisar esto porque es un caos */}
        <div>
          {this.props.userRequest ? (
            <p>Who applied to your offer: {this.props.userRequest}</p>
          ) : null}

          {this.state.offerStatus ? (
            <p style={{ color: "green" }}>
              You gained {this.state.offerApproved.duration} hour(s) in your Time
              Wallet!
            </p>
          ) : null}

          <p style={{ color: "red" }}>
            {this.state.error ? this.state.error : ""}
          </p>
        </div>

        <div>
          {this.state.offerApproved ? (
            <p> Offer status: &nbsp; {this.state.offerApproved.status}</p>
          ) : (
            <p> Offer status: &nbsp; {this.props.status}</p>
          )}

          {this.state.offerStatus === "Approved" ? (
            <Link>Approved!</Link>
          ) : (
            <>
              {this.props.status === "Open" ? null : (
                <>
                  {this.props.status === "Approved" ? (
                    <Link>Approved!</Link>
                  ) : (
                    <Link onClick={this.approveOffer}>Approve</Link>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </OfferCard>
    );
  }
}

export default OneOffer;
