import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group'

import './App.scss';

import PrivateRoute from './utils/PrivateRoute'
import Main from './pages/main/Main';
import UserDashboard from './pages/dashboard/UserDashboard'
import PublishOffer from './pages/publish-offer/PublishOffer'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import AuthorProfile from './pages/author-profile/AuthorProfile'
import Footer from './components/Footer'
import Nav from './components/Nav';


class App extends Component {
    //TODO
    //Create a file in utils for auth - for this logic
    state = {
        loggedIn : false,
        username : "",
    }

    loggedIn = (aBoolean, username) => {
        this.setState({
            loggedIn: aBoolean,
            username: username,
        })
    }
    
    logOut = ()=> {
        this.setState({
            loggedIn: false,
            username: "",
        })
    }

    render() {
        return (
            <>
                {this.state.loggedIn ?
                    <Nav {...this.state} logOut={this.logOut}/> :
                    <Nav {...this.state} />
                }
                <Route render={({location}) => (
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        <Switch key={location.key} location={location}>
                            <Route exact path='/' render={(props) => <Main {...props} {...this.state}/>} />
                            <Route path='/login'  render={(props) => <Login {...props} loggedIn={this.loggedIn}/>} />
                            <Route path='/signup'  render={(props) => <Signup {...props} loggedIn={this.loggedIn}/>} /> 
                            <PrivateRoute path='/dashboard' component={UserDashboard} {...this.state} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                            <PrivateRoute path='/publish-offer' component={PublishOffer} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                            <PrivateRoute path='/profile/:id' component={AuthorProfile} currentUsername={this.state.username} loggedIn={this.state.loggedIn} />
                        </Switch>
                    </CSSTransitionGroup>
                )} />
                <Footer />
            </>
        );
    }
}

export default App;