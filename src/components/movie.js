import React from 'react'
import Likes from './common/like'
import Table from './common/table'

class Movie extends React.Component{
    
    columns = [
      {path: 'title', label:'Title'},
      {path: 'genre.name', label:'Genre'},
      {path: 'numberInStock', label:'Stock'},
      {path: 'dailyRentalRate', label:'Rate'},
      {path: 'title', label:'Title'},
      { 
        key:'like',
        content: movie => <Likes liked={movie.liked} onClick={()=>this.props.handleLike(movie)}/>
      },
      {
        key:'delete',
        content: movie => <button onClick={()=>this.props.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button> 
      } 
    ]

    render(){
        const {movies, onSort, sortColumn} = this.props
        return(
          <Table 
            columns = {this.columns}
            onSort = {onSort}
            sortColumn ={sortColumn}
            data ={movies}
          />
        )
    }
}

export default Movie