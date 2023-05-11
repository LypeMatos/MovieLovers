//imports
import { Link } from "react-router-dom";
import api from "../api/api";
import { useState, useEffect } from "react";

function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get("/").then((response) => {
            setMovies(response.data.movies);
        })
    }, [])

  return (
    <div>
        {movies?.map((movie) => (
            <div key={movie.title}>
                <h3><Link to={`/movie/${movie._id}`}>{movie.title}</Link></h3>
                <img src={movie.image} alt={movie.title} />
            </div>
        ))}
    </div>
  )
}

export default Home