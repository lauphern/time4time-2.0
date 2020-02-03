import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, loggedIn } from "../../utils/authMethods";

import "./Authentication.scss";

class Login extends Component {
  state = {
    username: "",
    password: "",
    bgNum: Math.floor(Math.random() * 5) + 1
  };

  //take an input and update status
  handleInput = event => {
    let myInput = {}; //empty object
    myInput[event.target.name] = event.target.value;
    this.setState(myInput);
  };

  //send data with axios
  handleSubmit = event => {
    event.preventDefault();
    login(this.state)
      .then(() => {
        this.props.updateNav(loggedIn());
        this.props.history.push("/dashboard");
      })
      .catch(() => {
        this.setState({ error: "Username or email is incorrect" });
        this.props.history.push("/login");
      });
  };

  render() {
    return (
      <section
        className="auth-background"
        style={{ backgroundImage: `url(/bg${this.state.bgNum}.jpg)` }}
      >
        <div className="auth-panel">
          <h3><span>Login</span></h3>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleInput}
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                required
              />
              <input
                onChange={this.handleInput}
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                required
              />

              {this.state.error ? (
                <p style={{ color: "red" }}>{this.state.error}</p>
              ) : (
                null
              )}

              <button className="btn">Login</button>
            </form>
          </div>
          <p>
            New to Time4Time?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </section>
    );
  }
}

export default Login;
