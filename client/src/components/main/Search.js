import React, { Component } from 'react';

import "./Search.scss"

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
        let generalSearch = {} 
        generalSearch[event.target.name] = event.target.checked ? event.target.name : ""
        this.setState(generalSearch)
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState !== this.state) {
            this.props.handleSearch(this.state)
        }
        
    }
    
    render() { 
        return ( 
            <>
                <h6 id="pick-category">Pick a category</h6>
                {/* <form onSubmit={(e) => {this.props.handleSearch(e, this.state)}}> */}
                <form>
                    
                    <input onChange={this.handleCheck} name="house" id="house" type="checkbox"/>
                    <label for="house">House</label>

                    <input onChange={this.handleCheck} name="technology" id="technology" type="checkbox" />
                    <label for="technology">Technology</label>

                    <input onChange={this.handleCheck} name="music" id="music" type="checkbox" />
                    <label for="music">Music</label>

                    <input onChange={this.handleCheck} name="repair" id="repair" type="checkbox" />
                    <label for="repair">Repair</label>

                    <input onChange={this.handleCheck} name="languages" id="languages" type="checkbox" />
                    <label for="languages">Languages</label>

                    <input onChange={this.handleCheck} name="cooking" id="cooking" type="checkbox" />
                    <label for="cooking">Cooking</label>

                    <button className="search-btn"><i className="fas fa-search"></i> Search</button>
                    
                    <p style={{color: "red"}}>{this.props.error? this.props.error:""}</p>
                </form>
            </>
        );
    }
}
 
export default Search;