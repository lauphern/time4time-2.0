import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import { Link } from 'react-router-dom'

class SignUp extends Component {
    
    //set values for signup form
    state = { 
        username: '',
        password: '',
        firstname:'',
        lastname:'',
        email: '',
        birth: '',
        error: ''
     }
     
    //take an input and update status
    handleInput = (event)=> {
        let myInput = {} //empty object
        myInput[event.target.name] = event.target.value
        this.setState(myInput)
    }

    //submit function
    handleSubmit = (event) => {
        event.preventDefault();
        let newUser = this.state
        customAxios({
            method: 'post',
            url: '/signup',
            data: newUser
        }).then(() => {
            this.props.loggedIn(true,this.state.username)
            this.props.history.push('/dashboard')
        }).catch(() => {
            this.setState({error: 'Username or email already taken'})
        })
    }

    render() { 
        return ( 
            <section>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <h3 className="title has-text-grey">Sign up</h3>
                            <p className="subtitle has-text-grey">Please sign up to proceed.</p>
                            <div className="box">
                                <figure className="avatar">
                                    <img src="timextime.jpg" alt=""/>
                                </figure>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput} className="input is-large" type="text" name="firstname" placeholder="First name" value={this.state.firstname} required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput} className="input is-large" type="text" name="lastname" placeholder="Last name" value={this.state.lastname} required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput} className="input is-large" type="text" name="username" placeholder="Username" value={this.state.username} pattern="[a-zA-Z0-9]+" title="only characters and numbers" required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput} className="input is-large" type="email" name="email" placeholder="e-mail" value={this.state.email} required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input onChange={this.handleInput} className="input is-large" type="date" name="birth" placeholder="Birth Date" value={this.state.birth} required/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Time wallet:</label>
                                        <div className="control has-text-centered">
                                            <p style={{color: 'green'}}>When you sign up you get 2 hours to spend!</p>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="control has-icons-left">
                                            <input onChange={this.handleInput} className="input is-large" type="password" name="password" placeholder="Password" value={this.state.password} pattern="^[a-zA-Z0-9]{8,}$" title="At least 8 characters" required/>
                                            <span className="icon is-small is-left">
                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                    <button className="button is-block is-large is-fullwidth" value="submit">Sign up</button>
                                </form>
                            </div>
                            <p className="has-text-grey">Already got an account?
                                <Link to="/login"> Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
         );
    }
}
 
export default SignUp;