import React, { Component } from 'react';
import Moment from 'react-moment'


class OnePetition extends Component {
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
                    <p>Author: {this.props.Username}</p>
                    <p>Date: <Moment format="D MMM YYYY" withTitle>{this.props.date}</Moment></p>
                    <p>Duration: {this.props.duration} hour(s)</p>
                    </div>
                </div>
                <footer className="card-footer">
                {(() => {
                    switch(this.props.status) {
                        case 'Open':
                            return <p className="card-footer-item">{this.props.status}</p>;
                        case 'Pending':
                            return <p className="card-footer-item has-background-warning">{this.props.status}</p>;
                        case 'Approved':
                            return <p className="card-footer-item has-background-success">{this.props.status}</p>;
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