import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, loggedIn } from "../../utils/authMethods";

import "./Authentication.scss";

// TODO poner una foto default para cada usuario e implementar que ya puedan subir una foto aqui

class SignUp extends Component {
  //set values for signup form
  state = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    birth: "",
    error: "",
    bgNum: Math.floor(Math.random() * 5) + 1
  };

  //take an input and update status
  handleInput = event => {
    let myInput = {}; //empty object
    myInput[event.target.name] = event.target.value;
    this.setState(myInput);
  };

  //submit function
  handleSubmit = event => {
    event.preventDefault();
    signup(this.state)
      .then(() => {
        this.props.updateNav(loggedIn());
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        this.setState({ errorMessage: "Something went wrong" });
      });
  };

  render() {
    return (
      <section
        className="auth-background"
        style={{ backgroundImage: `url(/bg${this.state.bgNum}.jpg)` }}
      >
        <div className="auth-panel">
          <h3>Sign up</h3>
          <p>Please sign up to proceed.</p>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    value={this.state.firstname}
                    required
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    value={this.state.lastname}
                    required
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    onChange={this.handleInput}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    pattern="[a-zA-Z0-9]+"
                    title="only characters and numbers"
                    required
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    onChange={this.handleInput}
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    value={this.state.email}
                    required
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    onChange={this.handleInput}
                    type="date"
                    name="birth"
                    placeholder="Birth Date"
                    value={this.state.birth}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Time wallet:</label>
                <div>
                  <p style={{ color: "green" }}>
                    When you sign up you get 2 hours to spend!
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <input
                    onChange={this.handleInput}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    pattern="^[a-zA-Z0-9]{8,}$"
                    title="At least 8 characters"
                    required
                  />
                  <span>
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
              <p style={{ color: "red" }}>
                {this.state.errorMessage && this.state.errorMessage}
              </p>
              <button className="btn" value="submit">Sign up</button>
            </form>
          </div>
          <p>
            Already got an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </section>
    );
  }
}

export default SignUp;
