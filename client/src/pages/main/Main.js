import React, { Component } from 'react';
import Search from '../../components/main/Search'
import OfferList from '../../components/main/OfferList';

import "./Main.scss"

import customAxios from '../../utils/customAxios';

import { gsap } from "gsap";


import { loadProgressBar } from 'axios-progress-bar';

//TODO revisar que funciona
loadProgressBar(customAxios);



class Main extends Component {
    constructor(props){
        super(props)
        this.state = { 
            filteredOffers: [],
            noResultsFound: null
        }

        this.mainTitle = null
        this.firstSpan = null
        this.secondSpan = null
        this.thirdSpan = null
        this.titleTimeline = gsap.timeline()
    }

    //search button
    handleSearch = (search) => {
        if(Object.values(search).every(val => val === "" )) this.setState({filteredOffers: [], noResultsFound: null})
        else {
            customAxios({
                method: 'post',
                url: '/search',
                data: search
                }).then(res => {
                    if(res.data.length === 0) {
                    this.setState({filteredOffers: res.data, noResultsFound: true})
                    } else this.setState({filteredOffers: res.data})
                }).catch(() => {
                    this.setState({error: 'Something went wrong!'})
                })
        }
    }

    componentDidMount() {
        this.titleTimeline
        // .fromTo(this.mainTitle, 2.5, {css: {opacity: 0.3}}, {css: {opacity: 1}})
        // .fromTo(this.mainTitle, 0.5, {y: +200}, {y: 0})
        // .fromTo(this.firstSpan, 0.2, {y: +200}, {y: 0}, "-=1.9")
        // .fromTo(this.secondSpan, 0.2, {y: +200}, {y: 0}, "-=1.7")
        // .fromTo(this.thirdSpan, 0.2, {y: +200}, {y: 0}, "-=1.5")
        .fromTo(this.firstSpan, 0.8, {y: +200}, {y: 0})
        .fromTo(this.secondSpan, 0.8, {y: +200}, {y: 0}, "-=0.5")
        .fromTo(this.thirdSpan, 0.8, {y: +200}, {y: 0}, "-=0.65")


        // https://miistudio.com.mx/
        // https://greensock.com/docs/v2/Plugins/CSSPlugin
    }

    render() { 
        return ( 
            <>
                <header className="hero">
                    <div>
                        <div>
                            <h1 ref={h1 => this.mainTitle = h1} class="main-title">
                                <span ref={span => this.firstSpan = span}>Time </span>
                                <span ref={span => this.secondSpan = span}>for </span>
                                <span ref={span => this.thirdSpan = span}>time</span>
                            </h1>
                        </div>
                        <div>
                            <p>We think time is priceless. Do you want to join us and share new experiences and pay with just your time?</p>
                        </div>
                    </div>
                    <div className="arrow">
                        <i className="fas fa-grip-lines"></i>
                        <a href="#pick-category"><i className="fas fa-angle-double-down"></i></a>
                    </div>
                </header>
                {/* anadir texto debajo del header para explicar tb, con fotos de unsplash, en plan con ejemplos
                y tal vez toggle esto por la search bar y la list? */}
                {/* show search bar AND offerlist (?) with a button */}
                <Search handleSearch={this.handleSearch} error={this.state.error}/> 
                <OfferList {...this.props} filteredOffers={this.state.filteredOffers} noResultsFound={this.state.noResultsFound}/>
            </>
         );
    }
}
 
export default Main;