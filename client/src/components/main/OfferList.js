import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import customAxios from '../../utils/customAxios';
import OfferModal from './OfferModal'

import "./OfferList.scss"


//this component displays all offers in the main page with OPEN status
//pending and closed offers don't show in main page

class OfferList extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state={
            toggle: false,
            listOfOffers: [],
            firstOffers: [],
            hasMore: true
        }
    }
    
    toggle(offerId){
        this.setState(() =>({
            toggle: offerId
        }))
        // TODO revisar que funciona la url unica del modal
        typeof offerId == "string" ? this.props.history.push(`/${offerId}`) : this.props.history.push(`/`) 
    }

    getAllOffers = () =>{
        customAxios({
          method: "get",
          url: "/display-offers"
        })
        .then(responseFromApi => {
          this.setState({
            listOfOffers: responseFromApi.data,
            firstOffers: responseFromApi.data.slice(0,5)
          })
        })
        .catch(err => {
            console.log(err)
        })
    }


    fetchMoreData = () => {
        if(this.state.listOfOffers.length === this.state.firstOffers.length) {
            this.setState({
                hasMore: false
            })
        }
        let currentLength = this.state.firstOffers.length
        setTimeout(() => {
            this.setState({
                firstOffers: this.state.listOfOffers.slice(0, currentLength + 5)
            });
        }, 1000);
    };

    handlePageClick = (event) => {
        this.setState({currentPage: Number(event.target.id)})
    }

    componentDidMount() {
        this.getAllOffers();
    }

    render() { 
        const { firstOffers } = this.state

        //All the offers we see by default, before searching
        const renderOffers = firstOffers.map((offer) => {
            return (
                <>
                    <div className="offer main-card" key={offer.id}>
                        <h3>{offer.title}</h3>
                        <h4><strong>User</strong>: {offer.authorUsername}</h4>
                        <p>{offer.description}</p>
                        <p><strong>Category</strong>: {offer.category}</p>
                        <Link onClick={()=> {this.toggle(offer.id)}}>View offer</Link>
                        <div className="view-offer"></div>
                    </div>
                    <OfferModal {...this.props} close={this.toggle} 
                        toggle={this.props.location.pathname === `/${offer.id}`} 
                        offerIdentificator={offer.id}
                        title={offer.title} 
                        image={offer.image}
                        author={offer.author}
                        authorUsername={offer.authorUsername} 
                        authorProfileImage={offer.authorProfileImage}
                        description={offer.description} 
                        category={offer.category}
                        dateOffer={offer.date}
                        durationOffer={offer.duration}
                    />
                </>
            )
        })


        //Offers you get when you search
        let renderFilteredOffers = this.props.filteredOffers.map((filteredOffer) => {
            return (
                <>
                    <div className="offer" key={filteredOffer.id}>
                        <h3>{filteredOffer.title}</h3>
                        {/* TODO */}
                        <img src={`${process.env.REACT_APP_API}/${filteredOffer.authorProfileImage}`} alt=""/>
                        <h4><strong>User</strong>: {filteredOffer.authorUsername}</h4>
                        <p>{filteredOffer.description}</p>
                        <p><strong>Category</strong>: {filteredOffer.category}</p>
                        <Link onClick={()=> {this.toggle(filteredOffer.id)}}>View offer</Link>
                    </div>
                    <OfferModal {...this.state} {...this.props} close={this.toggle} 
                        toggle={this.state.toggle === filteredOffer.id} 
                        offerIdentificator={filteredOffer.id}
                        title={filteredOffer.title} 
                        image={filteredOffer.image}
                        author={filteredOffer.author}
                        authorUsername={filteredOffer.authorUsername}
                        authorProfileImage={filteredOffer.authorProfileImage}
                        description={filteredOffer.description} 
                        category={filteredOffer.category}
                        dateOffer={filteredOffer.date}
                        durationOffer={filteredOffer.duration}
                    />
                </>
            )
        })

            return (
                <div>
                    <InfiniteScroll
                        dataLength={this.state.firstOffers.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                            <b>There are no more offers! Would you like to <Link to="/publish-offer">publish one?</Link></b>
                            </p>
                        }
                    >
                    {/* Ternary operator to show the whole list of offers or the filtered one 
                    if you have done a search */}
                    { this.props.filteredOffers.length > 0 ?
                        renderFilteredOffers :
                        ( this.props.noResultsFound ?
                        <p>No results found!</p> :
                        renderOffers)
                    }
                    </InfiniteScroll>
                </div>
            );
    }
}


export default OfferList;