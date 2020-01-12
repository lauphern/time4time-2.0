import React, { Component } from 'react';
import Moment from 'react-moment'


class OnePetition extends Component {
    render() { 
        return (
            <div>
                <header>
                    <p>
                    {this.props.title}
                    </p>
                </header>
                <div>
                    <div>
                        <p>Author: {this.props.Username}</p>
                        <p>Date: <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                        <p>Duration: {this.props.duration} hour(s)</p>
                    </div>
                </div>
                <footer>
                {(() => {
                    switch(this.props.status) {
                        case 'Open':
                            return <p>{this.props.status}</p>;
                        case 'Pending':
                            return <p>{this.props.status}</p>;
                        case 'Approved':
                            return <p>{this.props.status}</p>;
                        default:
                            return null;
                    }
                })()}
                </footer>
            </div>
        );
    }
}


export default OnePetition;