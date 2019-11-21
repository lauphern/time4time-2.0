import React, { Component } from 'react';
import Search from '../../components/main/Search'
import OfferList from '../../components/main/OfferList';

import "./Main.scss"

import customAxios from '../../utils/customAxios';
import { loadProgressBar } from 'axios-progress-bar';

loadProgressBar(customAxios)


class Main extends Component {
    constructor(props){
        super(props)
        this.state = { 
            filteredOffers: [],
            noResultsFound: null
        }
    }

    //search button
    handleSearch = (search) => {
        if(Object.values(search).every(val => val === "" )) this.setState({filteredOffers: [], noResultsFound: null})
        else {
            customAxios({
                method: 'post',
                url: '/search',
                data: search
                }).then(databaseResponse => {
                    if(databaseResponse.data.length === 0) {
                    this.setState({filteredOffers: databaseResponse.data, noResultsFound: true})
                    } else this.setState({filteredOffers: databaseResponse.data})
                }).catch(() => {
                    this.setState({error: 'Something went wrong!'})
                })
        }
    }

    render() { 
        return ( 
            <>
                <header className="hero">
                    <div>
                        <h2>We think time is priceless. Do you want to join us and share new experiences and pay with just your time?</h2>
                    </div>
                    <div className="arrow">
                        <i className="fas fa-grip-lines"></i>
                        <a href="#pick-category"><i className="fas fa-angle-double-down"></i></a>
                    </div>
                </header>
                <Search handleSearch={this.handleSearch} error={this.state.error}/>
                <OfferList {...this.props} filteredOffers={this.state.filteredOffers} noResultsFound={this.state.noResultsFound}/>
            </>
         );
    }
}
 
export default Main;