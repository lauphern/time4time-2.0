import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import customAxios from '../utils/customAxios';


// TODO
// combine in one component if it's not too long

//Nav component: render this nav if the user isn't logged in
export const UnauthNav = class UnauthNav extends Component {
    constructor(props){
        super(props)
        this.state={
            dropdownMenu: "navbar-dropdown is-hidden"
        }
    }
    logMeOut = ()=> {
        customAxios({
            method: "post",
            url: "/logout"
        })
        .then((response)=> {
            this.props.logOut()
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    toggleDropdownMenu = () => {
        if( this.state.dropdownMenu === "navbar-dropdown is-hidden") this.setState({dropdownMenu: "navbar-dropdown"})
        else this.setState({dropdownMenu: "navbar-dropdown is-hidden"})
    }
    render() { 
        return ( 
            <div>
            <nav>
                <div>
                    <div>
                        <NavLink to="/">
                            <img src="/logo_black.png" alt="" height="98"></img>
                        </NavLink>
                        <div onClick={this.toggleDropdownMenu} data-target="navbarExampleTransparentExample">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={this.state.dropdownMenu}>
                        <NavLink onClick={this.toggleDropdownMenu} to='/'>
                        Home
                        </NavLink>
                        <NavLink onClick={this.toggleDropdownMenu} to="/login">
                        Login
                        </NavLink>
                        <NavLink onClick={this.toggleDropdownMenu} to="/signup">
                        Sign up
                        </NavLink>
                    </div>
                    <div id="navbarExampleTransparentExample">
                        <div>
                            <NavLink to='/'>Home</NavLink>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p>
                                        <NavLink to="/login" >
                                            <button>Publish new offer</button>
                                        </NavLink>
                                    </p>
                                    <p>
                                        <NavLink to="/login">Login</NavLink>
                                    </p>
                                    <p>
                                        <NavLink to="/signup">Sign Up</NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>       
            </div>     
         );
    }
}

//Auth nav for when the user is logged in
export const AuthNav = class AuthNav extends Component {
    constructor(props){
        super(props)
        this.state={
            dropdownMenu: "navbar-dropdown is-hidden"
        }
    }
    logMeOut = ()=> {
        customAxios({
            method: "post",
            url: "/logout"
        })
        .then((response)=> {
            this.props.logOut()
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    toggleDropdownMenu = () => {
        if( this.state.dropdownMenu === "navbar-dropdown is-hidden") this.setState({dropdownMenu: "navbar-dropdown"})
        else this.setState({dropdownMenu: "navbar-dropdown is-hidden"})
    }
    render() { 
        return ( 
            <div>
            <nav>
                <div>
                    <div>
                        <NavLink to="/">
                            <img src="/logo_black.png" alt="" height="98"></img>
                        </NavLink>
                        <div onClick={this.toggleDropdownMenu} data-target="navbarExampleTransparentExample">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={this.state.dropdownMenu}>
                        <NavLink onClick={this.toggleDropdownMenu} to='/'>
                        Home
                        </NavLink>
                        <NavLink onClick={this.toggleDropdownMenu} to="/dashboard">
                        Dashboard
                        </NavLink>
                        <NavLink onClick={this.toggleDropdownMenu} to="/publish-offer">
                        Publish new offer
                        </NavLink>
                        <NavLink onClick={() => {
                            this.toggleDropdownMenu()
                            this.logMeOut()
                            }} to="/login">
                        Logout
                        </NavLink>
                    </div>
                    <div id="navbarExampleTransparentExample">
                        <div>
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p>
                                        <NavLink to="/publish-offer" >
                                            <button>Publish new offer</button>
                                        </NavLink>
                                    </p>
                                    <p>Hello, <NavLink to="/dashboard">{this.props.username}</NavLink></p>
                                    <p>
                                        <NavLink to="/login" onClick={this.logMeOut}>Logout</NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>        
        </div>    
        );
    }
}