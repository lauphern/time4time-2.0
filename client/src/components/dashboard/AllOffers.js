import React, { Component } from 'react';
import OneRequest from './OneRequest'

//this component render my own offer's request
class AllOffers extends Component {
    componentWillUnmount(){
        this.props.cleanNotif('offers')
    }
    render() { 
        return (
            <article className="activity-card offers-card">
                <h2>My offers</h2>
                {/* TODO poner una lista de tus ofertas y una lista de las requested */}
                <div>
                    <h3>Requests you got!</h3>
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
                </div>
                <div>
                    <h3>All your offers posted</h3>
                    <p>In progress!</p>
                </div>
            </article>

        );
    }
}

export default AllOffers;