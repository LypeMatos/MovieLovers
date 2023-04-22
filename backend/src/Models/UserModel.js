import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    watch: [{
        type: mongoose.Schema.Types.ObjectId, ref: "movies"
    }],
    watched: [{
        type: mongoose.Schema.Types.ObjectId, ref: "movies"
    }]
})

const User = mongoose.model("Users", userSchema);

export default User;