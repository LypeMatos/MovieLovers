import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    image: {
        type: String
    },
    actors: {
        type: String
    },
    description: {
        type: String
    }
})

const Movie = mongoose.model("Movies", movieSchema);

export default Movie;