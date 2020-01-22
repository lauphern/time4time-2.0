import React, { Component } from "react";
import { Link } from "react-router-dom";
import customAxios from "../../utils/customAxios";
import Moment from "react-moment";

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
      <div>
        <header>
          <p>{this.props.title}</p>
        </header>
        <div>
          <div>
            <p>
              Date: &nbsp;{" "}
              <Moment format="D MMM YYYY" withTitle>
                {this.props.date}
              </Moment>
            </p>
            <p>Duration: &nbsp; {this.props.duration} hour(s)</p>
            {this.props.userRequest ? (
              <p>Who applied to your offer: {this.props.userRequest}</p>
            ) : (
              null
            )}
            <p style={{ color: "green" }}>
              {this.state.offerStatus
                ? `You got ${this.state.offerApproved.duration} hour(s) in your Time Wallet!`
                : ""}
            </p>
            <p style={{ color: "red" }}>
              {this.state.error ? this.state.error : ""}
            </p>
          </div>
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
      </div>
    );
  }
}

export default OneOffer;
