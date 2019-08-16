import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
//import Like from "./common/like";

class CelebsTable extends Component {
  columns = [
    // { path: "poster", label: "Poster" },

    {
      path: "name",
      label: "Name",
      content: celeb => (
        <Link to={`/celebrities/${celeb._id}`}>{celeb.name}</Link>
      )
    },
    { path: "gender", label: "Sex" },
    { path: "dob", label: "Date Of Birth" },
    //{ path: "plot", label: "Plot" },
    { path: "bio", label: "Bio" }
    // {
    //   key: "like",
    //   content: movie => (
    //     <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    //   )
    // }
  ];

  deleteColumn = {
    key: "delete",
    content: celeb => (
      <button
        onClick={() => this.props.onDelete(celeb)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { celebs, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={celebs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CelebsTable;
