import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout, getUser } from "../utils/authMethods";

import "./Nav.scss";

const AuthNav = props => {
  return (
    <>
      <div className={`dropdown ${props.dropdownMenu} ${props.hideElement}`}>
        <NavLink
          onClick={props.toggleDropdownMenu}
          exact
          to="/"
          activeClassName="active-nav-item"
        >
          Home
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          to="/dashboard"
          activeClassName="active-nav-item"
        >
          Dashboard
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          to="/publish-offer"
          activeClassName="active-nav-item"
        >
          New offer
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          to="/about-us"
          activeClassName="active-nav-item"
        >
          About us
        </NavLink>
        <NavLink
          onClick={() => {
            props.toggleDropdownMenu();
            props.logMeOut();
          }}
          to="/login"
          activeClassName="active-nav-item"
        >
          Logout
        </NavLink>
      </div>
      <div className="full-menu">
        <NavLink alt="Home" exact to="/" activeClassName="active-nav-item">
          Home
        </NavLink>
        <NavLink
          alt="Dashboard"
          to="/dashboard"
          activeClassName="active-nav-item"
        >
          Dashboard
        </NavLink>
        <NavLink
          alt="New offer"
          to="/publish-offer"
          activeClassName="active-nav-item"
          className="cta-item"
        >
          New offer
        </NavLink>
        <NavLink
          alt="About us"
          to="/about-us"
          activeClassName="active-nav-item"
        >
          About us
        </NavLink>
        <NavLink
          alt="Logout"
          to="/login"
          onClick={props.logMeOut}
          activeClassName="active-nav-item"
        >
          Logout
        </NavLink>
      </div>
    </>
  );
};

const UnauthNav = props => {
  return (
    <>
      <div className={`dropdown ${props.dropdownMenu} ${props.hideElement}`}>
        <NavLink
          onClick={props.toggleDropdownMenu}
          exact
          to="/"
          activeClassName="active-nav-item"
        >
          Home
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          to="/publish-offer"
          activeClassName="active-nav-item"
        >
          New offer
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          exact
          to="/about-us"
          activeClassName="active-nav-item"
        >
          About us
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          to="/login"
          activeClassName="active-nav-item"
        >
          Login
        </NavLink>
        <NavLink
          onClick={props.toggleDropdownMenu}
          to="/signup"
          activeClassName="active-nav-item"
        >
          Sign up
        </NavLink>
      </div>
      <div className="full-menu">
        <NavLink alt="Home" exact to="/" activeClassName="active-nav-item">
          Home
        </NavLink>
        <NavLink
          alt="New offer"
          to="/publish-offer"
          activeClassName="active-nav-item"
          className="cta-item"
        >
          New offer
        </NavLink>
        <NavLink
          alt="About us"
          to="/about-us"
          activeClassName="active-nav-item"
        >
          About us
        </NavLink>
        <NavLink alt="Login" to="/login" activeClassName="active-nav-item">
          Login
        </NavLink>
        <NavLink alt="Sign up" to="/signup" activeClassName="active-nav-item">
          Sign Up
        </NavLink>
      </div>
    </>
  );
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownMenu: "dropdown-hidden",
      scrollPos: window.pageYOffset,
      hideElement: "hidden-element"
    };
  }

  toggleDropdownMenu = () => {
    if (this.state.dropdownMenu === "dropdown-hidden")
      this.setState({ dropdownMenu: "dropdown-show", hideElement: undefined });
    else {
      this.setState({ dropdownMenu: "dropdown-hidden" })
      setTimeout(() => this.setState({hideElement: "hidden-element"}), 400)
    }
  };

  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    this.setState({
      scrollPos: currentScrollPos
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <nav className={this.state.scrollPos > 150 ? "shrink-nav" : null}>
        <div>
          <NavLink to="/" activeClassName="active-nav-item">
            <img src="/logo_white_new.png" alt=""></img>
          </NavLink>
          <div className="nav-burger" onClick={this.toggleDropdownMenu}>
            <div></div>
          </div>
        </div>
        {this.props.loggedIn ? (
          <AuthNav
            dropdownMenu={this.state.dropdownMenu}
            toggleDropdownMenu={this.toggleDropdownMenu}
            hideElement={this.state.hideElement}
            logMeOut={() => {
              logout();
              this.props.updateNav();
            }}
          />
        ) : (
          <UnauthNav
            dropdownMenu={this.state.dropdownMenu}
            toggleDropdownMenu={this.toggleDropdownMenu}
            hideElement={this.state.hideElement}
          />
        )}
      </nav>
    );
  }
}

export default Nav;
