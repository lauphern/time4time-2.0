import React, { Component } from 'react';
import OneRequest from './OneRequest'

//this component render my own offer's request
class AllRequests extends Component {
    componentWillUnmount(){
        this.props.cleanNotif('offers')
    }
    render() { 
        return (
            <>
                <h2>My offers</h2>
                {/* TODO poner una lista de tus ofertas y una lista de las requested */}
                {this.props.listOfMyOffers.length === 0 ?
                    <p>You didn't get any request for any of your offers. <em>Yet!</em></p> :
                    <div>
                    { this.props.listOfMyOffers.map( myOffer => {
                    return(
                        <OneRequest {...this.props} 
                        offerId={myOffer.id}
                        title={myOffer.title}
                        authorUsername = {myOffer.authorUsername}
                        date={myOffer.date}
                        duration={myOffer.duration}
                        status={myOffer.status}
                        userRequest={myOffer.userRequest}
                        />
                    )
                    })
                    }
                </div> 
                }
            </>

        );
    }
}

export default AllRequests;