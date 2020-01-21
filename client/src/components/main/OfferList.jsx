import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import customAxios from "../../utils/customAxios";
import OfferModal from "./OfferModal";

import "./OfferList.scss";

//TODO
//asegurarme de que funciona
//this component displays all offers in the main page with OPEN status
//pending and closed offers don't show in main page

let OfferCard = props => {
  let location = useLocation();
  return (
    <>
      <div className="offer main-card" key={props.offer.id}>
        <h3>{props.offer.title}</h3>
        <h4>
          <strong>User</strong>: {props.offer.authorUsername}
        </h4>
        <p>{props.offer.description}</p>
        <p>
          <strong>Category</strong>: {props.offer.category}
        </p>
        <Link
          onClick={() => {
            props.toggle(props.offer.id);
          }}
        >
          View offer
        </Link>
        <div className="view-offer"></div>
      </div>
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
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: false,
      listOfOffers: [],
      firstOffers: [],
      hasMore: true
    };
  }

  toggle(offerId) {
    this.setState(() => ({
      toggle: offerId
    }));
    // TODO revisar que funciona la url unica del modal
    typeof offerId == "string"
      ? this.props.history.push(`/${offerId}`)
      : this.props.history.push("/");
  }

  getAllOffers = () => {
    customAxios({
      method: "get",
      url: "/display-offers"
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
      <OfferCard
        offer={offer}
        toggle={this.toggle}
        history={this.props.history}
      />
    ));

    //Offers you get when you search
    let renderFilteredOffers = this.props.filteredOffers.map(filteredOffer => (
      <OfferCard
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
