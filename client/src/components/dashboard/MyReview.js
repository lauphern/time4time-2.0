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
            <div>
                <div>
                        <p>
                            Username: {this.state.reviewer.username}
                        </p>
                        <p>Date <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <div>
                        <figure>
                            {/* TODO */}
                            <img src={`${process.env.REACT_APP_API}/${this.props.pictureUrl}`} alt="Review"/>
                        </figure>
                        <p>
                            {this.props.opinion}
                        </p>
                    </div>

                </div>
                </div>
        );
    }
}
 
export default MyReview;