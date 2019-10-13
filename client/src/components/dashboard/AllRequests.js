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
            {this.props.listOfMyOffers.length === 0 ?
                <p>You didn't get any request for any of your offers. <em>Yet!</em></p> :
                <div>
                { this.props.listOfMyOffers.map( myOffer => {
                  return(
                    <OneRequest {...this.props} 
                    offerId={myOffer._id}
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