import React, { Component } from 'react';
import Search from '../../components/main/Search'
import OffersList from '../../components/main/OffersList';

import "./Main.scss"

import customAxios from '../../utils/customAxios';
import { loadProgressBar } from 'axios-progress-bar';

loadProgressBar(customAxios)



//TODO
//take OffersList out of Search and have it be a child of Main


//first page render search, this component is public
//if you wanna make some transactios into web site 
class Main extends Component {
    constructor(props){
        super(props)
        this.state = { 
            filteredOffers: [],
        }
    }

    //search button
    handleSearch = (event, search) =>{
        debugger
        event.preventDefault();
        let newSearch = search 
        customAxios({
        method: 'post',
          url: '/search',
          data: newSearch
          }).then(databaseResponse => {
              debugger
            this.setState({filteredOffers: databaseResponse.data})
          }).catch(() => {
            this.setState({error: 'Something went wrong!'})
          })
    }

    render() { 
        return ( 
            <>
                <section>
                    <div>
                        <h2>We think time is priceless. Do you want to join us and share new experiences and pay with just your time?</h2>
                    </div>
                </section>
                <Search {...this.props} handleSearch={this.handleSearch} error={this.state.error}/>
                <OffersList {...this.props} filteredOffers={this.state.filteredOffers}/>
            </>
         );
    }
}
 
export default Main;