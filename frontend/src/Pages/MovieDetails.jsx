import api from "../api/api";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/AuthProvider";

const MovieDetails = () => {
    const [movie, setMovie] = useState();
    const {id} = useParams();

    const { auth } = useContext(AuthContext);
    const accessToken = auth?.accessToken;
    console.log(accessToken);

    useEffect(() => {
        const getMovie = async () => {
            const response = await api.get(`/movie/${id}`);
            const data = response.data
            setMovie(data.movie);
        }

        getMovie()
    }, [])    

  return (
    <section>
        <div>
            {movie && (
                <div>
                    {movie.title}
                </div>
            )}
        </div>
        <div>
            { accessToken ? (<p>Comente sobre o filme</p>) : <p>Você precisa estar logado para comentar e avaliar</p>}
        </div>
        <Link to={"/"}>Home</Link>
    </section>    
  )
}

export default MovieDetails;