import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// TODO
// import { CSSTransitionGroup } from 'react-transition-group'

import "./App.scss";

import PrivateRoute from "./utils/PrivateRoute.jsx";
import Main from "./pages/main/Main";
import UserDashboard from "./pages/dashboard/UserDashboard";
import PublishOffer from "./pages/publish-offer/PublishOffer";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import AuthorProfile from "./pages/author-profile/AuthorProfile";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import AboutUs from "./pages/about-us/AboutUs";
import FAQ from "./pages/faq/FAQ";

const Loader = () => {
  return <i className="fas fa-spinner fa-pulse loader"></i>;
};

class App extends Component {
  state = {
    loading: true,
    loggedIn: false
  };

  syncLoggedIn = loggedIn => this.setState({ loggedIn: loggedIn });

  timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  isLoaded = async (ms = 3000) => {
    await this.timeout(ms);
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.isLoaded();
  }

  render() {
    if (this.state.loading) return <Loader />;
    return (
      <>
        <div className="content">
          <Nav loggedIn={this.state.loggedIn} updateNav={this.syncLoggedIn} />
          {/* <Route render={({location}) => (
                        <CSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        > */}
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login {...props} updateNav={this.syncLoggedIn} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} updateNav={this.syncLoggedIn} />
              )}
            />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/faq" component={FAQ} />
            <PrivateRoute
              path={["/dashboard", "/dashboard/:offerId"]}
              component={UserDashboard}
              loggedIn={this.state.loggedIn}
            />
            <PrivateRoute
              path="/publish-offer"
              component={PublishOffer}
              loggedIn={this.state.loggedIn}
            />
            <PrivateRoute
              path="/profile/:id"
              component={AuthorProfile}
              loggedIn={this.state.loggedIn}
            />
            <Route
              exact
              path={["/", "/:offerId"]}
              render={props => <Main {...props} />}
            />
          </Switch>
          {/* </CSSTransitionGroup>
                    )} /> */}
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
