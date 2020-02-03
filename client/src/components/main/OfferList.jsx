import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import customAxios from "../../utils/customAxios";

import OfferCard from "../OfferCard";
import OfferModal from "./OfferModal";

import "./OfferList.scss";

//TODO
//asegurarme de que funciona

//this component displays all offers in the main page with OPEN status
//pending and closed offers don't show in main page

let OfferBlock = props => {
  let location = useLocation();
  return (
    <>
      <OfferCard
        title={props.offer.title}
        authorUsername={props.offer.authorUsername}
        duration={props.offer.duration}
        category={props.offer.category}
        classes="offer card main-card"
      >
        <p>{props.offer.description}</p>
        <a
          onClick={() => {
            props.toggle(props.offer.id);
          }}
        >
          View offer
        </a>
        <div className="view-offer"></div>
      </OfferCard>
      <OfferModal
        close={props.toggle}
        toggle={location.pathname === `/${props.offer.id}`}
        location={location}
        offerIdentificator={props.offer.id}
        title={props.offer.title}
        image={props.offer.image}
        author={props.offer.author}
        authorUsername={props.offer.authorUsername}
        description={props.offer.description}
        category={props.offer.category}
        dateOffer={props.offer.date}
        durationOffer={props.offer.duration}
        history={props.history}
      />
    </>
  );
};

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfOffers: [],
      firstOffers: [],
      hasMore: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(offerId) {
    // TODO revisar que funciona la url unica del modal
    typeof offerId == "string"
      ? this.props.history.push(`/${offerId}`)
      : this.props.history.push("/");
  }

  getAllOffers = () => {
    customAxios({
      method: "get",
      url: "/fetch-offers"
    })
      .then(responseFromApi => {
        this.setState({
          listOfOffers: responseFromApi.data,
          firstOffers: responseFromApi.data.slice(0, 5)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchMoreData = () => {
    if (this.state.listOfOffers.length === this.state.firstOffers.length) {
      this.setState({
        hasMore: false
      });
    }
    let currentLength = this.state.firstOffers.length;
    setTimeout(() => {
      this.setState({
        firstOffers: this.state.listOfOffers.slice(0, currentLength + 5)
      });
    }, 1000);
  };

  componentDidMount() {
    this.getAllOffers();
  }

  render() {
    const { firstOffers } = this.state;

    //All the offers we see by default, before searching
    const renderOffers = firstOffers.map(offer => (
      <OfferBlock
        offer={offer}
        toggle={this.toggle}
        history={this.props.history}
      />
    ));

    //Offers you get when you search
    let renderFilteredOffers = this.props.filteredOffers.map(filteredOffer => (
      <OfferBlock
        offer={filteredOffer}
        toggle={this.toggle}
        history={this.props.history}
      />
    ));

    return (
      <section>
        <InfiniteScroll
          dataLength={this.state.firstOffers.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                There are no more offers! Would you like to{" "}
                <Link to="/publish-offer">publish one?</Link>
              </b>
            </p>
          }
        >
          {/* Ternary operator to show the whole list of offers or the filtered one 
                    if you have done a search */}
          {this.props.filteredOffers.length > 0 ? (
            renderFilteredOffers
          ) : this.props.noResultsFound ? (
            <p>No results found!</p>
          ) : (
            renderOffers
          )}
        </InfiniteScroll>
      </section>
    );
  }
}

export default OfferList;
