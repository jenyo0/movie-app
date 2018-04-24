import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie.js';

class App extends Component {
//Render : componentWillMount => render => componentDidMount
//Update : componentWillReceiveProps => shouldComponentUpdate    =>    componentWillUpdate => render => componentDidMount
//         새로운 props가 들어왔음       기존props와 새것비교 true리턴    컴포넌트 업데이트
//state가 바뀌면 항상 렌더링함!
state={}

componentDidMount(){
  this._getMovies();
}



_renderMovies = () =>{
  const movies = this.state.movies.map((movie) =>{
    return <Movie
                title={movie.title_english}
                poster={movie.medium_cover_image}
                key={movie.id}
                genres={movie.genres}
                synopsis={movie.synopsis}
                />
  })
  return movies
}

_getMovies = async () => {
  const movies = await this._callApi()
  this.setState({
    movies
  })
}

_callApi = () => {
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
  .then(response => response.json())
  .then(json => json.data.movies)
  .catch(err => console.log(err))
}

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App":"App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
