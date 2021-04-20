//movies.js
import React, {Component} from 'react'
import MoviesTable from './moviesTable'
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import ListGroup from './components/common/listGroup';
class Movies extends Component{
    state={
        movies:[],
        genres:[],
        currentPage:1,
        pageSize:4,
        searchQuery:'',
        selectedGenre:null,
        sortColumn:{path:'title',sort:'asc'}
    }

    componentDidMount(){
        const genres = [{name:'All Genres'},...getGenres]
        this.setState({
            movies:getMovies(),
            genres
        })
    }

    handleGenreSelect= genre=>{
        this.setState({selectedGenre:genre,currentPage:1})
    }

    handleLike = movie =>{
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {...movies[index].liked}
        movies[index].liked = !movies[index].liked
        this.setState({movies})
    }

    handleDelete = movie =>{
        const movies = this.state.movies.filter(m=>m._id !==movie._id)
        this.setState({ movies });
        deleteMovie(movie._id);
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
      };

    render(){
        return(
            <div className='row'>
                <div className='col-3'>
                    <ListGroup 
                        items = {this.state.genres}
                        selectedItem = {this.state.selectedGenre}
                        onItemSelect = {this.handleGenreSelect}
                    />
                </div>
                <div className='col'>
                    <p>Showing {'totalCount'} movies in the database</p>
                    <MoviesTable
                        movies = {movies}
                        sortColumn = {sortColumn}
                        onLike = {this.handleLike}
                        onDelete = {this.handleDelete}
                        onSort ={this.handleSort}
                    />
                </div>
            </div>
        )
    }
}
//

//ListGroup
import React from 'react'
const ListGroup = (props) =>{
    const {items, onItemSelect, textProperty, valueProperty, selectedItem } = props
    return(
        <ul className='list-group'>
            {
                items.map(item=>(
                    <li key={item[valueProperty] || item[textProperty]}
                        className={item===selectedItem  ? 'list-group-item active': 'list-group-item'}
                        onClick ={()=>onItemSelect(item)}>
                        
                        {item[textProperty]}
                    </li>
                ))
            }
        </ul>
    )
}

ListGroup.defaultProps ={
    textProperty:'text',
    valueProperty:'_id'
}
export default ListGroup

// End ListGroup//


//Movies Table//
import React from 'react'
import Like from "./common/like";

class MoviesTable extends React.Component{
    columns = [
        {path:'title', label:'Title'},
        {path:'genre.name', label:'Genre'},
        {path:'numberInStock', label :'Stock'},
        {path:'dailyRentalRate', label:'Rate'},
        {
            key:'like',
            content: movie=> <Like liked={movie.liked} onClick={()=>this.props.onLike(movie)} />
        },
        {
            key: "delete",
            content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm"> Delete</button>
        }
    ]
    render(){
        const {movies, onSort, sortColumn} = this.props
        return (
            <Table 
                columns = {this.columns}
                data = {this.movies}
                onSort = {onSort}
                sortColumn ={sortColumn}
            />
        )
    }
}

export default MoviesTable

//End Movies Table//

// Table.js //

import React from 'react'
import tableHeader from './tableHeader'
import tableBody from './tableBody'

const Table = ({ columns, sortColumn, onSort, data }) =>{
    return(
        <table className='table'>
            <tableHeader columns ={columns} sortColumn={sortColumn} onSort={onSort}/>
            <TableBody columns={columns} data={data} />
        </table>
    )
}
//End Table//

// Table Header//

import React ,{Component} from 'react'
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
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
class TableHeader extends Component{
    render(){
        return(
            <thead>
                <tr>
                {this.props.columns.map(column=>(
                    <th className='clickable' key={column.path || column.key} onClick={()=>this.raiseSort(column.path)}>{column.label} {this.renderSortIcon(column)}</th>
                    ))}
                </tr>
            </thead>
        )
    }
}

//End TableHeader//

//FakeMovieService
import * as genresAPI from './services/fakeGenreService'
import { Component } from 'react'
import { min } from 'lodash';
const movies =[
    {
        _id:'12345',
        title:'Loc and loc',
        genre:{id:'12345',titile:'action'},
        numberInStock:5,
        publishDate: "2018-01-03T19:04:28.809Z",
        liked: true
    }
]

export function getMovies(){
    return movies
}

export function getMovie(id){
    return movies.find(m=>m._id===id)
}

export function saveMovie(movie){
    const movieInDb = Movies.find(m=>m._id ===movie._id) || {}
    movieInDb.titile = movie.titile
    movieInDb.genre = genresAPI.genre.find(g=> g._id===movie.genreId)

    if(!movieInDb._id){
        movieInDb._id= Date.now().toString();
        movies.push(movieInDb)
    }
    return movieInDb;

}

export function deleteMovie(id){
    movies = movies.filter(m=>m._id !==m.id)
    return movies
}
//FakeMovieService
