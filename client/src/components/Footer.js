import React, { Component } from 'react';

import "./Footer.scss"

class Footer extends Component {
    state = {  }
    render() { 
        return (
            <footer>
                <div>
                    <img src="/logo_black.png" alt=""></img>
                </div>
                <div>
                    <p><strong>About us</strong></p>
                    <p>In Time 4 Time, we believe in circular economy. Modern society is created around the value of money. Our purpose is to go back to simpler times when you could enjoy your free time without having to be productive all the time. If you too are tired of the pressure of modern times, you can join us and meet new people to learn lots of new things in an environment where sharing is the key.</p>
                </div>
            </footer>
        );
    }
}
 
export default Footer;
