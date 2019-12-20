import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import customAxios from '../../utils/customAxios';
import Moment from 'react-moment';

import "./OfferModal.scss"

import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon,
} from 'react-share';

class OfferModal extends Component {
    state = { 
        title: '',
        author: '',
        description: '',
        category: '',
        errorTimeWallet: '',
        myOffer: undefined,
        test: undefined
    }

    handleApply = (event) => {
        event.preventDefault();
        customAxios({
          method: "post",
          url: "/apply",
          data: {offerId: this.props.offerIdentificator}
        })
        .then(res => {
            //validation to make sure you have enough hours in your time wallet to apply to an activity
            if( res.data.message === "Not enough time in the wallet to apply" ) this.setState({errorTimeWallet: "You don't have enough time in your wallet to apply to this offer"})
            else this.props.history.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    }

    sendEmail = (event) => {
          event.preventDefault();
          customAxios({
              method:'post',
              data: {offerId:this.props.offerIdentificator},
              url: '/send-mail'
          })
          .then(() =>{
              console.log('sent')
          })
          .catch(err => {
              console.log(err)
          })
    }

    redirectToLogin = () => {
        this.props.history.push('/login')
    }


    redirectToAuthorProfile = () => {
        if(this.props.authorUsername === this.props.username) this.props.history.push('/dashboard')
        else this.props.history.push(`/profile/${this.props.author}`)
    }

    render() {
        return (
                <div onClick={() => {console.log(`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`)}} className={`modal-container ${this.props.toggle ? `show` : undefined}`} >
                    <div className="offer offer-modal">
                        <header>
                            <p>{this.props.title}</p>
                            <Link>
                                <i className="fa fa-times-circle" onClick={this.props.close}></i>
                            </Link>
                        </header>
                        <section>
                            <div>
                                <div>
                                    <p>Username: {this.props.authorUsername}</p>
                                    <div>
                                        <div>
                                            <Link>
                                                <button onClick={this.redirectToAuthorProfile}>Visit profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            {/* TODO */}
                                            {/* <img src={`${process.env.REACT_APP_API}/${this.props.image}`} alt=""/> */}
                                        </div>
                                        <div>
                                            <h1>Description</h1>
                                            <p>{this.props.description}</p>
                                            <div>
                                            {/* TODO check on deploy */}
                                                <FacebookShareButton url={`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`}>
                                                    <FacebookIcon size={32} round={true}/>
                                                </FacebookShareButton>
                                                <TwitterShareButton url={`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`}>
                                                    <TwitterIcon size={32} round={true}/>
                                                </TwitterShareButton>
                                                {/* TODO */}
                                                <PinterestShareButton url={`${process.env.REACT_APP_FRONT}${this.props.location.pathname}`} media={`${process.env.REACT_APP_API}`}>
                                                    <PinterestIcon size={32} round={true}/>
                                                </PinterestShareButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1>Category</h1>
                                                <p>{this.props.category}</p>
                                        </div>
                                        <div>                 
                                            <h1>Date</h1>
                                                <p><Moment format="D MMM YYYY" withTitle>{this.props.dateOffer}</Moment></p>
                                            <h1>Duration</h1>
                                                <p>{this.props.durationOffer} hour(s)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer>
                            <Link>
                            {this.props.loggedIn ?
                                <>
                                {this.props.authorUsername === this.props.username ?
                                    <button disabled>Apply </button> :
                                    <button onClick={(e) => {
                                        this.handleApply(e);
                                        this.sendEmail(e)}
                                        }>Apply </button>
                                }
                                </>
                                :
                                <button onClick={this.redirectToLogin}>Apply </button>
                            }
                            </Link>
                            {this.state.errorTimeWallet?
                            <p style={{color: 'red'}}>&nbsp;{this.state.errorTimeWallet}</p>:
                            <p></p>
                            }
                            {this.props.authorUsername === this.props.username ?
                            <p style={{color: 'red'}}>&nbsp;You can't apply to your own offer</p> :
                            <p></p>}
                        </footer>
                    </div>
                    <div onClick={this.props.close} className={this.props.toggle ? "modal-bg" : undefined}></div>
                </div>
        );
    }
}



export default OfferModal;