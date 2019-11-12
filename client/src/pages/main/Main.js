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
                <section>
                    <div>
                        <div>
                            <h2>We think time is priceless. Do you want to join us and share new experiences and pay with just your time?</h2>
                        </div>
                    </div>
                </section>
                <div>
                    <Search {...this.props}/>
                </div>
            </>
         );
    }
}
 
export default Main;