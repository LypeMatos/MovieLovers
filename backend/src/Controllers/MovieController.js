import Movie from "../Models/MovieModel.js";
import User from "../Models/UserModel.js";

const getAllMovies = async (req, res) => {

    const movies = await Movie.find();

    if (!movies) {
        return res.status(404).json({ message: "Nenhum filme encontrado" });
    }

    try {
        res.status(200).json({ movies });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Não foi possível realizar a sua solicitação no momento" });
    }
}

const getMovieById = async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Nenhum filme encontrado" });
        }

        res.status(200).json({ movie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Não foi possível realizar a sua solicitação no momento" })
    }
}

const movieLikes = async (req, res) => {
    const movieId = req.params.id;
    const userId = req.userId;

    const movie = await Movie.findById(movieId);
    const isLiked = movie.usersLiked.includes(userId);

    if (!movie) return res.sendStatus(404);

    try {

        if (!isLiked) {
            movie.usersLiked.push(userId);
            movie.likes++;
            await movie.save();
        } else {
            movie.usersLiked = movie.usersLiked.filter(user => !user.equals(userId));
            movie.likes--;
            await movie.save();
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um problema" });
    }
}

const movieRating = async (req, res) => {
    const movieId = req.params.id;
    const userId = req.userId;
    const { rating } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.sendStatus(404);

    try {

        const userRatedIndex = movie.usersRated.findIndex(user => user._id?.equals(userId));
        console.log(userRatedIndex);

        if(userRatedIndex === -1){
            movie.voteCount++;
            movie.usersRated.push({_id: userId, userNote: rating});
        }else {
            movie.usersRated[userRatedIndex].userNote = rating;
        }

        const sumOfRatings = movie.usersRated.reduce((sum, user) => sum + user.userNote, 0);
        movie.rating = sumOfRatings / movie.voteCount;

        await movie.save();

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um problema" });
    }
}

export { getAllMovies, getMovieById, movieLikes, movieRating };