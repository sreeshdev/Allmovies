import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import { getMovie, saveMovie } from "../services/movieService";
import { getCelebs } from "../services/celebService";
import { pathToFileURL } from "url";
//const fs = require("fs");
import fs from "fs";
import path from "path";
//const path = require("path");
//import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      // genreId: "",
      yearOfRelease: "",
      plot: "",
      selectedItems: []
    },
    // genres: [],
    errors: {},
    celebs: []
    // cost: new Set()
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    yearOfRelease: Joi.number()
      .required()
      .label("Year Of Release"),
    plot: Joi.string()
      .required()
      .min(5)
      .label("Plot"),
    selectedItems: Joi.required()
  };

  // async populateGenres() {
  //   //const { data: genres } = await getGenres();
  //   this.setState({ genres });
  // }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    // await this.populateGenres();
    await this.populateMovie();
  }
  async componentWillMount() {
    const { data: celebs } = await getCelebs();
    console.log(celebs);
    this.setState({ celebs });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      //genreId: movie.genre._id,
      yearOfRelease: movie.yearOfRelease,
      plot: movie.plot,
      selectedItems: movie.selectedItems
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  getSelected = options => {
    var length = options.length;
    var selectedItems = [];

    for (var i = 0; i < length; i++) {
      if (options[i].selected) {
        selectedItems.push(options[i].value);
      }
    }
    return selectedItems;
  };
  checkChange = async e => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(e.target.options);
    // if (errorMessage) errors[e.target.name] = errorMessage;
    // else delete errors[e.target.name];
    const options = e.target.options;

    let selectedItems = await this.getSelected(options);
    const data = { ...this.state.data };
    data["selectedItems"] = selectedItems;
    this.setState({ data });
    // this.setState({ data });
    console.log(this.state.data);
  };
  fileChange = async e => {
    console.log(e.target.value);
    let from = await e.target.value;
    let to;
    console.log(from);
    let inp = fs.createReadStream(from);

    let out = path.resolve(__dirname, `../posters/${path.basename(from)}`);
    inp.pipe(out);

    //var outstr = fs.createWriteStream("../posters");
    //instr.pipe(outstr);
  };
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Movie Add Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("yearOfRelease", "Year Of Release", "number")}
          {this.renderInput("plot", "Plot")}
          {/* {this.renderSelect("genreId", "Genre", this.state.genres)} */}
          <p>Poster</p>
          <input type="file" onChange={e => this.fileChange(e)} />
          <br />
          <br />
          <p>Cast (Use ctrl to select multiple)</p>
          <select
            name="selectedItems"
            id="selectedItems"
            className="form-control"
            multiple
            onChange={e => this.checkChange(e)}
          >
            {this.state.celebs.map((celeb, i) => {
              return (
                <option key={i} value={celeb.name}>
                  {celeb.name}
                </option>
              );
            })}
          </select>
          <br />
          <Link
            to="/celebrities/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Add Celebrity
          </Link>
          <br /> {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
