import React, { Component } from "react";
import { Link } from "react-router-dom";
import customAxios from "../../utils/customAxios";
import Moment from "react-moment";

import { loggedIn, getUser } from "../../utils/authMethods";

import "./OfferModal.scss";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon
} from "react-share";

class OfferModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      description: "",
      category: "",
      errorTimeWallet: ""
    };

  }

  // TODO revisar todos estos methods

  handleApply = event => {
    event.preventDefault();
    customAxios({
      method: "post",
      url: "/apply",
      data: { offerId: this.props.offerIdentificator }
    })
      .then(res => {
        //validation to make sure you have enough hours in your time wallet to apply to an activity
        if (res.data.message === "Not enough time in the wallet to apply")
          this.setState({
            errorTimeWallet:
              "You don't have enough time in your wallet to apply to this offer"
          });
        else this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };

  sendEmail = event => {
    event.preventDefault();
    customAxios({
      method: "post",
      data: { offerId: this.props.offerIdentificator },
      url: "/send-mail"
    })
      .then(() => {
        console.log("sent");
      })
      .catch(err => {
        console.log(err);
      });
  };

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  redirectToAuthorProfile = () => {
    if( !!getUser() ) {
      if (this.props.authorUsername === getUser().username) {
        this.props.history.push("/dashboard")
        return
      }
    }
    // TODO revisar esta url
    this.props.history.push(`/profile/${this.props.author}`);
  };

  closeFadeModal = () => {
    this.props.history.push("/");
  };


  render() {
    let usersUsername = undefined
    if( !!getUser() ) usersUsername = getUser().username
    return (
      <div className={`modal-container ${this.props.toggle ? "show" : "hide"}`} >
        <div className="offer offer-modal">
          <div>
            <p>{this.props.title}</p>
            <Link>
              <i className="fa fa-times-circle" onClick={this.props.close}></i>
            </Link>
          </div>
          <section>
            <p>Username: {this.props.authorUsername}</p>
            <Link>
              <button onClick={this.redirectToAuthorProfile}>
                Visit profile
              </button>
            </Link>
            <div>
              {/* TODO */}
              {/* <img src={`${process.env.REACT_APP_API}/${this.props.image}`} alt=""/> */}
              <h1>Description</h1>
              <p>{this.props.description}</p>
              <div>
                {/* TODO check on deploy */}
                <FacebookShareButton
                  url={`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                {/* TODO */}
                <PinterestShareButton
                  url={`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`}
                  media={`${process.env.REACT_APP_API}`}
                >
                  <PinterestIcon size={32} round={true} />
                </PinterestShareButton>
              </div>
              <h1>Category</h1>
              <p>{this.props.category}</p>
              <h1>Date</h1>
              <p>
                <Moment format="D MMM YYYY" withTitle>
                  {this.props.dateOffer}
                </Moment>
              </p>
              <h1>Duration</h1>
              <p>{this.props.durationOffer} hour(s)</p>
            </div>
          </section>
          <div>
            <Link>
              {/* TODO revisar */}
              {loggedIn() ? (
                <>
                  {this.props.authorUsername === usersUsername ? (
                    <button disabled>Apply</button>
                  ) : (
                    <button
                      className="btn"
                      onClick={e => {
                        this.handleApply(e);
                        this.sendEmail(e);
                      }}
                    >
                      Apply
                    </button>
                  )}
                </>
              ) : (
                <button className="btn" onClick={this.redirectToLogin}>
                  Apply
                </button>
              )}
            </Link>
            {this.state.errorTimeWallet ? (
              <p style={{ color: "red" }}>&nbsp;{this.state.errorTimeWallet}</p>
            ) : (
              <p></p>
            )}
            {this.props.authorUsername === usersUsername ? (
              <p style={{ color: "red" }}>
                &nbsp;You can't apply to your own offer
              </p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            this.closeFadeModal(); /*this.props.close()*/
          }}
          className={"modal-bg"}
        ></div>
      </div>
    );
  }
}

export default OfferModal;
