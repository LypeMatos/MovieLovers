import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title: {
        type: String
    },
    review: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    movie: {
        type: mongoose.Schema.Types.String, ref: "movies"
    }
})

const Review = mongoose.model("review", reviewSchema);

export default Review;