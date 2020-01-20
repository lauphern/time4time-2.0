import React, { Component } from "react";

import "./Search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        house: "",
        technology: "",
        music: "",
        repair: "",
        languages: "",
        cooking: ""
      },
      notHovered: undefined
    };
  }

  handleCheck = event => {
    let generalSearch = { ...this.state.search };
    generalSearch[event.target.name] = event.target.checked
      ? event.target.name
      : "";
    this.setState({ search: generalSearch });
  };

  addClass = () => {
    this.setState({ notHovered: "label-hover" });
  };

  removeClass = () => {
    this.setState({ notHovered: undefined });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.props.handleSearch(this.state.search);
    }
  }

  render() {
    return (
      <section id="search">
        <h6 id="pick-category">Pick a category</h6>
        {/* <form onSubmit={(e) => {this.props.handleSearch(e, this.state)}}> */}
        <form className="category-search">
          <input
            onChange={this.handleCheck}
            name="house"
            id="house"
            type="checkbox"
          />
          <label
            onMouseEnter={this.addClass}
            onMouseLeave={this.removeClass}
            className={this.state.notHovered}
            for="house"
          >
            House
          </label>

          <input
            onChange={this.handleCheck}
            name="technology"
            id="technology"
            type="checkbox"
          />
          <label
            onMouseEnter={this.addClass}
            onMouseLeave={this.removeClass}
            className={this.state.notHovered}
            for="technology"
          >
            Technology
          </label>

          <input
            onChange={this.handleCheck}
            name="music"
            id="music"
            type="checkbox"
          />
          <label
            onMouseEnter={this.addClass}
            onMouseLeave={this.removeClass}
            className={this.state.notHovered}
            for="music"
          >
            Music
          </label>

          <input
            onChange={this.handleCheck}
            name="repair"
            id="repair"
            type="checkbox"
          />
          <label
            onMouseEnter={this.addClass}
            onMouseLeave={this.removeClass}
            className={this.state.notHovered}
            for="repair"
          >
            Repair
          </label>

          <input
            onChange={this.handleCheck}
            name="languages"
            id="languages"
            type="checkbox"
          />
          <label
            onMouseEnter={this.addClass}
            onMouseLeave={this.removeClass}
            className={this.state.notHovered}
            for="languages"
          >
            Languages
          </label>

          <input
            onChange={this.handleCheck}
            name="cooking"
            id="cooking"
            type="checkbox"
          />
          <label
            onMouseEnter={this.addClass}
            onMouseLeave={this.removeClass}
            className={this.state.notHovered}
            for="cooking"
          >
            Cooking
          </label>

          {/* <button className="search-btn"><i className="fas fa-search"></i> Search</button> */}

          <p style={{ color: "red" }}>
            {this.props.error ? this.props.error : ""}
          </p>
        </form>
      </section>
    );
  }
}

export default Search;
