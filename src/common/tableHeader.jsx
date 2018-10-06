import React, { Component } from "react";
//Interface of Header Component
//inputs:
//columns: array
//sortColumn: object
//onSort: function

class TabelHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = column => {
    const sortColumn = { ...this.props.sortColumn };
    // console.log(column, sortColumn);
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <li className="fa fa-sort-asc" aria-hidden="true" />;
    return <i className="fa fa-sort-desc" aria-hidden="true" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.lable}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TabelHeader;
