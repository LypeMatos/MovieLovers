//imports
import api from "../api/api";
import { useState, useEffect } from "react";

function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get("http://localhost:8080/").then((response) => {
            setMovies(response.data.movies);
        })
    }, [])

  return (
    <div>
        {movies?.map((movie) => (
            <div key={movie.title}>
                <h3>{movie.title}</h3>
                <img src={movie.image} alt={movie.title} />
            </div>
        ))}
    </div>
  )
}

export default Home