import { useState } from 'react';
import moviesDataJSON from '../movies-data.json';
import MovieCard from './MovieCard';
import AddMovie from './AddMovie';
import FilterMovies from "./FilterMovies";

function MovieList() {
	const [movies, setMovies] = useState(moviesDataJSON);
    const [moviesData, setMoviesData] = useState(moviesDataJSON);


    const addNewMovie = (newMovie) => {

        const updatedMovies = [...movies, newMovie]
        const updatedMoviesData = [...moviesData, newMovie]

        setMovies(updatedMovies)
        setMovies(updatedMoviesData)
    }

    const filterMovieList = (str) => {
        let filteredMovies;

        if (str === "All") {
            filteredMovies = moviesData;
        } else {
            filteredMovies = moviesData.filter((movie) => {
                return movie.title[0].toLowerCase() === str.toLowerCase()
            });
        }
        setMovies(filteredMovies)
    }


	return (
		<div>
        <FilterMovies filterMovies={filterMovieList}/>   {/*  <== ADD   */}

			<AddMovie addMovie={addNewMovie}/>
			{movies.map((movie) => {
				return <MovieCard key={movie._id} movie={movie} />;
			})}
		</div>
	);
}

export default MovieList;
