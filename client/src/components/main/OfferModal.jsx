import React, { Component } from "react";
import { Link } from "react-router-dom";
import customAxios from "../../utils/customAxios";
import Moment from "react-moment";

import "./OfferModal.scss";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon
} from "react-share";

import { gsap } from "gsap";

class OfferModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      description: "",
      category: "",
      errorTimeWallet: "",
      myOffer: undefined
    };

    this.modalContainer = null;
    this.modalDialog = null;
    this.modalTween = gsap.timeline();
    this.closeModalTween = gsap.timeline();
  }

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
    if (this.props.authorUsername === this.props.username)
      this.props.history.push("/dashboard");
    else this.props.history.push(`/profile/${this.props.author}`);
  };

  closeFadeModal = () => {
    this.modalTween.reverse();
    this.props.history.push("/");
    //TODO arreglar que no desaparezca a trozos
  };

  componentDidMount() {
    this.modalTween
      .to(this.modalContainer, 0.1, {
        css: { className: "+= modal-container show" }
      })
      .fromTo(this.modalDialog, 0.2, { y: -50 }, { y: 0 })
      .reversed(true)
      .paused(false);
  }

  componentDidUpdate() {
    this.modalTween.reversed(!this.props.toggle);
  }

  render() {
    return (
      //TODO esto era para intentar hacer el fadeout
      // <div ref={div => this.modalContainer = div} className={`modal-container ${this.props.toggle ? `show` : undefined}`} >
      <div
        ref={div => (this.modalContainer = div)}
        className={`modal-container`}
      >
        <div
          ref={div => (this.modalDialog = div)}
          className="offer offer-modal"
        >
          <header>
            <p>{this.props.title}</p>
            <Link>
              <i className="fa fa-times-circle" onClick={this.props.close}></i>
            </Link>
          </header>
          <section>
            <div>
              <div>
                <p>Username: {this.props.authorUsername}</p>
                <div>
                  <div>
                    <Link>
                      <button onClick={this.redirectToAuthorProfile}>
                        Visit profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    {/* TODO */}
                    {/* <img src={`${process.env.REACT_APP_API}/${this.props.image}`} alt=""/> */}
                  </div>
                  <div>
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
                  </div>
                </div>
                <div>
                  <div>
                    <h1>Category</h1>
                    <p>{this.props.category}</p>
                  </div>
                  <div>
                    <h1>Date</h1>
                    <p>
                      <Moment format="D MMM YYYY" withTitle>
                        {this.props.dateOffer}
                      </Moment>
                    </p>
                    <h1>Duration</h1>
                    <p>{this.props.durationOffer} hour(s)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <Link>
            {/* TODO revisar */}
              {this.props.loggedIn ? (
                <>
                  {this.props.authorUsername === this.props.username ? (
                    <button disabled>Apply </button>
                  ) : (
                    <button
                      onClick={e => {
                        this.handleApply(e);
                        this.sendEmail(e);
                      }}
                    >
                      Apply{" "}
                    </button>
                  )}
                </>
              ) : (
                <button onClick={this.redirectToLogin}>Apply </button>
              )}
            </Link>
            {this.state.errorTimeWallet ? (
              <p style={{ color: "red" }}>&nbsp;{this.state.errorTimeWallet}</p>
            ) : (
              <p></p>
            )}
            {this.props.authorUsername === this.props.username ? (
              <p style={{ color: "red" }}>
                &nbsp;You can't apply to your own offer
              </p>
            ) : (
              <p></p>
            )}
          </footer>
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
