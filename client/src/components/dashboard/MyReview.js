import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import Moment from 'react-moment'

class MyReview extends Component {
    constructor(props){
        super(props)
        this.state = {
            reviewer: {}
        }
    }
    //call to database and get username's reviewer
    getReviewerUsername = () => {
        customAxios({
            method: 'post',
            url: '/reviewer',
            data: {reviewerId: this.props.reviewer}
        }).then(databaseResponse => {
            this.setState({reviewer: databaseResponse.data})
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.getReviewerUsername()
    }
    render() { 
        return (
            <div className="card">
                <div className="card-content">

                        <p className="is-size-5 column has-text-weight-semibold has-text-left">
                            Username: {this.state.reviewer.username}
                        </p>
                        <p className="subtitle column has-text-left">Date <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <div className="columns">
                        <figure className="image column">
                            {/* TODO */}
                            <img src={`${process.env.REACT_APP_API}/${this.props.pictureUrl}`} alt="Review"/>
                        </figure>
                        <p className="is-size-6 column has-text-left">
                            {this.props.opinion}
                        </p>
                    </div>

                </div>
                </div>
        );
    }
}
 
export default MyReview;