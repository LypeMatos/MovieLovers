import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    title: {
        type: String,
    },
    year: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0,        
    },
    voteCount: {
        type: Number,
        default: 0
    },
    usersLiked: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
    usersRated: [{
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        userNote: {type: Number}
    }]
})

const Movie = mongoose.model("Movies", movieSchema);

export default Movie;