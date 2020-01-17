import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import "./Intro.scss"

import { gsap } from "gsap";

class Intro extends Component {
    constructor(props) {
        super(props)
        this.rightSideTween = gsap.timeline();
        this.leftSideTween = gsap.timeline();
        this.communityText = null;
        this.communityImg = null;
        this.activityText = null;
        this.activityImg = null;
    }

    componentDidMount() {
        this.rightSideTween
        .fromTo(this.communityImg, 2, {opacity: 0, x: +200}, {opacity: 1, x: 0})
        .fromTo(this.activityText, 1.5, {opacity: 0, x: +200}, {opacity: 1, x: 0}, "-=1")

        this.leftSideTween
        .fromTo(this.activityImg, 2, {opacity: 0, x: -200}, {opacity: 1, x: 0})
        .fromTo(this.communityText, 1.5, {opacity: 0, x: -200}, {opacity: 1, x: 0}, "-=1")
    }

    render() { 
        return (
            <section id="intro" className={this.props.hideOffers ? undefined : "hidden-element"}>
                <article>
                    <div ref={div => this.communityText = div}>
                        <h2>Meet new friends!</h2>
                        {/* TODO do an about us page, with both of us */}
                        <p>The world is more connected every day. But, oddly enough, we are also feeling lonelier than ever. At <Link to="/about-us">Time for time</Link> we feel it's time to look back to our own communities and strengthen and make new bonds with the people around us.</p>
                        <Link className="btn" to="/signup">Join us</Link>
                    </div>
                    <div>
                        <img ref={img => this.communityImg = img} src="/community3.jpg" alt="Group of people in community"/>
                    </div>
                </article>
                <article>
                    <div ref={div => this.activityText = div}>
                        <h2>Share time and knowledge with your community</h2>
                        <p>Have you always wanted to learn to play the guitar? Join our community and find someone that will help you achieve your goal. How much does it cost? It's for free! You only have to pay with your money.<br/>
                        When you sign up, we give you two hours so you can try some activities; after that, you can offer your own activities to earn money for your Time Wallet. Perhaps you are very handy and know how to fix your bike so you could teach someone else. Show off your hidden talents!</p>
                        {/* TODO no hace scroll realmente, mirar esto */}
                        {/* habria que meter una transition [!!!] */}
                        <a href="#pick-category" className="btn" onClick={this.props.toggleOfferList}>See the offers</a>
                    </div>
                    <div>
                        <img ref={img => this.activityImg = img} src="/guitar1.jpg" alt="Group of people in community"/>
                    </div>
                </article>
            </section>
        );
    }
}
 
export default Intro;