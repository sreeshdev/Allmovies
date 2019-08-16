import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CelebsTable from "./celebTable";
//import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getCelebs, deleteCeleb } from "../services/celebService";
//import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Celeb extends Component {
  state = {
    celebs: [],
    // genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentWillMount() {
    // const { data } = await getGenres();
    // const genres = [{ _id : "", name: "All Genres" }, ...data];

    const { data: celebs } = await getCelebs();

    this.setState({ celebs });
  }

  handleDelete = async celeb => {
    const originalCelebs = this.state.celebs;
    const celebs = originalCelebs.filter(m => m._id !== celeb._id);
    this.setState({ celebs });

    try {
      await deleteCeleb(celeb._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This Celebrity has already been deleted.");

      this.setState({ celebs: originalCelebs });
    }
  };

  // handleLike = movie => {
  //   const movies = [...this.state.movies];
  //   const index = movies.indexOf(movie);
  //   movies[index] = { ...movies[index] };
  //   movies[index].liked = !movies[index].liked;
  //   this.setState({ movies });
  // };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // handleGenreSelect = genre => {
  //   this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  // };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      //selectedGenre,
      searchQuery,
      celebs: allCelebs
    } = this.state;

    let filtered = allCelebs;
    if (searchQuery)
      filtered = allCelebs.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const celebs = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: celebs };
  };

  render() {
    const { length: count } = this.state.celebs;
    //const count = this.state.celebs.length;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0)
      return (
        <div className="col">
          <p>There are no celebrities in the database.</p>
          {user && (
            <Link
              to="/celebrities/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Add Celebrity
            </Link>
          )}
        </div>
      );

    const { totalCount, data: celebs } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {user && (
            <Link
              to="/celebrities/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Add Celebrity
            </Link>
          )}
          <p>{totalCount} Celebrity in DataBase.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CelebsTable
            celebs={celebs}
            sortColumn={sortColumn}
            // onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Celeb;
