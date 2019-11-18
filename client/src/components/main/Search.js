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
    
    render() { 
        return ( 
            <>
                <h6 id="pick-category">Pick a category</h6>
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
            </>
        );
    }
}
 
export default Search;