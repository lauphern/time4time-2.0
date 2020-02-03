import React, { Component } from "react";
import customAxios from "../../utils/customAxios";

import "./PublishOffer.scss";
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
      duration: "",
      category: "",
      error: "",
      dateError: "",
      fileName: "Choose file..."
    };
    this.form = React.createRef();
  }

  handleInput = event => {
    let update = {};
    update[event.target.name] = event.target.value;
    if(event.target.type === "file") update.fileName = event.target.files["0"].name
    this.setState(update);
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
        <div className="publish-offer-card card">
          <h3><span>Publish an offer</span></h3>
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
              <label className="file-input">
                <span>{this.state.fileName}</span>
                <input
                  onChange={this.handleInput}
                  name="offerImage"
                  type="file"
                  required
                />
              </label>
            </div>

            {this.state.error ? (
              <p style={{ color: "red" }}>{this.state.error}</p>
            ) : null}

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
