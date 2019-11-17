import React, { Component } from 'react';
// import OffersList from './OffersList';
// import customAxios from '../../utils/customAxios';
// import { loadProgressBar } from 'axios-progress-bar';

// loadProgressBar(customAxios)

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
            cooking:    ''
        }
    }


    handleCheck = (event)=> {
        let generalSearch = {} //empty object
        generalSearch[event.target.name] = event.target.name
        this.setState(generalSearch)
    }

    // //submit button
    // handleSubmit = (event) =>{
    //     event.preventDefault();
    //     let newSearch = this.state  
    //     customAxios({
    //     method: 'post',
    //       url: '/search',
    //       data: newSearch
    //       }).then(databaseResponse => {
    //         this.setState({filteredOffers: databaseResponse.data})
    //       }).catch(() => {
    //           this.setState({error: 'Something went wrong!'})
    //       })
    // }
    

    render() { 
        return ( 
            <>
                <h6>Pick a category</h6>
                <form onSubmit={(e) => {this.props.handleSearch(e, this.state)}}>
                    
                    <label>
                        <input onChange={this.handleCheck} name='house' type="checkbox"/>
                        &nbsp;House &nbsp;
                    </label>

                    <label>
                        <input onChange={this.handleCheck} name='technology' type="checkbox" />
                        &nbsp;Technology &nbsp;
                    </label>

                    <label>
                        <input onChange={this.handleCheck} name='music' type="checkbox" />
                        &nbsp;Music &nbsp;
                    </label>

                    <label>
                        <input onChange={this.handleCheck} name='repair' type="checkbox" />
                        &nbsp;Repair &nbsp;
                    </label>

                    <label>
                        <input onChange={this.handleCheck} name='languages' type="checkbox" />
                        &nbsp;Languages &nbsp;
                    </label>

                    <label>
                        <input onChange={this.handleCheck} name='cooking' type="checkbox" />
                        &nbsp;Cooking
                    </label>

                    <div>
                        <button>Search</button>
                    </div>
                    <p style={{color: 'red'}}>{this.props.error? this.props.error:''}</p>
                </form>
                {/* <div>
                    <OffersList {...this.props} filteredOffers={this.state.filteredOffers}/>
                </div> */}
            </>
        );
    }
}
 
export default Search;