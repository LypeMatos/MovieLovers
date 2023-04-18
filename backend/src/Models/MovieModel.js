import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    watching: {
        type: String,
        enum: ["watched", "watching"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    }
})

const Movie = mongoose.model("Movies", movieSchema);

export default Movie;