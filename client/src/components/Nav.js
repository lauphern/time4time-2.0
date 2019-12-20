import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import customAxios from '../utils/customAxios';

import "./Nav.scss"

const AuthNav = (props) => {
    return(
        <>
            <div className={props.dropdownMenu}>
                <NavLink onClick={props.toggleDropdownMenu} to='/'>
                    Home
                </NavLink>
                <NavLink onClick={props.toggleDropdownMenu} to="/dashboard">
                    Dashboard
                </NavLink>
                <NavLink onClick={props.toggleDropdownMenu} to="/publish-offer">
                    Publish new offer
                </NavLink>
                <NavLink onClick={() => {
                    props.toggleDropdownMenu()
                    props.logMeOut()
                }} to="/login">
                    Logout
                </NavLink>
            </div>
            <div className="full-menu">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/dashboard'>Dashboard</NavLink>
                <NavLink to="/publish-offer">Publish new offer</NavLink>
                <p>Hello, <NavLink to="/dashboard">{props.username}</NavLink></p>
                <NavLink to="/login" onClick={props.logMeOut}>Logout</NavLink>
            </div>
        </>
    )
}

const UnauthNav = (props) => {
    return (
        <>
            <div className={props.dropdownMenu}>
                <NavLink onClick={props.toggleDropdownMenu} to='/'>
                    Home
                </NavLink>
                <NavLink onClick={props.toggleDropdownMenu} to="/login">
                    Login
                </NavLink>
                <NavLink onClick={props.toggleDropdownMenu} to="/signup">
                    Sign up
                </NavLink>
            </div>
            <div className="full-menu">
                <NavLink alt="Home" to='/'>Home</NavLink>
                <NavLink alt="Publish new offer" to="/login" >Publish new offer</NavLink>
                <NavLink alt="Login" to="/login">Login</NavLink>
                <NavLink alt="Sign up" to="/signup">Sign Up</NavLink>
            </div>
        </>
    )
}

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            dropdownMenu: "dropdown-hidden",
            scrollPos: window.pageYOffset
        }
    }

    logMeOut = ()=> {
        customAxios({
            method: "post",
            url: "/logout"
        })
        .then(()=> {
            this.props.logOut()
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    toggleDropdownMenu = () => {
        if( this.state.dropdownMenu === "dropdown-hidden") this.setState({dropdownMenu: "dropdown-show"})
        else this.setState({dropdownMenu: "dropdown-hidden"})
    }

    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
    
        this.setState({
          scrollPos: currentScrollPos,
        });
    }

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
                    <NavLink to="/">
                        <img src="/logo_black.png" alt=""></img>
                    </NavLink>
                    <div className="nav-burger" onClick={this.toggleDropdownMenu}>
                        <div></div>
                    </div>
                </div>
                {this.props.logOut ? 
                    <AuthNav 
                        dropdownMenu={this.state.dropdownMenu}
                        toggleDropdownMenu={this.toggleDropdownMenu}
                        logMeOut={this.logMeOut}
                        username={this.props.username}
                    />
                    :
                    <UnauthNav 
                        dropdownMenu={this.state.dropdownMenu}
                        toggleDropdownMenu={this.toggleDropdownMenu}
                    />
                }
            </nav>        
        );
    }
}

export default Nav