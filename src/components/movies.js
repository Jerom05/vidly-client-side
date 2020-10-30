import React from 'react'
import {getMovies} from '../services/fakeMovieService'
import {getGenres} from '../services/fakeGenreService'
import Movie from './movie'
import ListGroup from './common/listGrorup'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import _ from 'lodash'


class Movies extends React.Component{

    state={
       movies:[],
       genres:[],
       pageSize: 4,
       currentPage:1,
       selectedGenre: null,
       sortColumn :{ path:'title', order:'asc'},
       //myState
       genreState : [],
       all:true
    }

    componentDidMount(){
      const genres = [{_id:'',name:'All Genres'}, ...getGenres()]
      this.setState({
        movies: getMovies(),
        genres
      })
    }

    handleDelete = (movie)=>{
      const movies = this.state.movies.filter((m)=>m!==movie)
      this.setState({movies})
    }

    handleLike = (movie)=>{
      const movies = [...this.state.movies]
      const index = movies.indexOf(movie)
      movies[index]= {...movies[index]}
      movies[index].liked = !movies[index].liked
      this.setState({movies})
    }

    handlePageChange = page =>{
      this.setState({currentPage:page})
    }

    handleGenreSelect =genre=>{
      this.setState({selectedGenre:genre, currentPage:1})
    }

    handleSort = sortColumn=>{
      this.setState({ sortColumn })
    }

    getPageData = ()=>{
      const {currentPage, pageSize, selectedGenre, sortColumn} = this.state
      const filtered = selectedGenre && selectedGenre._id ? this.state.movies.filter((m)=>m.genre._id===this.state.selectedGenre._id) : this.state.movies
      
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
      const movies = paginate(sorted,currentPage,pageSize)
      return {totalCount: filtered.length, data:movies }
    }

    render(){
      const {length:count} = this.state.movies
      const {currentPage, pageSize, sortColumn} = this.state
     
      if(count===0) return <p>There are no movies in the database</p>
      const {totalCount,data:movies} = this.getPageData()
     
      return(
        <div>
          <div className="row">

            <div className='col-3'>
              <ListGroup 
                items={this.state.genres}
                onItemSelect ={this.handleGenreSelect}
                selectedItem={ this.state.selectedGenre}
              />
            </div>

            <div className="col">
              <p>The total {totalCount} moives is shown</p>
              <Movie
                handleLike = {this.handleLike}
                handleDelete = {this.handleDelete}
                movies = {movies}
                onSort = {this.handleSort}
                sortColumn = {sortColumn}
              />
              <Pagination 
                itemsCount ={totalCount}
                pageSize= {pageSize} 
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />

            </div>
          </div>
        </div>
      )}
}

export default Movies































/*
  //My method
    hadleSetGenreState = Genre =>{
      const genre = this.state.movies.filter((g)=>g.genre.name===Genre)
      this.setState({genreState:genre, all:false})
    }
    //
      let movies
      if(count===0) 
        return <p>There are no movies in the database.</p>
      
      if(this.state.all === true){
        movies = paginate(this.state.movies, currentPage, pageSize)
      }
      else{
        movies = paginate(this.state.genreState, currentPage, pageSize)
      }
      <ul>
         <li onClick={()=>this.hadleSetGenreState('Action')}>Action</li>
         <li onClick={()=>this.hadleSetGenreState('Comedy')}>Comedy</li>
         <li onClick={()=>this.hadleSetGenreState('Thriller')}>Thriller</li>
      </ul>
*/