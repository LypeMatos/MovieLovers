import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    year: {
        type: String
    },
    image: {
        type: String
    }
})

const Movie = mongoose.model("Movies", movieSchema);

export default Movie;