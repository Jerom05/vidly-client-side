import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
 
class MoviesTable extends Component {
  columns = [
    { path: "title", 
      label: "Title", 
   },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    },
    {
      key: "delete",
      content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm"> Delete</button>
    },
    {
      key: "edit",
      content: movie => <button  onClick={(event) => this.onEdit(event,movie)} className="btn btn-primary btn-sm"> Edit</button>
    }
  ];
    
  onEdit =(event,movie)=>{
    window.location = `/movies/${movie._id}`
   
  }
  
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
