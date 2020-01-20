import React, { Component } from "react";
import customAxios from "../../utils/customAxios";

import "./PublishOffer.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// TODO
// import { loadProgressBar } from 'axios-progress-bar'

// loadProgressBar(customAxios)

// TODO asegurarme de que la foto es obligatoria

class PublishOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: Date.now(),
      title: "",
      description: "",
      date: "",
      duration: "",
      category: "",
      error: "",
      dateError: ""
    };
    this.form = React.createRef();
  }

  //input
  handleInput = event => {
    let update = {}; //empty object
    update[event.target.name] = event.target.value;
    this.setState(update);
  };

  dateHandler = date => {
    if (date < Date.now() || date === Date.now())
      this.setState({ dateError: "You have to pick a future date!" });
    else this.setState({ dateError: "", startDate: date, date: date });
  };

  //submit button
  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData(this.form.current);
    customAxios({
      method: "post",
      url: "/publish-offer",
      config: { headers: { "Content-Type": "multipart/form-data" } },
      data: formData
    })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({
          error: "Something went wrong! Your offer was not published"
        });
      });
  };

  render() {
    return (
      <div className="publish-offer-container">
        <div className="publish-offer-card">
          <h3>Publish an offer</h3>
          <form
            ref={this.form}
            onSubmit={this.handleSubmit}
            enctype="multipart/form-data"
          >
            <div>
              <label>Title</label>
              <div>
                <div>
                  <input
                    onChange={this.handleInput}
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>

            <div>
              <label>Description</label>
              <div>
                <div>
                  <textarea
                    onChange={this.handleInput}
                    name="description"
                    placeholder="Describe your offer in max 250 characters"
                    maxLength="250"
                    value={this.state.description}
                  />
                </div>
              </div>
            </div>
            <div>
              <label>Date</label>
              <div>
                {/* <input onChange={this.handleInput} name='date' type="date" placeholder="Date" value={this.state.date}/> */}
                <DatePicker
                  selected={this.state.startDate}
                  // onChange={date => setStartDate(date)}
                  onChange={this.dateHandler}
                  inline
                />
                {this.state.dateError && <p>{this.state.dateError}</p>}
              </div>
            </div>
            <div>
              <label>Duration</label>
              <div>
                <input
                  onChange={this.handleInput}
                  name="duration"
                  type="number"
                  placeholder="Duration"
                  value={this.state.duration}
                  min="1"
                />
              </div>
            </div>
            <div>
              <label>Category</label>
              <div>
                <div>
                  <select
                    name="category"
                    value={this.state.category}
                    onChange={this.handleInput}
                  >
                    <option>Select a category</option>
                    <option value="house">House</option>
                    <option value="technology">Technology</option>
                    <option value="music">Music</option>
                    <option value="repair">Repair</option>
                    <option value="languages">Languages</option>
                    <option value="cooking">Cooking</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label>Image</label>
              <div>
                <input
                  onChange={this.handleInput}
                  name="offerImage"
                  type="file"
                />
              </div>
            </div>
            <p style={{ color: "red" }}>
              {this.state.error ? this.state.error : ""}
            </p>
            <div>
              <div>
                <button className="btn">Submit</button>
              </div>
              <div>
                <button className="btn btn-cancel">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PublishOffer;
