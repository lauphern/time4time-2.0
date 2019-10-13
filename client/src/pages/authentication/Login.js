import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import { Link } from 'react-router-dom'

//render login component
class Login extends Component {
    state = { 
        username: '',
        password: '',
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
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <h3 className="title has-text-grey">Login</h3>
                            <p className="subtitle has-text-grey">Please login to proceed.</p>
                            <div className="box">
                                <figure className="avatar">
                                    <img src="timextime.jpg" alt=""/>
                                </figure>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput}className="input is-large" type="username" name="username" placeholder="Username" value={this.state.username} required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput}className="input is-large" type="password" name="password" placeholder="Password" value={this.state.password} required/>
                                        </div>
                                    </div>
                                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                    <button className="button is-block is-large is-fullwidth">Login</button>
                                </form>
                            </div>
                            <p className="has-text-grey"> New to Time4Time?
                                <Link to="/signup"> Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
         );
    }
}
 
export default Login;