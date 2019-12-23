import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import { Link } from 'react-router-dom'

import "./Authentication.scss"

class Login extends Component {
    state = { 
        username: '',
        password: '',
        bgNum: Math.floor(Math.random() * 5) + 1
     }

    //take an input and update status
    handleInput = (event)=> {
        let myInput = {} //empty object
        myInput[event.target.name] = event.target.value
        this.setState(myInput)
    }

    //send data with axios
    handleSubmit = (event) =>{
        event.preventDefault();
        let newUser = this.state
        customAxios({
            method: 'post',
            url: '/login',
            data: newUser
            }).then(() => {
                this.props.loggedIn(true,this.state.username)
                this.props.history.push('/dashboard')
            }).catch(() => {
            this.setState({error: 'Username or email is incorrect'})    
            this.props.history.push('/login')
            })
    }
    //login box html
    render() { 
        return ( 
            // TODO fix bug that reloads the image when you add an input (new state)
            <section className="auth-background" style={ {backgroundImage: `url(/bg${this.state.bgNum}.jpg)`} }>
                <div className="auth-panel">
                    <h3>Login</h3>
                    <p>Please login to proceed.</p>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <div>
                                    <input onChange={this.handleInput} type="username" name="username" placeholder="Username" value={this.state.username} required/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input onChange={this.handleInput} type="password" name="password" placeholder="Password" value={this.state.password} required/>
                                </div>
                            </div>
                            <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                            <button>Login</button>
                        </form>
                    </div>
                    <p> New to Time4Time?
                        <Link to="/signup"> Sign Up</Link>
                    </p>
                </div>
            </section>
         );
    }
}
 
export default Login;