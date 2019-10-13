import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import customAxios from '../../utils/customAxios';
import Moment from "react-moment";

class OneRequest extends Component {
    constructor(props){
        super(props)
        this.state = {
            offerStatus: '',
            error: '',
            offerApproved: undefined
        }
    }

    approveOffer = (event) => {
        event.preventDefault();
        customAxios({
            method: 'post',
            url: '/approve-offer',
            data: {offerId: this.props.offerId}
        }).then(databaseResponse => {
            this.updateTimeWallet(event)
            this.setState({
                offerStatus: 'Approved',
                offerApproved: databaseResponse.data
            })
            this.props.updateOffers()
            this.props.history.push('/dashboard')
        }).catch(err => {
            this.setState({error: 'The offer could not be approved'})
        })
    }
    updateTimeWallet = (event) => {
        event.preventDefault();
        customAxios({
            method: 'post',
            url: '/update-time-wallet',
            data: {offerId: this.props.offerId}
        }).then(databaseResponse => {
            console.log('updated time wallet')
        }).catch(err => {
            this.setState({error: 'The time wallet could not be updated'})
        })
    }
    render() { 
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                    {this.props.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                    <p>Date: &nbsp; <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <p>Duration: &nbsp; {this.props.duration} hour(s)</p>
                    {this.props.userRequest ?
                    <p>Who applied to your offer: {this.props.userRequest}</p> :
                    <p></p>}
                    <p style={{color: 'green'}}>{this.state.offerStatus ? `You got ${this.state.offerApproved.duration} hour(s) in your Time Wallet!` : ''}</p>
                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                    </div>
                </div>
                <footer className="card-footer is-vertical-center">
                    {this.state.offerApproved ?
                        <p className="card-footer-item"> Offer status: &nbsp; {this.state.offerApproved.status}</p> :
                        <p className="card-footer-item"> Offer status: &nbsp; {this.props.status}</p>
                    }
                    {this.state.offerStatus === 'Approved' ?
                    <Link className="card-footer-item button is-success">Approved!</Link> :
                    <>
                        {this.props.status === 'Open' ?
                        null :
                        <>
                            {this.props.status === 'Approved'? 
                            <Link className="card-footer-item button is-success is-static">Approved!</Link> :
                            <Link onClick={this.approveOffer} className="card-footer-item button is-warning">Approve</Link>
                            }
                        </>
                        }
                    </>
                    }
                </footer>
            </div>
        );
    }
}
 
export default OneRequest;