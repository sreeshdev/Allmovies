import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import DatePicker from "react-date-picker";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCeleb, saveCeleb } from "../services/celebService";
import { getGenres } from "../services/genreService";

class CelebForm extends Form {
  state = {
    data: {
      name: "",
      bio: "",
      gender: ""
      // dob: new Date()
    },
    //dob: new Date(),
    // genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Title"),
    bio: Joi.string()
      .required()
      .min(5)
      .max(150)
      .label("Bio"),
    // dob: Joi.date().required(),
    gender: Joi.string().required()
  };

  // async populateGenres() {
  //   const { data: genres } = await getGenres();
  //   this.setState({ genres });
  // }

  async populateCeleb() {
    try {
      const celebId = this.props.match.params.id;
      if (celebId === "new") return;

      const { data: celeb } = await getCeleb(celebId);
      this.setState({ data: this.mapToViewModel(celeb) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    // await this.populateGenres();
    await this.populateCeleb();
  }

  mapToViewModel(celeb) {
    return {
      _id: celeb._id,
      name: celeb.name,
      bio: celeb.bio,
      gender: celeb.gender
      // dob: celeb.dob
    };
  }

  doSubmit = async () => {
    await saveCeleb(this.state.data);

    this.props.history.push("/celebrities");
  };

  updateGender = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];
    if (e.target.checked) {
      //console.log(e.target.name);
      const data = { ...this.state.data };
      data[e.target.name] = e.target.value;
      this.setState({ data, errors });
      //console.log(this.state.data.gender);
    }
  };

  onChangeDate = date => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(e.target);
    // if (errorMessage) errors[e.target.name] = errorMessage;
    // else delete errors[e.target.name];

    //console.log(e.target.name);
    // const data = { ...this.state.data };
    // data[date.name] = date.value;
    // this.setState({ data });
    console.log(this.state.date);
  };

  render() {
    return (
      <div>
        <h1>Celebrities Add Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Actor Name")}
          <p>Gender </p>
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={this.state.data.gender === "Male"}
                onChange={this.updateGender}
              />{" "}
              Male
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={this.state.data.gender === "Female"}
                onChange={this.updateGender}
              />{" "}
              Female
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={this.state.data.gender === "Others"}
                onChange={this.updateGender}
              />{" "}
              Others
            </label>
          </div>
          {this.renderInput("bio", "Bio")}
          <p>Date Of Birth</p>
          <DatePicker
            name="dob"
            onChange={this.onChangeDate}
            value={this.state.date}
          />
          <br /> <br />
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CelebForm;
