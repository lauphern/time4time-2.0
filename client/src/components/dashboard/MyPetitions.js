import React, { Component } from 'react';
import OnePetition from './OnePetition'
import { Link } from 'react-router-dom'

//render my applications for another offers
class MyPetitions extends Component {
    componentWillUnmount(){
        this.props.cleanNotif('petitions')
    }
    render() { 
        return (
            <>
            { this.props.listOfPetitions.length === 0 ?
            <p>You still haven't applied to any offer, do you want to check <Link to="/">all the avalaible offers</Link> now?</p> :
            <div>
                { this.props.listOfPetitions.map( mypetition => {
                return(
                    <OnePetition {...this.props} 
                    title={mypetition.title}
                    Username = {mypetition.authorUsername}
                    date={mypetition.date}
                    duration={mypetition.duration}
                    status={mypetition.status}
                    />
                )
                })
                }
            </div> 

            }
            </>

    )
}
}

export default MyPetitions;