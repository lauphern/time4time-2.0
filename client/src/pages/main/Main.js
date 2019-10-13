import React, { Component } from 'react';
import Search from '../../components/main/Search'

//TODO
//take OffersList out of Search and have it be a child of Main


//first page render search, this component is public
//if you wanna make some transactios into web site 
class Main extends Component {
    render() { 
        return ( 
            <>
                <section className="hero is-medium is-bold hero-bg">
                    <div className="hero-body">
                        <div className="container">
                        </div>
                    </div>
                </section>
                <div className="section">
                    <Search {...this.props}/>
                </div>
            </>
         );
    }
}
 
export default Main;