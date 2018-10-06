import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    // const sortColumn = { path: "title", order: "asc" };
    //called when component instance rendered to the DOM
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    // this.setState({ movies: movies }); cuz the
    // key and value the same we can do this:
    this.setState({ movies });
  };

  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenereSelect = gener => {
    this.setState({ selectedGenre: gener, searchQuery: "", currentPage: 1 });
    console.log(gener);
    // this.setState({ currentGener: gener });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    this.getPagedData();
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize); //if there no fillter pass allMovies
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    console.log(this.state.sortColumn.path + "from movies");
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;
    if (count === 0) return <p>There are no movies in database</p>;

    //Filteration
    const filtered =
      selectedGenre && selectedGenre._id //to insure you select another item not all
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //Pagination
    const movies = paginate(sorted, currentPage, pageSize); //if there no fillter pass allMovies

    //zin coding table>thead>tr>th*4 => tap
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <ListGroup
                items={this.state.genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleGenereSelect}

                //to make it more dynamic and used
                //with any type of genres, pass property here
                // textProperty="name"
                // valueProperty="_id"
                //but it's very complex -> solved using add
                //default-property in List-Group
              />
            </div>
            <div className="col-9">
              <button
                onClick={() => this.props.history.push("/movies/new")}
                className="btn btn-primary"
              >
                New Movie
              </button>
              <p>Showing {filtered.length} movies in database</p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />

              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onLiked={this.handleLiked}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={filtered.length} //if no fillter pass movies.length
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
