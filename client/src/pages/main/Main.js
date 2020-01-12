import React, { Component } from 'react';
import Search from '../../components/main/Search';
import OfferList from '../../components/main/OfferList';
import Intro from '../../components/main/Intro';

import "./Main.scss";

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
            noResultsFound: null,
            hideOffers: true,
            mainSection: null,
            scrollPos: window.pageYOffset,
            showSection: false
        }
        

        this.mainTitle = null
        this.firstSpan = null
        this.secondSpan = null
        this.thirdSpan = null
        this.titleTimeline = gsap.timeline()

        this.introSection = <Intro toggleOfferList={this.toggleOfferList} hideOffers={this.state.hideOffers}/>
        this.searchListSection = <div className={"search-list"}>
                                    <Search handleSearch={this.handleSearch} error={this.state.error}/> 
                                    <OfferList {...this.props} filteredOffers={this.state.filteredOffers} noResultsFound={this.state.noResultsFound}/>
                                </div>
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

    toggleOfferList = () => {
        if(this.state.mainSection === this.introSection && !this.state.showSection) this.setState({showSection: true})
        else if(this.state.mainSection === this.introSection) this.setState({mainSection: this.searchListSection})
        else this.setState({mainSection: this.introSection})
    }

    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        let showSection = !!(currentScrollPos >= 90)
        //TODO arreglar que lo esconde de nuevo
        //con un if statement para cuando this.state.showSection es true, no volverlo a cambiar
        //y luego mirar si los botones funcionan
        if(this.state.showSection === true) this.setState({scrollPos: currentScrollPos})
        else this.setState({scrollPos: currentScrollPos, showSection});
    }

    componentDidMount() {
        this.setState({mainSection: this.introSection})
        window.addEventListener("scroll", this.handleScroll);
        this.titleTimeline
        .fromTo(this.firstSpan, 0.8, {y: +200}, {y: 0})
        .fromTo(this.secondSpan, 0.8, {y: +200}, {y: 0}, "-=0.5")
        .fromTo(this.thirdSpan, 0.8, {y: +200}, {y: 0}, "-=0.65")
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() { 
        return ( 
            <>
            {/* TODO some type of spinner here so we don't miss the title animation */}
                <header className="hero">
                    <div>
                        <div>
                            <h1 ref={h1 => this.mainTitle = h1} className="main-title">
                                <span ref={span => this.firstSpan = span}>Time </span>
                                <span ref={span => this.secondSpan = span}>for </span>
                                <span ref={span => this.thirdSpan = span}>time</span>
                            </h1>
                        </div>
                        <div>
                            <p>We think time is priceless. Do you want to join us and share new experiences and pay with just your time?</p>
                        </div>
                    </div>
                    <div className={this.state.mainSection !== this.searchListSection ? "arrow" : "hidden-element"}>
                        <i className="fas fa-grip-lines"></i>
                        {/* TODO revisar que me lleve a la altura correcta */}
                        <a onClick={this.state.showSection ? null : this.toggleOfferList} href="#intro"><i className="fas fa-angle-double-down"></i></a>
                    </div>
                </header>
                {/* TODO cuando la lista esta mostrada, si hago click en Home o en el Logo de la navbar en la navbar no hace reload asi que no muestra las otras secciones, y deberia 
                tal vez puedo forzara ese boton a recargar la pagina incluso si ya estamos en esa route, pero solo a ese*/}
                {this.state.showSection ? this.state.mainSection : null}                
            </>
         );
    }
}
 
export default Main;