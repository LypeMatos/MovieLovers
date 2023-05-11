import Movie from "../Models/MovieModel.js";

const getAllMovies = async (req, res) => {
    
    const movies = await Movie.find();

    if(!movies){
       return res.status(404).json({message: "Nenhum filme encontrado"});
    }

    try {
        res.status(200).json({movies});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível realizar a sua solicitação no momento"});
    }
}

const getMovieById = async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);

        if(!movie){
            return res.status(404).json({message: "Nenhum filme encontrado"});
        }

        res.status(200).json({movie});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível realizar a sua solicitação no momento"})
    }
}

export {getAllMovies, getMovieById};