//imports
import axios from "axios";
import { useState, useEffect } from "react";

//types
import { Movie } from "../Types/MovieTypes";

function Home() {

    const [movies, setMovies] = useState<Movie[] | null>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/").then((response) => {
            setMovies(response.data.movies);
        })
    }, [])

  return (
    <div>
        {movies?.map((movie: Movie, index) => (
            <div key={index}>
                <h3>{movie.title}</h3>
            </div>
        ))}
    </div>
  )
}

export default Home