import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import customAxios from '../../utils/customAxios';
import Moment from 'react-moment';

import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon,
    
} from 'react-share';


const display = {
    display: 'block'
};

const hide = {
    display: 'none'
}

class OfferModal extends Component {
    state = { 
        title: '',
        author: '',
        description: '',
        category: '',
        errorTimeWallet: '',
        myOffer: undefined
    }

    handleApply = (event) => {
        event.preventDefault();
        customAxios({
          method: "post",
          url: "/apply",
          data: {offerId: this.props.offerIdentificator}
        })
        .then(responseFromApi => {
            //validation to make sure you have enough hours in your time wallet to apply to an activity
            if( responseFromApi.data.message === "Not enough time in the wallet to apply" ) this.setState({errorTimeWallet: "You don't have enough time in your wallet to apply to this offer"})
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


    redirectToAuthorProfile = () =>{
        if(this.props.authorUsername === this.props.username) this.props.history.push('/dashboard')
        else this.props.history.push(`/profile/${this.props.author}`)
    }  

    render() { 
        return (
                <div className="modal" style={this.props.toggle ? display : hide}>
                <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title modal-offer-title">{this.props.title}</p>
                            <Link>
                                <button className="delete" onClick={this.props.close} aria-label="close"></button>
                            </Link>
                        </header>
                        <section className="modal-card-body">
                            <div className='media columns'>
                                <div className="content">
                                    <p>Username: {this.props.authorUsername}</p>
                                    <div className="level">
                                        <div className="level-left">
                                            <Link>
                                                <button onClick={this.redirectToAuthorProfile}className="button is-success">Visit profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='media columns'>
                                <div>
                                    <div className="columns">
                                        <div>
                                            {/* TODO */}
                                            <img src={`${process.env.REACT_APP_API}/${this.props.image}`} alt=""/>
                                        </div>
                                        <div>
                                            <h1>Description</h1>
                                            <p>{this.props.description}</p>
                                            <div>
                                                <FacebookShareButton url={'https://www.facebook.com'}>
                                                    <FacebookIcon size={32} round={true}/>
                                                </FacebookShareButton>
                                                <TwitterShareButton url={'https://www.twitter.com'}>
                                                    <TwitterIcon size={32} round={true}/>
                                                </TwitterShareButton>
                                                {/* TODO */}
                                                <PinterestShareButton url={'http://www.pinterest.com/'} media={`${process.env.REACT_APP_API}`}>
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
                </div>
        );
    }
}



export default OfferModal;