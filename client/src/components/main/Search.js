import React, { Component } from 'react';
import OffersList from './OffersList';
import customAxios from '../../utils/customAxios';
import { loadProgressBar } from 'axios-progress-bar';

loadProgressBar(customAxios)

//render general search
class Search extends Component {
    constructor(props){
        super(props)
    this.state = { 
        house:      '',
        technology:   '',
        music:      '',
        repair:     '',
        languages:  '',
        cooking:    '',
        filteredOffers: [],
     }
    }


    handleCheck = (event)=> {
        let generalSearch = {} //empty object
        generalSearch[event.target.name] = event.target.name
        this.setState(generalSearch)
    }

    //submit button
    handleSubmit = (event) =>{
        event.preventDefault();
        let newSearch = this.state  
        customAxios({
        method: 'post',
          url: '/search',
          data: newSearch
          }).then(databaseResponse => {
            this.setState({
            filteredOffers: databaseResponse.data})
          }).catch(() => {
              this.setState({error: 'Something went wrong!'})
          })
    }
    

    render() { 
        return ( 
            <div className="container is-fluid">
            <div className="columns">
            <div className="search-column column is-2">
            <h6 className="title is-4 title-search">Pick a category</h6>
            <form onSubmit={this.handleSubmit} className="section search">
                
                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='house' type="checkbox"/>
                    &nbsp;House &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='technology'type="checkbox" />
                    &nbsp;Technology &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='music'type="checkbox" />
                    &nbsp;Music &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='repair'type="checkbox" />
                    &nbsp;Repair &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='languages'type="checkbox" />
                    &nbsp;Languages &nbsp;
                </label>

                <label className="checkbox level">
                    <input onChange={this.handleCheck} name='cooking'type="checkbox" />
                    &nbsp;Cooking
                </label>

                <div className="control level">
                    <button className="button is-link">Search </button>
                </div>
                <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
            </form>
            </div>

            <div className="column">
                <p className="intro title is-4">We think time is priceless. Do you want to join us and share new experiences and pay with just your time?</p>
                <OffersList {...this.props} filteredOffers={this.state.filteredOffers}/>
            </div>
            </div>
            
            </div>

         );
    }
}
 
export default Search;