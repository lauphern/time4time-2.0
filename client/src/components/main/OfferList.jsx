import React, { Component } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import customAxios from "../../utils/customAxios";
import { toggleModal } from "../../utils/uiMethods";

import OfferCard from "../OfferCard";
import OfferModal from "../OfferModal";

import "./OfferList.scss";

//TODO
//asegurarme de que funciona

//this component displays all offers in the main page with OPEN status
//pending and closed offers don't show in main page

let OfferBlock = (props) => {
  let location = useLocation();
  let history = useHistory();

  return (
    <>
      <OfferCard offerInfo={props.offer} classes="offer card main-card">
        <p>{props.offer.description}</p>
        <a
          onClick={() => {
            if (location.pathname === "/dashboard")
              toggleModal(`/dashboard/${props.offer.id}`, history);
            else toggleModal(`/${props.offer.id}`, history);
          }}
        >
          View offer
        </a>
        <div className="view-offer"></div>
      </OfferCard>
      <OfferModal
        booleanShow={location.pathname === `/${props.offer.id}`}
        location={location}
        offerInfo={props.offer}
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
      hasMore: true,
    };
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  getAllOffers = () => {
    customAxios({
      method: "get",
      url: "/fetch-offers",
    })
      .then((responseFromApi) => {
        this.setState({
          listOfOffers: responseFromApi.data,
          firstOffers: responseFromApi.data.slice(0, 5),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchMoreData = () => {
    if (this.state.listOfOffers.length === 0) return;
    if (this.state.listOfOffers.length === this.state.firstOffers.length) {
      this.setState({
        hasMore: false,
      });
      return;
    }

    let currentLength = this.state.firstOffers.length;
    setTimeout(() => {
      this.setState({
        firstOffers: this.state.listOfOffers.slice(0, currentLength + 5),
      });
    }, 1000);
  };

  componentDidMount() {
    this.getAllOffers();
  }

  render() {
    const { firstOffers } = this.state;

    //All the offers we see by default, before searching
    const renderOffers = firstOffers.map((offer) => (
      <OfferBlock offer={offer} />
    ));

    //Offers you get when you search
    let renderFilteredOffers = this.props.filteredOffers.map(
      (filteredOffer) => <OfferBlock offer={filteredOffer} />
    );

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
