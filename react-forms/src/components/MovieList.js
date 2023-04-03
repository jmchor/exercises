import { useState } from 'react';
import moviesDataJSON from '../movies-data.json';
import MovieCard from './MovieCard';

function MovieList() {
	const [movies, setMovies] = useState(moviesDataJSON);

	return (
		<div>
			<h2>Movie List</h2>
			{movies.map((movie) => {
				return <MovieCard key={movie._id} movie={movie} />;
			})}
		</div>
	);
}

export default MovieList;
