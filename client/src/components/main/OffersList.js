import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import customAxios from '../../utils/customAxios';
import OfferModal from './OfferModal'


//this component displays all offers in the main page with OPEN status
//pending and closed offers don't show in main page

class OffersList extends Component {

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
        }));
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
            console.log('error')
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
                <div key={offer._id}>
                    <div>
                        <div>
                                <h3>{offer.title}</h3>
                                <h4><strong>User</strong>: {offer.authorUsername}</h4>
                                <p>{offer.description}</p>
                                <p><strong>Category</strong>: {offer.category}</p>
                            <Link onClick={()=> {this.toggle(offer._id)}}>View offer</Link>
                        </div>
                    </div>
                    <OfferModal {...this.props} close={this.toggle} 
                        toggle={this.state.toggle === offer._id} 
                        offerIdentificator={offer._id}
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
                </div>
            )
        })


        //Offers you get when you search
        let renderFilteredOffers = this.props.filteredOffers.map((filteredOffer) => {
            return (
                <div key={filteredOffer._id}>
                    <div>
                        <div>
                                <h3>{filteredOffer.title}</h3>
                                {/* TODO */}
                                <img src={`${process.env.REACT_APP_API}/${filteredOffer.authorProfileImage}`} alt=""/>
                                <h4><strong>User</strong>: {filteredOffer.authorUsername}</h4>
                                <p>{filteredOffer.description}</p>
                                <p><strong>Category</strong>: {filteredOffer.category}</p>
                            <Link onClick={()=> {this.toggle(filteredOffer._id)}}>View offer</Link>
                        </div>
                    </div>
                    <OfferModal {...this.state} {...this.props} close={this.toggle} 
                        toggle={this.state.toggle === filteredOffer._id} 
                        offerIdentificator={filteredOffer._id}
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
                </div>
            )
        })

            return (
                <div>
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
                                renderOffers
                            }
                            </InfiniteScroll>
                    </div>
                </div>
            );
    }
}


export default OffersList;