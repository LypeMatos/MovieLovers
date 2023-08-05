import mongoose from "mongoose";

const commentarySchema = new mongoose.Schema({
    title: {
        type: String
    },
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    movie: {
        type: mongoose.Schema.Types.String, ref: "movies"
    }
})

const Commentary = mongoose.model("Commentary", commentarySchema);

export default Commentary;