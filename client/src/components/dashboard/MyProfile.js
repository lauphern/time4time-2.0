import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import Moment from 'react-moment'
import MyReview from './MyReview'


//render my profile with my time wallet and basic personal settings
class MyProfile extends Component {
    state = { 
        profileInfo: {},
        reviewer:{},
        myReviews: [],
        currentPage: 1,
        reviewsPerPage: 5
     }
    
    getProfileInfo = () =>{
        customAxios({
          method: "get",
          url: "/my-profile"
        })
        .then(responseFromApi => {
          this.setState({
            profileInfo: responseFromApi.data
          })
        })
        .catch(err => {
            console.log(err)
        })
    }

    getMyReviews = () => {
        customAxios({
            method: "get",
            url: "/my-reviews"
          })
          .then(responseFromApi => {
            this.setState({
              myReviews: responseFromApi.data
            })
          })
          .catch(err => {
              console.log(err)
          })
    }

    handlePageClick = (event) => {
        this.setState({currentPage: Number(event.target.id)})
    }

    componentDidMount() {
        this.getProfileInfo();
        this.getMyReviews();
    }
    render() { 
        const { myReviews, currentPage, reviewsPerPage } = this.state
        const indexOfLastReview = currentPage * reviewsPerPage
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage
        const currentReviews = myReviews.slice(indexOfFirstReview, indexOfLastReview)
        const renderReviews = currentReviews.map (review => {
            return <MyReview
                rating={review.rating}
                opinion={review.opinion}
                date={review.date}
                pictureUrl={review.picture}
                reviewer={review.reviewer}
            />
        })

        // TODO
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(myReviews.length / reviewsPerPage); i++) {
            pageNumbers.push(i)
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                >
                    {number}
                </li>
            )
        })
        return (
            <div>
                <div>
                    <div>
                        <figure>
                        {/* TODO */}
                        <img src={`${process.env.REACT_APP_API}/${this.state.profileInfo.profileImage}`} alt="Profile"/>
                        </figure>
                    </div>
                    <div>
                        <p>{this.state.profileInfo.firstname} {this.state.profileInfo.lastname}</p>
                        <p>Time wallet: {this.state.profileInfo.timeWallet} hour(s)</p>
                        <p><strong>Registration Date:</strong> &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.profileInfo.registrationDate}</Moment></p>
                    </div>
                </div>
                <div>
                    <div>
                    <div>
                        <p><strong>Username:</strong> &nbsp; {this.state.profileInfo.username}</p>
                        <p><strong>e-mail:</strong> &nbsp; {this.state.profileInfo.email}</p>
                        <p><strong>Bio:</strong> &nbsp; {this.state.profileInfo.bio}</p>
                    </div>
                    </div>
                    {this.state.myReviews.length > 0 ?
                        <>
                            <h1>Reviews I have received</h1>
                            <div>
                                { renderReviews }
                                <div>
                                    <ul>
                                        { renderPageNumbers }
                                    </ul>
                                </div>
                            </div>
                        </> :
                        <></>
                    }
                </div>
            </div>
        );
    }
}
 
export default MyProfile;