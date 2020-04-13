import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import customAxios from "../utils/customAxios";
import { toggleModal } from "../utils/uiMethods";

import {
  loggedIn,
  getUser,
  saveUser as updateUser,
} from "../utils/authMethods";

import "./OfferModal.scss";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";

let OfferModal = (props) => {
  const [errorTimeWallet, setErrorTimeWallet] = useState("");
  const [isItBookmarked, setIsItBookmarked] = useState(false);

  let history = useHistory();

  //TODO revisar esto - hacerlo con useEffect?
  let bookmarks = undefined;
  let usersUsername = undefined;
  if (!!getUser()) {
    bookmarks = getUser().bookmarks;
    usersUsername = getUser().username;
  }

  const bookmark = () => {
    customAxios({
      method: "post",
      url: "/bookmark",
      data: { offerId: props.offerInfo.id },
    })
      .then((res) => {
        // Update user in localStorage to have the new bookmarks
        updateUser(res.data);
        setIsItBookmarked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeBookmark = () => {
    customAxios({
      method: "post",
      url: "/remove-bookmark",
      data: { offerId: props.offerInfo.id },
    })
      .then((res) => {
        // Update user in localStorage to have the new bookmarks
        updateUser(res.data);
        setIsItBookmarked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO revisar todos estos methods

  const handleApply = (event) => {
    event.preventDefault();
    customAxios({
      method: "post",
      url: "/apply",
      data: { offerId: props.offerInfo.id },
    })
      .then((res) => {
        //validation to make sure you have enough hours in your time wallet to apply to an activity
        if (res.data.message === "Not enough time in the wallet to apply")
          setErrorTimeWallet(
            "You don't have enough time in your wallet to apply to this offer"
          );
        else history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendEmail = (event) => {
    event.preventDefault();
    customAxios({
      method: "post",
      data: { offerId: props.offerInfo.id },
      url: "/send-mail",
    })
      .then(() => {
        console.log("sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redirectToAuthorProfile = () => {
    if (!!getUser()) {
      if (props.offerInfo.authorUsername === getUser().username) {
        history.push("/dashboard");
        return;
      }
    }
    history.push(`/profile/${props.offerInfo.author}`);
  };

  return (
    <div className={`modal-container ${props.booleanShow ? "show" : "hide"}`}>
      <div className="offer offer-modal card">
        <div className="modal-header">
          <div>
            <h2>{props.offerInfo.title}</h2>
            {/* If the user is not logged in or it's their own offer, we don't show any bookmark button
              Otherwise, we show the bookmark button depending on if the user has already bookmarked it */}
            {props.offerInfo.authorUsername === usersUsername ||
            !usersUsername ? null : bookmarks ? (
              bookmarks.indexOf(props.offerInfo.id) !== -1 || isItBookmarked ? (
                <a>
                  <i className="fas fa-bookmark" onClick={removeBookmark}></i>
                </a>
              ) : (
                <a>
                  <i className="far fa-bookmark" onClick={bookmark}></i>
                </a>
              )
            ) : null}
          </div>
          <a>
            <i
              className="fa fa-times-circle"
              onClick={() => {
                if (props.location.pathname.lastIndexOf("/") === 0)
                  toggleModal("/", history);
                else {
                  let newPathname = props.location.pathname.slice(
                    0,
                    props.location.pathname.lastIndexOf("/")
                  );
                  toggleModal(newPathname, history);
                }
              }}
            ></i>
          </a>
        </div>
        <section>
          <p>Username: {props.offerInfo.authorUsername}</p>
          <button className="btn" onClick={redirectToAuthorProfile}>
            Visit profile
          </button>
          <div>
            {/* TODO */}
            {/* <img src={`${process.env.REACT_APP_API}/${props.image}`} alt=""/> */}
            <h3>Description</h3>
            <p>{props.offerInfo.description}</p>
            <div className="modal-share">
              {/* TODO check on deploy */}
              <FacebookShareButton
                url={`${process.env.REACT_APP_FRONT}${props.location.pathname}`}
              >
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${process.env.REACT_APP_FRONT}${props.location.pathname}`}
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              {/* TODO */}
              <PinterestShareButton
                url={`${process.env.REACT_APP_FRONT}${props.location.pathname}`}
                media={`${process.env.REACT_APP_API}`}
              >
                <PinterestIcon size={32} round={true} />
              </PinterestShareButton>
            </div>
            <h3>Category</h3>
            <p>{props.offerInfo.category}</p>
            <h3>Duration</h3>
            <p>{props.offerInfo.duration} hour(s)</p>
          </div>
        </section>
        <div>
          {/* TODO revisar */}
          {loggedIn() ? (
            <>
              {props.offerInfo.authorUsername === usersUsername ? (
                <button disabled>Apply</button>
              ) : (
                <button
                  className="btn"
                  onClick={(e) => {
                    //TODO deberia ir asi?? si el apply falla, no deberia enviar el email
                    handleApply(e);
                    // sendEmail(e);
                  }}
                >
                  Apply
                </button>
              )}
            </>
          ) : (
            <button className="btn" onClick={() => history.push("/login")}>
              Apply
            </button>
          )}
          {errorTimeWallet ? (
            <p style={{ color: "red" }}>&nbsp;{errorTimeWallet}</p>
          ) : null}
          {props.offerInfo.authorUsername === usersUsername ? (
            <p style={{ color: "red" }}>
              &nbsp;You can't apply to your own offer
            </p>
          ) : null}
        </div>
      </div>
      <div
        onClick={() => {
          if (props.location.pathname.lastIndexOf("/") === 0)
            toggleModal("/", history);
          else {
            let newPathname = props.location.pathname.slice(
              0,
              props.location.pathname.lastIndexOf("/")
            );
            toggleModal(newPathname, history);
          }
        }}
        className={"modal-bg"}
      ></div>
    </div>
  );
};

export default OfferModal;
