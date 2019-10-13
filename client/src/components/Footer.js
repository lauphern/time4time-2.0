import React, { Component } from 'react';

//Render footer
class Footer extends Component {
    state = {  }
    render() { 
        return (
            <footer className="footer">
                <div className="container is-fluid columns">
                    <div className="column is-2 is-vcentered">
                        <img className="footer-img" src="/logo_black.png" alt=""></img>
                    </div>
                    <div className="has-text-left column is-vcentered">
                        <p><strong>About us</strong></p>
                        <p>In Time 4 Time, we believe in circular economy. Modern society is created around the value of money. Our purpose is to go back to simpler times when you could enjoy your free time without having to be productive all the time. If you too are tired of the pressure of modern times, you can join us and meet new people to learn lots of new things in an environment where sharing is the key.</p>
                    </div>
                </div>
            </footer>
        );
    }
}
 
export default Footer;
