import React, { Component } from "react";
import customAxios from "../../utils/customAxios";

import {
  loggedIn,
  getUser,
  saveUser as updateUser
} from "../../utils/authMethods";

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
      errorTimeWallet: "",
      isItBookmarked: false
    };
  }

  bookmark = () => {
    customAxios({
      method: "post",
      url: "/bookmark",
      data: { offerId: this.props.offerIdentificator }
    })
      .then(res => {
        // Update user in localStorage to have the new bookmarks
        updateUser(res.data);
        this.setState({ isItBookmarked: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  removeBookmark = () => {
    customAxios({
      method: "post",
      url: "/remove-bookmark",
      data: { offerId: this.props.offerIdentificator }
    })
      .then(res => {
        // Update user in localStorage to have the new bookmarks
        updateUser(res.data);
        this.setState({ isItBookmarked: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
    if (!!getUser()) {
      if (this.props.authorUsername === getUser().username) {
        this.props.history.push("/dashboard");
        return;
      }
    }
    // TODO revisar esta url
    this.props.history.push(`/profile/${this.props.author}`);
  };

  closeFadeModal = () => {
    this.props.history.push("/");
  };

  render() {
    let bookmarks = undefined;
    let usersUsername = undefined;
    if (!!getUser()) {
      bookmarks = getUser().bookmarks;
      usersUsername = getUser().username;
    }
    return (
      <div className={`modal-container ${this.props.toggle ? "show" : "hide"}`}>
        <div className="offer offer-modal card">
          <div className="modal-header">
            <div>
              <h2>{this.props.title}</h2>
              {/* If the user is not logged in or its their own offer, we don't show any bookmark button
              Otherwise, we show the bookmark button depending on if the user has already bookmarked it */}
              {this.props.authorUsername === usersUsername ||
              !usersUsername ? null : bookmarks ? (
                bookmarks.indexOf(this.props.offerIdentificator) !== -1 ||
                this.state.isItBookmarked ? (
                  <a>
                    <i
                      className="fas fa-bookmark"
                      onClick={this.removeBookmark}
                    ></i>
                  </a>
                ) : (
                  <a>
                    <i className="far fa-bookmark" onClick={this.bookmark}></i>
                  </a>
                )
              ) : null}
            </div>
            <a>
              <i className="fa fa-times-circle" onClick={this.props.close}></i>
            </a>
          </div>
          <section>
            <p>Username: {this.props.authorUsername}</p>
            <button className="btn" onClick={this.redirectToAuthorProfile}>
              Visit profile
            </button>
            <div>
              {/* TODO */}
              {/* <img src={`${process.env.REACT_APP_API}/${this.props.image}`} alt=""/> */}
              <h3>Description</h3>
              <p>{this.props.description}</p>
              <div className="modal-share">
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
              <h3>Category</h3>
              <p>{this.props.category}</p>
              <h3>Duration</h3>
              <p>{this.props.durationOffer} hour(s)</p>
            </div>
          </section>
          <div>
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
            {this.state.errorTimeWallet ? (
              <p style={{ color: "red" }}>&nbsp;{this.state.errorTimeWallet}</p>
            ) : null}
            {this.props.authorUsername === usersUsername ? (
              <p style={{ color: "red" }}>
                &nbsp;You can't apply to your own offer
              </p>
            ) : null}
          </div>
        </div>
        <div
          onClick={() => {
            this.closeFadeModal();
          }}
          className={"modal-bg"}
        ></div>
      </div>
    );
  }
}

export default OfferModal;
