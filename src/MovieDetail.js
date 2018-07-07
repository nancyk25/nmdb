import React, { Component } from 'react';
import Movie from './Movie';
import { Poster } from './Movie';
import styled from 'styled-components';
import Overdrive from 'react-overdrive'


const POSTER_PATH = 'http://image.tmdb.org/t/p/w154'
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280'

class MovieDetail extends Component {

  state = {
    movie: {}
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=702ec9a15ff4577b9ef25d8bdfbb7cbb&language=en-US`)
      const movie = await res.json();
      this.setState({
        movie,
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movie } = this.state
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.poster_path}`} alt={movie.title}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>

          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </ MovieWrapper >
    );
  }
}


export default MovieDetail;

const MovieWrapper = styled.div`
        position: relative;
        padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
          background-size: cover;
        `;

const MovieInfo = styled.div`
          background: white;
          text-align: left;
          padding: 2rem 10%;
          display: flex;
  > div {
            margin-left: 20px;
        }
  img{
            position: relative;
          top: -Á5rem;
        }
`;