import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Movie{
  _id: string;
  name: string;
  image: string;
  actors: string;
  description: string;
}

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getAllMovies() {
      const response = await axios.get("http://localhost:8080");
      setMovies(response.data.movies);
    }
    getAllMovies();
  }, []);

  return (
    <div className="App">
      <ul>
        {movies.map((movie: Movie) => (
          <div>
            <h2>{movie.name}</h2>
            <img src={movie.image} alt={movie.name} />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App
