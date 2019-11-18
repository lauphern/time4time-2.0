import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import customAxios from '../utils/customAxios';

import "./Nav.scss"

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
        // const { scrollPos } = this.state;

        const currentScrollPos = window.pageYOffset;
        // const visible = scrollPos > currentScrollPos;
    
        this.setState({
          scrollPos: currentScrollPos,
        //   visible
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
                    :
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
                }
                
                <div className="full-menu">
                    <NavLink to='/'>Home</NavLink>
                    {this.props.logOut ?
                        <>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                            <NavLink to="/publish-offer" >
                                <button>Publish new offer</button>
                            </NavLink>
                            <p>Hello, <NavLink to="/dashboard">{this.props.username}</NavLink></p>
                            <NavLink to="/login" onClick={this.logMeOut}>Logout</NavLink>
                        </>
                        :
                        <>
                            <NavLink to="/login" >
                                <button className="button is-success">Publish new offer</button>
                            </NavLink>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </>
                    }
                </div>
            </nav>        
        );
    }
}

export default Nav