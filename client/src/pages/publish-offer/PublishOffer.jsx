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

  handleInput = event => {
    let update = {};
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
    //We need to add the date because the DatePicker component doesn't have an actual input element
    formData.set("date", this.state.date);
    customAxios({
      method: "post",
      url: "/publish-offer",
      config: { headers: { "Content-Type": "multipart/form-data" } },
      data: formData
    })
      .then(() => {
        //TODO este redirect queda raro porque no se ven las ofertas directamente
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
              <input
                onChange={this.handleInput}
                name="title"
                type="text"
                placeholder="Title"
                value={this.state.title}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                onChange={this.handleInput}
                name="description"
                placeholder="Describe your offer in max 250 characters"
                maxLength="250"
                value={this.state.description}
              />
            </div>
            <div>
              <label>Date</label>
              {/* <input onChange={this.handleInput} name='date' type="date" placeholder="Date" value={this.state.date}/> */}
              {/* TODO required */}
              <DatePicker
                selected={this.state.startDate}
                // onChange={date => setStartDate(date)}
                onChange={this.dateHandler}
                inline
              />
              {this.state.dateError && <p>{this.state.dateError}</p>}
            </div>
            <div>
              <label>Duration</label>
              <input
                onChange={this.handleInput}
                name="duration"
                type="number"
                placeholder="Duration"
                value={this.state.duration}
                min="1"
                required
              />
            </div>
            <div>
              <label>Category</label>
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
            <div>
              <label>Image</label>
              <input
                onChange={this.handleInput}
                name="offerImage"
                type="file"
                required
              />
            </div>
            <p style={{ color: "red" }}>
              {this.state.error ? this.state.error : ""}
            </p>
            <div>
              <button className="btn btn-cancel">Cancel</button>
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PublishOffer;
