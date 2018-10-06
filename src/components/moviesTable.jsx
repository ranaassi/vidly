import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../common/like";
import Table from "../common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLiked(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    console.log(sortColumn + "  from movies Table");

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
      // <table className="table">
      //   <TableHeader
      //     columns={this.columns}
      //     sortColumn={sortColumn}
      //     onSort={onSort}
      //   />
      //   <TableBody
      //     data={movies}
      //     columns={this.columns}
      //     onDelete={onDelete}
      //     onLiked={onLiked}
      //   />
      // </table>
    );
  }
}

export default MoviesTable;
