import React, { Component } from 'react';
import Movie from './Movie';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

class MoviesList extends Component {

  state = {
    movies: [],
    page: 1,
    totalPages: null,
    scrolling: false,
  }

  // async componentDidMount() {
  //   try {
  //     const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=702ec9a15ff4577b9ef25d8bdfbb7cbb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
  //     const movies = await res.json();
  //     this.setState({
  //       movies: movies.results
  //     })
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  componentDidMount() {
    this.loadMovies()
    this.scrollListener = window.addEventListener('scroll', e => {
      this.handleScroll(e)
    })
  }

  handleScroll = (e) => {
    this.loadMore()
  }

  loadMovies = () => {
    const { page, movies } = this.state
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=702ec9a15ff4577b9ef25d8bdfbb7cbb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        const fetchedMovies = json.results
        this.setState({
          movies: [...movies, ...fetchedMovies]
        })
      })
    console.log(this.state.movies)
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.loadMovies)
  }

  render() {
    return (
      <div>
        <MovieGrid>
          {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} desc={movie.desc} />)}
        </MovieGrid>
        <a onClick={this.loadMore}>Load more movies</a>
      </div>
    );
  }
}


export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`