import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from 'react-moment'
import customAxios from '../../utils/customAxios';
import Review from '../../components/author-profile/Review'

//author profile component, this component it's private
//You only see this component if you have a username
class AuthorProfile extends Component {
    constructor() {
        super();
        this.state = {
          rating: 1,
          authorProfile:{},
          opinion: '',
          date: '',
          error: '',
          success: '',
          bio: '',
          newReview: undefined,
          listOfReviews: [],
          firstReviews: [],
          hasMore: true
        };
    this.form = React.createRef()
    this.onStarClick = this.onStarClick.bind(this)
    
    }
    //rating with start component
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    handleInput = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }
    //get author info from backend
    getAuthorInfo = () =>{
        const {id} = this.props.match.params
        customAxios({
          method: "get",
          url: `/author-profile/${id}`
        })
        .then(responseFromApi => {
          this.setState({
            authorProfile: responseFromApi.data
          })
        })
        .catch(err => {
            console.log(err)
        })
    }
    //add a review and sent to database
    handleSubmitReview = (event) => {
        event.preventDefault();
        let formData = new FormData(this.form.current) 
        customAxios({
            method: 'post',
            url: '/author-profile',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData
        }).then(databaseResponse => {
            this.setState({success: 'You successfully added a review!', newReview: databaseResponse.data})
            }).then(() => {
                this.sendUserId()
                this.getReviews()
            }).catch(err => {
                this.setState({error: 'Could not add your review'})
            })
    }

    // TODO
    // probablemente pueda usar populate en el backend
    //send user id (review author)
    sendUserId = () => {
        customAxios({
            method: 'post',
            url: '/user-reviewed-id',
            data: {userReviewedId: this.state.authorProfile._id, newReviewId: this.state.newReview._id}
        }).then(() => {
            console.log('Found the user')
        }).catch(err => {
            this.setState({error: 'Could not add your review'})
        })
    }
    //render author's reviews
    getReviews = () => {
        customAxios({
            method: 'post',
            url: '/get-reviews',
            data: {userReviewedId: this.props.match.params.id}
        }).then(databaseResponse => {
            this.setState({
                listOfReviews: databaseResponse.data,
                firstReviews: databaseResponse.data.slice(0,5)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    fetchMoreData = () => {
        if(this.state.listOfReviews.length === this.state.firstReviews.length) {
            this.setState({
                hasMore: false
            })
        }
        let currentLength = this.state.firstReviews.length
        setTimeout(() => {
            this.setState({
                firstReviews: this.state.listOfReviews.slice(0, currentLength + 5)
            });
        }, 5000);
    };

    handlePageClick = (event) => {
        this.setState({currentPage: Number(event.target.id)})
    }

    componentDidMount() {
        this.getAuthorInfo()
        this.getReviews()
    }

    render() {
        const { rating } = this.state;
        const { listOfReviews } = this.state
        const renderReviews = listOfReviews.map (review => {
            return <Review
                rating={review.rating}
                opinion={review.opinion}
                date={review.date}
                pictureUrl={review.picture}
                reviewer={review.reviewer}
            />
        })

        return (
            <div>
                <div>
                    <div>
                        <figure>
                            {/* TODO */}
                            <img src= {`${process.env.REACT_APP_API}/${this.state.authorProfile.profileImage}`} alt="User profile"></img>
                        </figure>
                    </div>
                    <div>
                        <div>
                            <div>
                                <p>{this.state.authorProfile.firstname}&nbsp;{this.state.authorProfile.lastname}</p>
                                <div>
                                    <p>In the app from: &nbsp;<Moment format="D MMM YYYY" withTitle>{this.state.authorProfile.registrationDate}</Moment></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>{this.state.authorProfile.bio}</p>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                    <form ref={this.form} onSubmit={this.handleSubmitReview}>
                        <div>
                            <label>Reviews</label>
                            <p style={{color: 'green'}}>{this.state.success? this.state.success:''}</p>
                            <div>
                                <h2>Your Rating: {rating} <span style={{color: 'red'}}><small>*Required</small></span></h2>
                                <StarRatingComponent 
                                    name="rate1" 
                                    starCount={5}
                                    value={rating}
                                    onStarClick={this.onStarClick}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Opinion</label> <span style={{color: 'red'}}><small>*Required</small></span>
                            <div>
                            <div>
                                <textarea onChange={this.handleInput} name='opinion' value={this.state.opinion} placeholder="Your opinion" required></textarea>
                            </div>
                            </div>
                        </div>
                        <div>
                            <label>Date</label> <span style={{color: 'red'}}><small>*Required</small></span>
                            <div>
                                <input onChange={this.handleInput} name='date' value={this.state.date} type="date" placeholder="Date of activity" required/>
                            </div>
                        </div>
                        <div>
                            <label>Picture</label> <span style={{color: 'red'}}><small>*Required</small></span>
                            <div>
                            <input onChange={this.handleInput} name='review-image' type="file" required/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button handleSubmitReview>Submit</button>
                            </div>
                            <div>
                                <button>Cancel</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    {this.state.listOfReviews.length > 0 ?
                        <>
                            <h1>List of reviews</h1>
                            {/* TODO */}
                            {/* organize css */}
                            <div id="scrollableDiv" style={{ height: "70vh", overflow: "auto", "z-index": 100 }}>
                                <InfiniteScroll
                                    dataLength={this.state.firstReviews.length}
                                    next={this.fetchMoreData}
                                    hasMore={this.state.hasMore}
                                    loader={<h4>Loading...</h4>}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                        <b>There are no more offers! Would you like to <Link to="/publish-offer">publish one?</Link></b>
                                        </p>
                                    }
                                    scrollableTarget="scrollableDiv"
                                >
                                    { renderReviews }
                                </InfiniteScroll>
                            </div>
                        </> :
                        <></>
                    }
                </div>
          </div>
        );
    }
}

 
export default AuthorProfile;